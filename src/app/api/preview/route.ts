import { NextRequest, NextResponse } from "next/server";
import metascraper from "metascraper";
import metascraperTitle from "metascraper-title";
import metascraperDescription from "metascraper-description";
import metascraperUrl from "metascraper-url";

const scraper = metascraper([
  metascraperTitle(),
  metascraperDescription(),
  metascraperUrl(),
]);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  try {
    if (!targetUrl) {
      return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 });
    }

    // Handle Wikipedia URLs specially by removing the text fragment
    const cleanUrl = targetUrl.split('#')[0];
    const decodedUrl = decodeURIComponent(cleanUrl);

    const response = await fetch(decodedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Metascraper/1.0)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();
    const metadata = await scraper({ html, url: decodedUrl });

    return NextResponse.json({
      title: metadata.title || null,
      description: metadata.description || null,
      url: metadata.url || decodedUrl,
    });

  } catch (error) {
    console.error("Preview error:", error);
    return NextResponse.json({ 
      error: "Failed to generate preview",
      url: targetUrl || null
    }, { 
      status: 200
    });
  }
}