import { Link } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleNav } from "../../redux/headerSlice.ts";

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  to,
  children,
  className = "",
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleNav());
  };
  return (
    <Link to={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default CustomLink;
