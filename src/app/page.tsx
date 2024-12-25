"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "../components/SearchBar";

interface ClaimItem {
  claim: string;
  rebuttal: string;
  sources: string[];
}

interface ClaimWithIndex extends ClaimItem {
  originalIndex: number;
}

export default function Home() {
  const [claimsAndRebuttals, setClaimsAndRebuttals] = useState<ClaimItem[]>([]);
  const [filteredClaims, setFilteredClaims] = useState<ClaimWithIndex[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/data');
      const data = await response.json();
      setClaimsAndRebuttals(data.claims_and_rebuttals);
      setFilteredClaims(data.claims_and_rebuttals.map((item: ClaimItem, index: number) => ({
        ...item,
        originalIndex: index
      })));
    }
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = claimsAndRebuttals
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter(item => item.claim.toLowerCase().includes(lowerCaseQuery));
    setFilteredClaims(filtered);
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-start py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-warm-text">Often Used</h1>
        <p className="text-xl text-warm-accent">
          Quickly link a sourced rebuttal to common claims you see online.
        </p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {/* Popular claims */}
      <section className="mt-8 w-full max-w-3xl space-y-4">
        <h2 className="text-2xl font-semibold text-warm-text">Popular Claims</h2>
        {filteredClaims.map((item) => (
          <div
            key={`${item.originalIndex}-${item.claim}`}
            className="
              p-4 rounded-lg 
              shadow-md 
              backdrop-blur-sm 
              border border-warm-border
              bg-warm-card
            "
          >
            <p className="font-bold text-lg mb-2 text-warm-text">{item.claim}</p>
            <Link
              href={`/claim/${item.originalIndex}`}
              className="text-warm-accent hover:underline"
            >
              Read Rebuttal
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}