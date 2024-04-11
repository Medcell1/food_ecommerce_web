import React from "react";
interface Props{
  text: string,
  number: string,
  icon: any

}
const CustomBox: React.FC<Props> = ({text, number, icon}) => {
  return (
    <div className="flex flex-col w-full md:w-2/3 lg:w-1/2 xl:w-1/6 mx-auto bg-white p-6 rounded-lg shadow-lg cursor-pointer mt-[20vh]">
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
