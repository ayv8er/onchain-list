import { useRef } from "react";
import { useDisconnect } from "wagmi";

export default function Footer() {
  const { disconnect } = useDisconnect();
  const disconnectInProgress = useRef(false);

  function handleDisconnect() {
    disconnectInProgress.current = true;
    disconnect();
  };

  return (
    <footer className="w-full border-t">
      <div className="container mx-auto py-4 flex justify-around">
        <a
          href="https://www.alchemy.com/faucets/base-sepolia"
          className="text-blue-500 hover:text-blue-600 cursor-pointer font-bold"
        >
          Base Sepolia Faucet
        </a>
        <button
          onClick={handleDisconnect}
          className="text-blue-500 hover:text-blue-600 cursor-pointer font-bold"
        >
          Disconnect
        </button>
      </div>
    </footer>
  )
};