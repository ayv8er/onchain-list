"use client";
import { useWriteContract, usePublicClient } from 'wagmi';
import { useQueryClient } from '@tanstack/react-query';
import { ourListsContractAddress, ourListsContractABI } from '../contract/data';
import { baseSepolia } from 'wagmi/chains';
import { encrypt } from '../utils/crypto';

export function useDeleteList(
  address: `0x${string}` | undefined,
) {
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();

  const { writeContractAsync } = useWriteContract({
    mutation: {
      onSuccess: async (hash) => {
        await publicClient?.waitForTransactionReceipt({ hash });
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["readContract", {
              address: ourListsContractAddress,
              functionName: "getListNames",
              chainId: baseSepolia.id,
              account: address,
            }]
          }),
          queryClient.invalidateQueries({
            queryKey: ["readContract", {
              address: ourListsContractAddress,
              functionName: "getList",
              chainId: baseSepolia.id,
              account: address,
            }]
          })
        ]);
        await Promise.all([
          queryClient.refetchQueries({
            queryKey: ["readContract", {
              address: ourListsContractAddress,
              functionName: "getListNames",
              chainId: baseSepolia.id,
              account: address,
            }]
          }),
          queryClient.refetchQueries({
            queryKey: ["readContract", {
              address: ourListsContractAddress,
              functionName: "getList",
              chainId: baseSepolia.id,
              account: address,
            }]
          })
        ])
      }
    }
  });

  const deleteList = async (listName: string) => {
    const encryptedListName = encrypt(listName);
    return writeContractAsync({
      address: ourListsContractAddress,
      abi: ourListsContractABI,
      functionName: "deleteList",
      args: [encryptedListName],
      chainId: baseSepolia.id,
      account: address,
    });
  };

  return { deleteList };
};