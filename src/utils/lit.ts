import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LIT_NETWORK } from "@lit-protocol/constants";
import { encryptString, decryptToString } from "@lit-protocol/encryption";

interface AccessControlCondition {
  conditionType: string;
  contractAddress: string;
  standardContractType: string;
  chain: string;
  method: string;
  parameters: string[];
  returnValueTest: {
    comparator: string;
    value: string;
  };
}

class Lit {
  private static instance: Lit;
  private isConnected = false;
  private approvedAddresses: string[];
  private authSig!: {
    sig: string;
    derivedVia: string;
    signedMessage: string;
    address: string;
  };
  litNodeClient!: LitJsSdk.LitNodeClient;
  private readonly chain = "baseSepolia";

  constructor(approvedAddresses: string[] = []){
    this.approvedAddresses = approvedAddresses;
  }

  static getInstance(approvedAddresses: string[] = []): Lit {
    if (!Lit.instance) {
      Lit.instance = new Lit(approvedAddresses);
    }
    return Lit.instance;
  }

  async connect() {
    if (!this.isConnected) {
      this.litNodeClient = new LitJsSdk.LitNodeClient({
        litNetwork: LIT_NETWORK.DatilDev,
        debug: true
      });
      await this.litNodeClient.connect();
      this.isConnected = true;
      console.log("Lit Client connected");
    } else {
      console.log("Lit Client is already connected")
    }
  }

  async getAuthSig() {
    if (this.authSig) return this.authSig;
    this.authSig = await LitJsSdk.checkAndSignAuthMessage({ 
      chain: this.chain,
      nonce: await this.litNodeClient.getLatestBlockhash(),
    });
    return this.authSig;
  }

  private getAccessControlConditions() {
    if (this.approvedAddresses.length === 0) {
      throw new Error("No approved addresses provided");
    }
    const conditions: (AccessControlCondition | { operator: string })[] = [];
    this.approvedAddresses.forEach((address, index) => {
      conditions.push({
        conditionType: 'evmBasic',
        contractAddress: '',
        standardContractType: '',
        chain: this.chain,
        method: '',
        parameters: [':userAddress'],
        returnValueTest: {
          comparator: '=',
          value: address
        }
      });
      if (index < this.approvedAddresses.length - 1) {
        conditions.push({
          operator: 'or'
        });
      }
    });
    return conditions;
  }

  async encryptString(plainViewStr: string): Promise<{
    encryptedString: string;
    encryptedSymmetricKey: object;
  }> {
    if (!this.isConnected) throw new Error("Lit client not connected");

    const { ciphertext, dataToEncryptHash } = await encryptString(
      {
        dataToEncrypt: plainViewStr,
        accessControlConditions: this.getAccessControlConditions()
      },
      this.litNodeClient
    );

    const encryptedSymmetricKey = await this.litNodeClient.encrypt({
      accessControlConditions: this.getAccessControlConditions(),
      dataToEncrypt: new TextEncoder().encode(dataToEncryptHash),
    });

    return {
      encryptedString: ciphertext,
      encryptedSymmetricKey
    }
  }

  async decryptString(
    encryptedStr: string,
    encryptedSymmetricKey: {
      ciphertext: string;
      dataToEncryptHash: string;
    }
  ): Promise<string> {
    if (!this.isConnected) throw new Error("Lit client not connected");

    const authSig = await this.getAuthSig();

    const decryptedKey = await this.litNodeClient.decrypt({
      accessControlConditions: this.getAccessControlConditions(),
      ciphertext: encryptedSymmetricKey.ciphertext,
      dataToEncryptHash: encryptedSymmetricKey.dataToEncryptHash,
      chain: this.chain,
      authSig
    });

    console.log('decryptedKey:', decryptedKey);

    const decryptedString = await decryptToString(
      {
        ciphertext: encryptedStr,
        accessControlConditions: this.getAccessControlConditions(),
        chain: this.chain,
        authSig,
        dataToEncryptHash: new TextDecoder().decode(decryptedKey.decryptedData),
      },
      this.litNodeClient
    );

    return decryptedString
  }

  isInitialized(): boolean {
    return !!this.isConnected;
  }
}

// expose method to user when the app becomes public
export const litClient = Lit.getInstance([
  '0x829d550783E1495c8B8B063973437E0564bC311a',
  '0x61D0653F9B99f3571C643454E9Fe60ce50c3196e'
]);