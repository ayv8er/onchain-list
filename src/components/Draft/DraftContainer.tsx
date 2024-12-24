import DraftItems from "./DraftItems";
import Input from "./Input";
  
interface DraftContainerProps {
  draftItems: string[];
  selectedListName: string;
  setDraftItems: (items: string[]) => void;
  handleSaveToOnchainList: () => void;
  handleRemoveItemFromDraft: (index: number) => void;
};

export default function DraftContainer({ 
  draftItems, 
  selectedListName,
  setDraftItems, 
  handleSaveToOnchainList,
  handleRemoveItemFromDraft,
}: DraftContainerProps) {
  return (
    <div className="w-full flex flex-col items-center justify-around">
      <Input 
        draftItems={draftItems} 
        selectedListName={selectedListName}
        setDraftItems={setDraftItems} 
      />
      <DraftItems 
        draftItems={draftItems} 
        handleRemoveItemFromDraft={handleRemoveItemFromDraft} 
        handleSaveToOnchainList={handleSaveToOnchainList}
      />
    </div>
  )
};