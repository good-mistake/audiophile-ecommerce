import React from "react";
import "./radio.scss";
interface RadioProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  options: string[];
}
const Radio: React.FC<RadioProps> = ({ options, value, onChange }) => {
  return (
    <div>
      {options.map((option) => (
        <label htmlFor="radio" key={option}>
          <input
            type="radio"
            value={option}
            checked={value === option}
            onChange={onChange}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Radio;
