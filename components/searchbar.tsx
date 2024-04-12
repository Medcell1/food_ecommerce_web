import React, { ChangeEvent } from "react";
import { MagnifyingGlass } from "phosphor-react";

const SearchBar: React.FC<{ onChange: (e: ChangeEvent<HTMLInputElement>) => void; value: string }> = ({
  onChange,
  value,
}) => {
  return (
    <div className="relative flex items-center ml-2 md:ml-12 mt-5 w-[50%]">
      <MagnifyingGlass
        className="absolute left-0 ml-2 text-gray-500"
        size={20}
      />
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search..."
        className="w-full py-4 pl-10 pr-8 bg-gray-100 border border-black rounded-lg focus:outline-none focus:border-gray-500"
      />
    </div>
  );
};

export default SearchBar;
