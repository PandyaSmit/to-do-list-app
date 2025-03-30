"use client";

import { useState } from "react";
import { Select, SelectValue, SelectItem } from "@/components/ui/select";

interface FilterComponentProps {
  onFilterChange: (filter: string) => void;
}

export function FilterComponent({ onFilterChange }: FilterComponentProps) {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (value: string) => {
    setFilter(value);
    onFilterChange(value);
  };

  return (
    <div className="flex gap-2 items-center">
      <Select onValueChange={handleFilterChange} defaultValue={filter}>
        <SelectValue placeholder="Filter by status" />
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
        <SelectItem value="incomplete">Incomplete</SelectItem>
      </Select>
    </div>
  );
}