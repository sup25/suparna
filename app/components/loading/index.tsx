import { TbLoader } from "react-icons/tb";
export const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full inset-0 ">
      <TbLoader size={50} className="animate-spin  text-[rgb(255,215,0)]" />
    </div>
  );
};
