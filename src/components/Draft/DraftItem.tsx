interface Props {
  item: string;
  index: number;
  handleRemoveItemFromDraft: (index: number) => void;
};

export default function DraftItem({ item, index, handleRemoveItemFromDraft }: Props) {
  return (
    <li className="flex justify-between items-center p-2 bg-gray-100 text-black rounded-md mb-2">
      {item}
      <span
        className="cursor-pointer text-red-500 px-2 font-bold"
        onClick={() => handleRemoveItemFromDraft(index)}
      >
        X
      </span>
    </li>
  )
};