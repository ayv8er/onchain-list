import { ClimbingBoxLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex flex-grow items-center justify-center">
      <ClimbingBoxLoader color="#3B82F6" size={25} />
    </div>
  )
};