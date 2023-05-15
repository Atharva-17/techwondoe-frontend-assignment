import React from "react";

type Props = {
  isBlue: boolean;
  children?: React.ReactNode;
};

const Button: React.FC<Props> = ({ isBlue, children }) => {
  return (
    <button
      className={`flex gap-2 self-center rounded-lg shadow-md px-5 py-2  text-white ${
        isBlue ? "bg-blue-500" : "bg-white border border-gray-400 text-black"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
