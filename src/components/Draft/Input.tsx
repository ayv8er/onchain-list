import { useState } from "react";

type InputProps = {
  draftItems: string[];
  selectedListName: string;
  setDraftItems: (items: string[]) => void;
};

export default function Input({ draftItems, setDraftItems, selectedListName }: InputProps) {
  const [item, setItem] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (draftItems.length >= 10) {
      alert("Draft List is full");
      return;
    } else if (item === "") {
      alert("Item cannot be empty");
      return;
    }
    setDraftItems([...draftItems, item]);
    setItem("");
  };

  return (
    <div className="w-full flex justify-center">
      <input 
        className="border border-gray-300 text-black rounded-md p-2 w-60"
        onChange={(e) => handleChange(e)}
        placeholder="Queue list items below"
        disabled={!selectedListName}
        value={item}
        type="text"
      />
      <button 
        className="border-black px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={!selectedListName}
        onClick={(e) => handleSubmit(e)}
      >
        Add
      </button>
    </div>
  )
};