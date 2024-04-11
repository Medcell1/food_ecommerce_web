import React, { ChangeEvent, ReactElement } from 'react';
import { WarningCircle } from 'phosphor-react';

// Import the error icon

interface CustomTextFieldProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
  name: string;
  icon?: ReactElement;
  placeholder: string;
  validationMessage?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  onChange,
  value,
  type = 'text',
  name,
  icon,
  placeholder,
  validationMessage,
}: CustomTextFieldProps) => {
  return (
    <div className="custom-textfield">
      {icon && <span className="prefix-icon">{icon}</span>}
      {type === 'file' ? (
        <input
          type={type}
          name={name}
          onChange={onChange}
          accept="image/*"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
      {validationMessage && (
        <span className="suffix-icon error">
          <WarningCircle size={16} />
        </span>
      )}
      {validationMessage && (
        <div className="validation-message">{validationMessage}</div>
      )}
    </div>
  );
};

export default CustomTextField;
