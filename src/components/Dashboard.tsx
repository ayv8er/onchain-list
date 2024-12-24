"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useCreateList } from "../hooks/useCreateList";
import { useListNames } from "../hooks/useListNames";
import { useAddItems } from "../hooks/useAddItems";
import { useWallet } from "../hooks/useWallet";
import { useList } from "../hooks/useList";
import CreateListModal from "./List/CreateListModal";
import DraftContainer from "./Draft/DraftContainer";
import ListContainer from "./List/ListContainer";
import CurrentItems from "./Current/CurrentItems";
import AccessDenied from "./AccessDenied";
import Loader from "./Loader";
import Footer from "./Footer";

export default function Dashboard() {
  const [selectedListName, setSelectedListName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toDeleteItemsIndexed, setToDeleteItemsIndexed] = useState<number[]>([]);
  const [draftItems, setDraftItems] = useState<string[]>([]);
  const { address, isOwner, isOwnerLoading } = useWallet();
  const { decryptedListItems } = useList(selectedListName);
  const { decryptedListNames } = useListNames(address);
  const { addItemsToList } = useAddItems(address);
  const { createList } = useCreateList((listName) => setSelectedListName(listName));
  const selectedListNameRef = useRef<string>("");

  selectedListNameRef.current = selectedListName;

  const items: string[] = useMemo(() => (decryptedListItems as unknown as string[]) ?? [], [decryptedListItems]);

  useEffect(() => {
    if (!selectedListNameRef.current || !decryptedListNames.includes(selectedListNameRef.current)) {
      setSelectedListName(decryptedListNames[0] || "");
    }
  }, [decryptedListNames]);
  
  const handleSelectListName = useCallback((listName: string) => {
    setSelectedListName(listName);
  }, [setSelectedListName]);

  const handleCreateList = useCallback(async (listName: string) => {
    try {
      setIsLoading(true);
      await createList(listName);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [createList]);

  const handleSaveToOnchainList = useCallback(async () => {
    try {
      setIsLoading(true);
      await addItemsToList(selectedListName, draftItems);
      setDraftItems([]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [addItemsToList, draftItems, selectedListName]);

  const handleRemoveItemFromDraft = useCallback((index: number) => {
    setDraftItems(prevItems => prevItems.filter((_, i) => i !== index));
  }, [setDraftItems]);

  if (isOwnerLoading) {
    return <Loader />
  }

  if (!isOwner) {
    return <AccessDenied />
  }

  return (
    <div className="mx-auto w-full max-w-[430px] min-h-screen border">
      <div className="flex flex-col h-full">
        <div className="flex-grow flex flex-col items-center py-20 space-y-8">
          {
            isLoading ? <Loader /> : (
              <>
                <div className="space-y-4 w-full">  
                  <ListContainer 
                    items={items}
                    listNames={decryptedListNames}
                    selectedListName={selectedListName}
                    handleSelectListName={handleSelectListName}
                    setIsModalOpen={setIsModalOpen}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                  <CreateListModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    handleCreateList={handleCreateList}
                    listNames={decryptedListNames}
                  />
                  <CurrentItems
                    items={items}
                    selectedListName={selectedListName}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    toDeleteItemsIndexed={toDeleteItemsIndexed} 
                    setToDeleteItemsIndexed={setToDeleteItemsIndexed}
                  />
                </div>
                <DraftContainer 
                  draftItems={draftItems} 
                  selectedListName={selectedListName}
                  setDraftItems={setDraftItems}
                  handleSaveToOnchainList={handleSaveToOnchainList}
                  handleRemoveItemFromDraft={handleRemoveItemFromDraft} 
                />
              </>
            )
          }
        </div>
        <Footer />
      </div>
    </div>
  );
};