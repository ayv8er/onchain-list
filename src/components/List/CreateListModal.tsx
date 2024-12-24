import { useState } from "react";

interface CreateListModalProps {
  listNames: string[];
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  handleCreateList: (name: string) => void;
};

export default function CreateListModal({ 
  listNames,
  isModalOpen, 
  setIsModalOpen, 
  handleCreateList
}: CreateListModalProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (listNames.includes(name)) {
      setError("List name already exists");
      return;
    }
    try {
      handleCreateList(name);
      setName("");
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError("");
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="border bg-black p-8 rounded-lg w-96">
        <h2 className="text-xl text-white mb-4">Create New List</h2>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => handleChange(e)}
            className="w-full p-2 border rounded mb-4 text-black"
            placeholder="Enter list name"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 text-white hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};