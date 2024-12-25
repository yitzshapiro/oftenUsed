// src/components/SearchBar.tsx
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
    <div className="relative">
      <input
        type="text"
        placeholder="Search claims..."
        className="
          w-full 
          px-4 
          py-3 
          border 
          border-gray-300 
          rounded-full 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:border-transparent 
          shadow-sm
          bg-gray-50
        "
        value={query}
        onChange={handleInputChange}
      />
      <svg
        className="absolute left-3 top-3 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="20"
        height="20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 015.15 12.65z"
        />
      </svg>
    </div>
  );
}