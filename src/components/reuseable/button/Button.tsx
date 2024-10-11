import React from "react";
import "./button.scss";
interface ButtonProps {
  variant?: "dark" | "light" | "shop" | "border" | "goBack";
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
const Button: React.FC<ButtonProps> = ({
  variant,
  text,
  onClick,
  type = "button",
}) => {
  return (
    <button className={`button ${variant}`} onClick={onClick} type={type}>
      {text}
      {variant === "shop" && (
        <img src="/assets/shared/desktop/icon-arrow-right.svg" alt="Icon" />
      )}
    </button>
  );
};

export default Button;
