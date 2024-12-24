interface ListSelectorProps {
  listNames: string[];
  selectedListName: string;
  setIsModalOpen: (isOpen: boolean) => void;
  handleSelectListName: (name: string) => void;
};

export default function ListSelector({ 
  listNames, 
  selectedListName, 
  setIsModalOpen, 
  handleSelectListName, 
}: ListSelectorProps) {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "create") {
      setIsModalOpen(true);
      e.target.value = "";
    } else {
      handleSelectListName(e.target.value);
    }
  };

  const getHeaderText = () => {
    return listNames.length === 0 ? "Create Onchain List" : "Select Onchain List";
  };

  return (
    <div className="w-full max-w-xs mb-4">
      <h2 className="text-lg">{getHeaderText()}</h2>
      <select 
        className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900
                   text-base appearance-none mobile:text-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   [&>*]:py-2 [&>*]:px-4"
        value={selectedListName}
        onChange={handleChange}
      >
        <option value="" disabled>Select a list</option>
        {listNames.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
        <option value="create" className="py-2">Create New List</option>
      </select>
    </div>
  );
};