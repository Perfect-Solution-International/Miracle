import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { TravelInquiry } from "@/components/admin-travel/types";

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "travel-inquiries.json");

async function ensureInquiriesFile(): Promise<TravelInquiry[]> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(INQUIRIES_FILE, "utf-8");
    const parsed: TravelInquiry[] = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // File doesn't exist yet, initialize with empty array
  }
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify([], null, 2), "utf-8");
  return [];
}

async function saveInquiriesToFile(inquiries: TravelInquiry[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf-8");
}

/**
 * GET /api/v1/travel/inquiries
 */
export async function GET(): Promise<NextResponse> {
  try {
    const inquiries = await ensureInquiriesFile();
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    console.error("Error reading travel inquiries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read travel inquiries." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/v1/travel/inquiries
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const current = await ensureInquiriesFile();

    if (Array.isArray(body)) {
      await saveInquiriesToFile(body);
      return NextResponse.json({ success: true, data: body });
    }

    const newInquiry: TravelInquiry = body;
    const exists = current.some((item) => item.id === newInquiry.id);
    const updated = exists
      ? current.map((item) => (item.id === newInquiry.id ? newInquiry : item))
      : [newInquiry, ...current];

    await saveInquiriesToFile(updated);
    return NextResponse.json({ success: true, data: newInquiry }, { status: 201 });
  } catch (error) {
    console.error("Error saving travel inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save travel inquiry." },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/v1/travel/inquiries
 */
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const body: TravelInquiry = await request.json();
    const current = await ensureInquiriesFile();

    const updated = current.map((item) => (item.id === body.id ? body : item));
    await saveInquiriesToFile(updated);
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("Error updating travel inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update travel inquiry." },
      { status: 500 }
    );
  }
}
