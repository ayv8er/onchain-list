"use client";
import { useWriteContract, usePublicClient } from 'wagmi';
import { useQueryClient } from '@tanstack/react-query';
import { ourListsContractAddress, ourListsContractABI } from '../contract/data';
import { encrypt, decrypt } from '../utils/crypto';
import { baseSepolia } from 'wagmi/chains';

export function useCreateList(onSuccess?: (listName: string) => void) {
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();

  const { writeContractAsync } = useWriteContract({
    mutation: {
      onSuccess: async (hash, { args}) => {
        await publicClient?.waitForTransactionReceipt({ hash });
        await queryClient.invalidateQueries({
          queryKey: ["readContract", {
            address: ourListsContractAddress,
            functionName: "getListNames"
          }]
        });
        await queryClient.refetchQueries({
          queryKey: ["readContract", {
            address: ourListsContractAddress,
            functionName: "getListNames"
          }]
        });
        if (onSuccess && args?.[0]) {
          onSuccess(decrypt(args[0] as string));
        }
      }
    }
  });

  const createList = async (listName: string) => {
    const encryptedName = encrypt(listName);
    return writeContractAsync({
      address: ourListsContractAddress,
      abi: ourListsContractABI,
      functionName: "createList",
      args: [encryptedName],
      chainId: baseSepolia.id,
    });
  };

  return { createList };
}