import React from "react";
import { Pencil, Trash } from "phosphor-react";
import ToggleButton from "../togglebutton";

const MenuTile: React.FC<{
  name?: string;
  price?: number | string;
  image?: string;
  measure?: string;
  toggleValue: boolean;
  toggleOnChange?: (checked: boolean) => void;
}> = ({ name, price, image, toggleValue, toggleOnChange = () => {} , measure }) => {
  return (
    <div className="relative w-[90%] xl:w-[60%] flex flex-row bg-white rounded-md shadow-md ml-2 md:ml-4 md:mt-10 xl:mt-4 xl:ml-12 lg:w-[70%] mt-4 sm:mt-8 md:w-[70%]">
      <img
        className="mb-3 ml-2 md:ml-10 h-24 md:h-[10vh] xl:h-[10vh] w-24 lg:h-[8vh] lg:mb-8 lg:w-[9vw] md:w-[10vw] xl:w-[8vw] mt-7 md:mt-[4vh] object-cover rounded-md"
        src={image}
        alt=""
      />
      <div className="flex flex-col mt-2 md:mt-[4vh] ml-2 md:ml-[1vw]">
        <h3 className="mb-1">{name}</h3>
        <h4 className="text-red-500">{`${price} per ${measure}`}</h4>
      </div>
      <div className="flex items-center justify-center">
        <ToggleButton value={toggleValue} onChange={toggleOnChange} />
      </div>
      <div className="absolute top-1/3 transform -translate-y-1/2 right-0 flex items-center space-x-2 md:space-x-5 pr-2 md:pr-[3vw]">
        <button className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-black rounded-full hover:bg-black text-white cursor-pointer">
          <Pencil size={16} />
        </button>
        <button className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-red-500 rounded-full hover:bg-red-600 text-white cursor-pointer">
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default MenuTile;
