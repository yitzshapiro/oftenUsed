"use client";

import React, { useEffect, useState } from "react";

interface LinkPreviewCardProps {
  url: string;
}

interface LinkMeta {
  title: string | null;
  description: string | null;
  url: string;
}

export default function LinkPreviewCard({ url }: LinkPreviewCardProps) {
  const [meta, setMeta] = useState<LinkMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPreview() {
      try {
        setLoading(true);

        // Call our /api/preview route, passing in ?url=...
        const encodedUrl = encodeURIComponent(url);
        const res = await fetch(`/api/preview?url=${encodedUrl}`);
        const data = await res.json();

        if (!data.error) {
          setMeta({
            title: data.title,
            description: data.description,
            url: data.url,
          });
        }
      } catch (err) {
        console.error("Preview fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPreview();
  }, [url]);

  if (loading) {
    return (
      <div className="border border-warm-border rounded-lg p-4 bg-white/70 text-warm-text">
        Loading preview...
      </div>
    );
  }

  if (!meta) {
    // If no metadata was returned or an error occurred
    return (
      <div className="border border-red-300 rounded-lg p-4 bg-white/70 text-red-600">
        Could not load preview for {url}
      </div>
    );
  }

  return (
    <div
      className="
        border border-warm-border 
        rounded-lg 
        p-4 
        bg-white/70 
        backdrop-blur-sm
        text-warm-text
        hover:shadow-md
        transition-shadow
      "
    >
      {/* The link as a clickable block */}
      <a href={meta.url} target="_blank" rel="noreferrer" className="block">
        {/* Title & Description */}
        {meta.title && (
          <h4 className="text-lg font-semibold mb-1 line-clamp-1">{meta.title}</h4>
        )}
        {meta.description && (
          <p className="text-sm text-gray-700 line-clamp-2">{meta.description}</p>
        )}

        {/* Actual link displayed */}
        <p className="mt-2 text-sm text-warm-accent underline overflow-hidden whitespace-nowrap text-ellipsis">
          {url}
        </p>
      </a>
    </div>
  );
}