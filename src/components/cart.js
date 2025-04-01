// src/components/ui/card.js
import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};
