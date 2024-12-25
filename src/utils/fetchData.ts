import fs from "fs";
import path from "path";

interface ClaimItem {
  claim: string;
  rebuttal: string;
  sources: string[];
}

export interface DataStructure {
  claims_and_rebuttals: ClaimItem[];
}

export function getAllData(): DataStructure {
  const filePath = path.join(process.cwd(), "src", "assets", "data.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
} 