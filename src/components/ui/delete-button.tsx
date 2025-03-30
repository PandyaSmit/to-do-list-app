// /src/components/ui/delete-button.tsx
"use client";

import { Button } from "@/components/ui/button";

interface DeleteButtonProps {
  onDelete: () => void;
}

export function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <Button
      variant="destructive"
      onClick={onDelete}
      className="p-2 text-white bg-red-500 hover:bg-red-600"
    >
      🗑️
    </Button>
  );
}
