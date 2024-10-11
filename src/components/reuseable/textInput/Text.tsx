import React from "react";
import "./text.scss";
interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Text: React.FC<TextInputProps> = ({ value, onChange }) => {
  return <input type="text" value={value} onChange={onChange} />;
};

export default Text;
