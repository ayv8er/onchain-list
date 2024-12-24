import DraftItem from "./DraftItem";

type DraftItemsProps = {
  draftItems: string[];
  handleRemoveItemFromDraft: (index: number) => void;
  handleSaveToOnchainList: () => void;
};

export default function DraftItems({ 
  draftItems,
  handleRemoveItemFromDraft,
  handleSaveToOnchainList
}: DraftItemsProps) {
  return (
    <div className="rounded-lg p-4 w-full">
      <h2 className="font-semibold mb-3">Draft List ({draftItems.length}/10)</h2>
      {draftItems.length === 0 ? (
        <p className="text-gray-500 text-sm">No items to save</p>
      ) : (
        <ul className="grid grid-cols-2 gap-2">
          {draftItems.map((item: string, index: number) => (
            <DraftItem 
              key={index}
              item={item} 
              index={index}
              handleRemoveItemFromDraft={handleRemoveItemFromDraft}
            />
          ))}
        </ul>
      )}
      {draftItems.length > 0 && (
        <button 
          className="border border-gray-300 bg-gray-800 text-blue-600 rounded-md p-2 w-full font-bold hover:bg-white text-black"
          onClick={handleSaveToOnchainList}
          type="submit"
        > 
          Save to Onchain List
        </button>
      )}
    </div>
  );
};