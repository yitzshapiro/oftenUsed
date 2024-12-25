import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "src", "assets", "data.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(rawData);

  return NextResponse.json(data);
} 