import React from "react";

type Props = {
  isActive?: boolean;
  children?: React.ReactNode;
};

const Badge: React.FC<Props> = ({ children, isActive = true }) => {
  return (
    <div
      className={`flex gap-2 font-medium text-left rounded-full w-fit shadow-md px-2 items-center py-0.5 ${
        isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-800"
      }`}
    >
      {children}
    </div>
  );
};

export default Badge;
