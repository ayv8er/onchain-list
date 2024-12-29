import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LIT_NETWORK } from "@lit-protocol/constants";

class Lit {
  private static instance: Lit;
  private isConnected = false;
  litNodeClient!: LitJsSdk.LitNodeClient;
  chain;

  constructor(chain: string){
    this.chain = chain;
  }

  static getInstance(chain: string = "ethereum"): Lit {
    if (!Lit.instance) {
      Lit.instance = new Lit(chain);
    }
    return Lit.instance;
  }

  async connect() {
    if (!this.isConnected) {
      this.litNodeClient = new LitJsSdk.LitNodeClient({
        litNetwork: LIT_NETWORK.DatilDev,
      });
      await this.litNodeClient.connect();
      this.isConnected = true;
      console.log("Lit Client connected");
    } else {
      console.log("Lit Client is already connected")
    }
  }

  isInitialized() {
    return this.isConnected;
  }
}

export const litClient = Lit.getInstance();