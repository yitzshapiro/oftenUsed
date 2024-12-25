"use client";

import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="max-w-md w-full">
      <input
        type="text"
        placeholder="Search claims..."
        className="
          w-full px-4 py-2 
          rounded-full 
          focus:outline-none
          border-2 border-warm-border
          focus:border-warm-accent 
          text-warm-text
          bg-warm-card
        "
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
}