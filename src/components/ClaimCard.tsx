import React from "react";
import LinkPreviewCard from "./LinkPreviewCard";

interface ClaimCardProps {
  claim: string;
  rebuttal: string;
  sources: string[];
}

export default function ClaimCard({ claim, rebuttal, sources }: ClaimCardProps) {
  return (
    <div
      className="
        max-w-3xl w-full p-6 
        rounded-xl 
        bg-warm-card
        backdrop-blur-sm
        shadow-lg
        border border-warm-border
        text-warm-text
      "
    >
      <h1 className="text-2xl font-bold mb-4">Claim</h1>
      <p className="mb-6 text-lg">{claim}</p>

      <h2 className="text-xl font-semibold mb-2">Rebuttal</h2>
      <p className="mb-4 text-md">{rebuttal}</p>

      {sources && sources.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4">Sources</h3>
          <div className="space-y-4">
            {sources.map((source, idx) => (
              <LinkPreviewCard key={idx} url={source} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}