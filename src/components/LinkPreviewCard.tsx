// src/components/LinkPreviewCard.tsx
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
      <div className="border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-500 text-sm">
        Loading preview...
      </div>
    );
  }

  if (!meta) {
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noreferrer" 
        className="text-blue-500 hover:text-blue-700 hover:underline break-all"
      >
        {url}
      </a>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <a href={meta.url} target="_blank" rel="noreferrer" className="block">
        {meta.title && (
          <h4 className="text-md font-semibold text-blue-600 mb-1 line-clamp-1">
            {meta.title}
          </h4>
        )}
        {meta.description && (
          <p className="text-sm text-gray-700 line-clamp-2">
            {meta.description}
          </p>
        )}
        <p className="mt-2 text-xs text-blue-500 truncate">{meta.url}</p>
      </a>
    </div>
  );
}