// src/components/ClaimCard.tsx
import React from "react";
import Link from "next/link";
import LinkPreviewCard from "./LinkPreviewCard";

interface ClaimCardProps {
  claim: string;
  rebuttal: string;
  id: number;
  sources?: string[];
  showReadMore?: boolean;
}

export default function ClaimCard({
  claim,
  rebuttal,
  id,
  sources,
  showReadMore = true,
}: ClaimCardProps) {
  const CardContent = () => (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{claim}</h3>
      <p className="text-gray-600 mb-4">{rebuttal}</p>
      
      {sources && sources.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-semibold text-gray-700">Sources:</h4>
          <div className="space-y-4">
            {sources.map((source, index) => (
              <div key={index} className="mb-2">
                <LinkPreviewCard url={source} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (!showReadMore) {
    return <CardContent />;
  }

  return (
    <Link href={`/claim/${id}`} className="block hover:no-underline">
      <CardContent />
    </Link>
  );
}