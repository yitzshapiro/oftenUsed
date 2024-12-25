"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "../components/SearchBar";
import ClaimCard from "../components/ClaimCard";

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
      const response = await fetch("/api/data");
      const data = await response.json();
      setClaimsAndRebuttals(data.claims_and_rebuttals);
      setFilteredClaims(
        data.claims_and_rebuttals.map((item: ClaimItem, index: number) => ({
          ...item,
          originalIndex: index,
        }))
      );
    }
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = claimsAndRebuttals
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter((item) => item.claim.toLowerCase().includes(lowerCaseQuery));
    setFilteredClaims(filtered);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800">Often Used</h1>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          <SearchBar onSearch={handleSearch} />

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Popular Claims
            </h2>
            {filteredClaims.length > 0 ? (
              <div className="grid gap-6">
                {filteredClaims.map((item) => (
                  <ClaimCard
                    key={item.originalIndex}
                    claim={item.claim}
                    rebuttal={item.rebuttal}
                    id={item.originalIndex}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No claims found.</p>
            )}
          </section>
        </div>
      </main>

      <footer className="bg-white shadow mt-10">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Often Used. All rights reserved.
        </div>
      </footer>
    </div>
  );
}