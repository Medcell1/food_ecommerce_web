import React from 'react';
import Switch from 'react-switch';

interface ToggleButtonProps {
  value: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ value, onChange }) => {
  return (
    <Switch
      checked={value}
      onChange={onChange}
      onColor="#DD2F6E"
      onHandleColor="#ffffff"
      handleDiameter={20}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      height={28}
      width={50}
      className="react-switch"
    />
  );
};

export default ToggleButton;
