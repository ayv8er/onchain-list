import { useAccount, useReadContract } from 'wagmi';
import { ourListsContractAddress, ourListsContractABI } from '../contract/data';
import { baseSepolia } from 'wagmi/chains';

export function useWallet() {
  const { address, isConnected, isDisconnected } = useAccount();

  const { data: isOwner, isLoading: isOwnerLoading } = useReadContract({
    address: ourListsContractAddress,
    abi: ourListsContractABI,
    functionName: "isOwner",
    args: [address],
    chainId: baseSepolia.id,
    account: address,
    query: {
      enabled: !!address && isConnected
    }
  });

  return {
    address,
    isConnected,
    isOwner: isOwner || false,
    isOwnerLoading,
    isDisconnected
  };
}