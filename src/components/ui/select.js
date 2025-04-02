// src/components/ui/select.js
import React from "react";

export const Select = ({ value, onValueChange, className, children }) => {
  return (
    <select
      className={`border rounded-lg p-2 ${className}`}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    >
      {children}
    </select>
  );
};

export const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};
