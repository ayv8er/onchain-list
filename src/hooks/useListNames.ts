"use client";
import { useReadContract } from 'wagmi';
import { ourListsContractAddress, ourListsContractABI } from '../contract/data';
import { decrypt } from '../utils/crypto';
import { baseSepolia } from 'wagmi/chains';

export function useListNames(address: `0x${string}` | undefined) {
  const { data: decryptedListNames, isLoading, refetch } = useReadContract({
    address: ourListsContractAddress,
    abi: ourListsContractABI,
    functionName: "getListNames",
    args: [],
    chainId: baseSepolia.id,
    account: address || undefined,
    query: {
      enabled: !!address,
      select: (data) => (data as string[]).map(name => decrypt(name)),
      staleTime: 0,
      gcTime: 0
    }
  });

  return {
    decryptedListNames: decryptedListNames || [],
    isLoading,
    refetch
  };
}