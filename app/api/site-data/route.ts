import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { defaultSiteData, type SiteData } from "@/app/data/siteDataDefaults";

const DATA_FILE_PATH = path.join(process.cwd(), "site-data.json");

async function readSiteDataFromFile(): Promise<SiteData | null> {
  try {
    const file = await fs.readFile(DATA_FILE_PATH, "utf8");
    return JSON.parse(file) as SiteData;
  } catch {
    return null;
  }
}

async function writeSiteDataToFile(data: SiteData) {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf8");
}

export async function GET() {
  try {
    const data = await readSiteDataFromFile();
    return NextResponse.json(data ?? defaultSiteData);
  } catch (error) {
    console.error("Site data GET error:", error);
    return NextResponse.json(defaultSiteData, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SiteData;

    if (!body || !Array.isArray(body.projects)) {
      return NextResponse.json(
        { error: "Geçersiz veri" },
        { status: 400 }
      );
    }

    await writeSiteDataToFile(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Site data POST error:", error);
    return NextResponse.json(
      { error: "Veri kaydedilemedi" },
      { status: 500 }
    );
  }
}

