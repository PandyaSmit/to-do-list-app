"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SelectProps {
  onValueChange: (value: string) => void;
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
}

export function Select({ onValueChange, defaultValue, children, className }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className={cn("border rounded p-2 w-full", className)}
    >
      {children}
    </select>
  );
}

interface SelectValueProps {
  placeholder: string;
}

export function SelectValue({ placeholder }: SelectValueProps) {
  return <option value="" disabled>{placeholder}</option>;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export function SelectItem({ value, children }: SelectItemProps) {
  return <option value={value}>{children}</option>;
}
