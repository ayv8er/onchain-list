import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import { createConfig } from "wagmi";
import { http } from "viem";

export function getConfig() {
  return createConfig({
    chains: [baseSepolia],
    transports: {
      [baseSepolia.id]: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL),
    },
    connectors: [coinbaseWallet({
      appName: "Our Lists",
    })],
    syncConnectedChain: true,
  });
};