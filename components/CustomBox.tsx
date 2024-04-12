import React from "react";

interface Props {
  text: string;
  number: string;
  icon: React.ReactNode; // Adjust the type if needed
  className?: string; // Make className optional
}

const CustomBox: React.FC<Props> = ({ text, number, icon, className }) => {
  return (
    <div className={`flex flex-col mx-auto bg-white p-6 rounded-lg shadow-lg cursor-pointer sm: mt-[4vh] xl:ml-[5vw] w-[300px] ${className}`}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-black text-4xl mb-2">{number}</h1>
          <h3 className="text-gray-600 mb-2">{text}</h3>
        </div>
        {icon}
      </div>
    </div>
  );
};

export default CustomBox;
