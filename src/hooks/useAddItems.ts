"use client";
import { useWriteContract, usePublicClient } from 'wagmi';
import { useQueryClient } from '@tanstack/react-query';
import { ourListsContractAddress, ourListsContractABI } from '../contract/data';
import { baseSepolia } from 'wagmi/chains';
import { encrypt } from '../utils/crypto';

export function useAddItems(address: `0x${string}` | undefined) {
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();

  const { writeContractAsync } = useWriteContract({
    mutation: {
      onSuccess: async (hash) => {
        await publicClient?.waitForTransactionReceipt({ hash });

        await queryClient.invalidateQueries({
          queryKey: ["readContract"],
          refetchType: 'active'
        });

        await queryClient.refetchQueries({
          queryKey: ["readContract"],
          type: 'active'
        });
      }
    }
  });

  const addItemsToList = async (listName: string, items: string[]) => {
    const encryptedListName = encrypt(listName);
    const encryptedItems = items.map(item => encrypt(item));

    return writeContractAsync({
      address: ourListsContractAddress,
      abi: ourListsContractABI,
      functionName: "addItems",
      args: [encryptedListName, encryptedItems],
      chainId: baseSepolia.id,
      account: address,
    });
  };

  return { addItemsToList };
}