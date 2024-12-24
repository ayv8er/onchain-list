"use client";
import { useState } from "react";
import { getList } from "../../hooks/useList";
import { useWallet } from "../../hooks/useWallet";
import { useDeleteList } from "../../hooks/useDeleteList";
import { useDeleteItems } from "../../hooks/useDeleteItems";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface ListActionsProps {
  items: string[];
  listNames: string[];
  isLoading: boolean;
  selectedListName: string;
  setIsLoading: (loading: boolean) => void;
};

export default function ListActions({ 
  items,
  listNames, 
  isLoading, 
  selectedListName, 
  setIsLoading,
}: ListActionsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { address } = useWallet();
  const { deleteItemsFromList } = useDeleteItems(address);
  const { deleteList } = useDeleteList(address);

  const handleEmptyList = async () => {
    try {
      setIsLoading(true);
      const currentItems = await getList(selectedListName);
      const itemsToDelete = currentItems.map(item => (item));
      await deleteItemsFromList(selectedListName, itemsToDelete);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteList = async () => {
    try {
      setIsLoading(true);
      await deleteList(selectedListName);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-xs">
      <button
        onClick={handleToggleChange}
        className="w-full mb-2 text-black bg-gray-100 rounded-md
                 hover:bg-gray-200 flex items-center justify-center gap-3"
      >
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        List Actions
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className="flex gap-2 w-full animate-fadeIn">
          <button
            onClick={handleEmptyList}
            disabled={isLoading || !items?.length}
            className="flex-1 px-4 py-2 text-red-500 border border-red-500 rounded-md 
                     hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Empty List
          </button>
          <button
            onClick={handleDeleteList}
            disabled={isLoading || !listNames?.length}
            className="flex-1 px-4 py-2 text-red-600 border border-red-600 rounded-md 
                     hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete List
          </button>
        </div>
      )}
    </div>
  );
};