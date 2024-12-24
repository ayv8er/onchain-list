"use client";
import { useReadContract } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { ourListsContractAddress, ourListsContractABI } from '../contract/data';
import { encrypt, decrypt } from '../utils/crypto';
import { baseSepolia } from 'wagmi/chains';
import { getConfig } from '../providers/configs';

export function useList(listName: string) {
  const { data: decryptedListItems, isLoading, refetch } = useReadContract({
    address: ourListsContractAddress,
    abi: ourListsContractABI,
    functionName: "getList",
    args: listName ? [encrypt(listName)] : undefined,
    chainId: baseSepolia.id,
    query: {
      enabled: !!listName,
      select: (data) => (data as string[]).map(item => decrypt(item))
    }
  });

  return {
    decryptedListItems: decryptedListItems || [],
    isLoading,
    refetch
  };
}

export async function getList(listName: string) {
  if (!listName) return [];
  const encryptedName = encrypt(listName);
  const result = await readContract(getConfig(),{
    address: ourListsContractAddress,
    abi: ourListsContractABI,
    functionName: "getList",
    args: [encryptedName],
    chainId: baseSepolia.id,
  });
  
  return (result as string[]).map(item => decrypt(item));
} 