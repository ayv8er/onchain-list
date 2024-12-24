import ListActions from "./ListActions";
import ListSelector from "./ListSelector";

interface ListContainerProps {
  items: string[];
  isLoading: boolean;
  listNames: string[];
  selectedListName: string;
  setIsModalOpen: (isOpen: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  handleSelectListName: (name: string) => void;
}

export default function ListContainer({ 
  items,
  isLoading, 
  listNames, 
  selectedListName, 
  setIsModalOpen, 
  handleSelectListName, 
  setIsLoading, 
}: ListContainerProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center px-2">
      <ListSelector 
        listNames={listNames || []}
        selectedListName={selectedListName}
        handleSelectListName={handleSelectListName}
        setIsModalOpen={setIsModalOpen} 
      />
      <ListActions
        items={items}
        listNames={listNames || []}
        isLoading={isLoading}
        selectedListName={selectedListName}
        setIsLoading={setIsLoading}
      />
    </div>
  )
};