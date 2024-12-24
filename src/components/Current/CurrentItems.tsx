"use client";
import { useCallback } from "react";
import { useWallet } from "../../hooks/useWallet";
import { useDeleteItems } from "../../hooks/useDeleteItems";
import CurrentItem from "./CurrentItem";

interface CurrentItemsProps {
  items: string[];
  selectedListName: string;
  isLoading: boolean;
  toDeleteItemsIndexed: number[];
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setToDeleteItemsIndexed: React.Dispatch<React.SetStateAction<number[]>>;
};

export default function CurrentItems({ 
  items,
  selectedListName, 
  toDeleteItemsIndexed, 
  setToDeleteItemsIndexed,
  setIsLoading
}: CurrentItemsProps) {
  const { address } = useWallet();
  const { deleteItemsFromList, isError } = useDeleteItems(address);

  const handleCheckBoxChange = useCallback((index: number, checked: boolean) => {
    setToDeleteItemsIndexed((prevItems: number[]) => checked ? [...prevItems, index] : prevItems.filter(i => i !== index));
  }, [setToDeleteItemsIndexed]);
  
  const handleDeleteSelected = useCallback(async () => {
    try {
      setIsLoading(true);
      const toDeleteItemsString = toDeleteItemsIndexed.map(index => (items[index]));
      await deleteItemsFromList(selectedListName, toDeleteItemsString);
      setToDeleteItemsIndexed([]);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, toDeleteItemsIndexed, items, selectedListName, setToDeleteItemsIndexed, deleteItemsFromList]);
  
  if (isError) return <div>Error fetching list</div>

  return (
    <div className="rounded-lg p-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold mb-3">
          {selectedListName} list ({items?.length || 0}/50)
        </h2>
        { toDeleteItemsIndexed.length > 0 && (
          <p 
            className="text-blue-500 hover:text-blue-600 cursor-pointer"
            onClick={handleDeleteSelected}
          > 
            Delete Selected
          </p>
        )}
      </div>
      {items?.length === 0 ? (
        <p className="text-gray-500 text-sm">There are no items on this list</p>
      ) : (
        <ul className="grid grid-cols-2 gap-2">
          {items?.map((item: string, index: number) => (
            <CurrentItem 
              item={item} 
              index={index} 
              key={index} 
              handleCheckBoxChange={handleCheckBoxChange}
              isChecked={toDeleteItemsIndexed.includes(index)}
            />
          ))}
        </ul>
      )}
    </div>
  )
};