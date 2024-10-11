import React from "react";
import "./numberInput.scss";
interface NumberInputProps {
  value: number;
  plus: () => void;
  minus: () => void;
}
const NumberInput: React.FC<NumberInputProps> = ({ value, plus, minus }) => {
  return (
    <div className="numberContainer">
      <button onClick={minus}>-</button>
      <input type="number" readOnly value={value} />
      <button onClick={plus}>+</button>
    </div>
  );
};

export default NumberInput;
