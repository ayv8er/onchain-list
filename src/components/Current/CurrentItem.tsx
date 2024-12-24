export default function CurrentItem({ 
  item, 
  index,
  isChecked,
  handleCheckBoxChange
}: { 
  item: string;
  index: number; 
  isChecked: boolean; 
  handleCheckBoxChange: (index: number, checked: boolean) => void; 
}) {
  return (
      <li key={index} className="flex justify-between items-center p-2 bg-gray-100 text-black rounded-md mb-2">
        {item}
        <input
          className="w-5 h-5"
          type="checkbox" 
          id={`item-${index}`} 
          checked={isChecked}
          onChange={(e) => handleCheckBoxChange(index, e.target.checked)}
        />
      </li>
  )
};