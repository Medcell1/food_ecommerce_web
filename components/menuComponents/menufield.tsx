import React from "react";

interface MenuTextFieldProps {
  input: {
    id: any;
    label: any;
    placeholder?: string;
  };
  value: string;
  handleChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
}

const MenuTextField: React.FC<MenuTextFieldProps> = ({
  input,
  value,
  handleChange,
  className,
}) => {
  return (
    <div className={`${className || "w-[40%]"} inline-flex flex-col items-start gap-[8px]`}>
      <div className="w-fit mt-2 font-normal text-black text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
        {input.label}
      </div>
      <div className="relative w-full">
        <input
          maxLength={300}
          id={input.id}
          value={value}
          onChange={handleChange}
          className="w-full p-2 text-gray-900 bg-white border border-gray-200 rounded-lg"
          placeholder={input.placeholder}
        />
      </div>
    </div>
  );
};

export default MenuTextField;
