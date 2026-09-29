import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_PACKAGES } from "@/lib/storage/default-travel-packages";
import type { TravelPackage } from "@/components/admin-travel/types";

const DATA_DIR = path.join(process.cwd(), "data");
const PACKAGES_FILE = path.join(DATA_DIR, "travel-packages.json");

async function ensureDataFile(): Promise<TravelPackage[]> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(PACKAGES_FILE, "utf-8");
    const parsed: TravelPackage[] = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Sync any updated default images while preserving custom packages
      const updated = parsed.map((pkg) => {
        const defMatch = DEFAULT_PACKAGES.find((d) => d.id === pkg.id);
        if (defMatch) {
          // If pkg matches default id, sync updated properties if not custom edited
          return {
            ...pkg,
            coverImage: pkg.coverImage?.includes("unsplash.com/photo-1588598198321-9735fd52455b") || pkg.coverImage?.includes("unsplash.com/photo-1552465011-b4e21bf6e79a") || pkg.coverImage?.includes("unsplash.com/photo-1586861635167-e5223aadc9fe")
              ? defMatch.coverImage
              : pkg.coverImage || defMatch.coverImage,
            name: defMatch.name,
            images: pkg.images && pkg.images.length > 0 ? pkg.images : defMatch.images,
          };
        }
        return pkg;
      });
      await fs.writeFile(PACKAGES_FILE, JSON.stringify(updated, null, 2), "utf-8");
      return updated;
    }
  } catch {
    // File doesn't exist yet or is invalid, initialize with DEFAULT_PACKAGES
  }
  await fs.writeFile(PACKAGES_FILE, JSON.stringify(DEFAULT_PACKAGES, null, 2), "utf-8");
  return DEFAULT_PACKAGES;
}

async function savePackagesToFile(packages: TravelPackage[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(PACKAGES_FILE, JSON.stringify(packages, null, 2), "utf-8");
}

/**
 * GET /api/v1/travel/packages
 * Returns all stored travel packages.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const packages = await ensureDataFile();
    return NextResponse.json({ success: true, data: packages });
  } catch (error) {
    console.error("Error loading travel packages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read travel packages." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/v1/travel/packages
 * Creates a new travel package or syncs an array of packages.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const currentPackages = await ensureDataFile();

    // Check if body is full array sync or single package
    if (Array.isArray(body)) {
      await savePackagesToFile(body);
      return NextResponse.json({ success: true, data: body }, { status: 200 });
    }

    const newPkg: TravelPackage = body;
    if (!newPkg.name || !newPkg.destination) {
      return NextResponse.json(
        { success: false, error: "Package name and destination are required." },
        { status: 400 }
      );
    }

    const existingIndex = currentPackages.findIndex((p) => p.id === newPkg.id);
    let updated: TravelPackage[];

    if (existingIndex >= 0) {
      updated = currentPackages.map((p, i) => (i === existingIndex ? newPkg : p));
    } else {
      updated = [newPkg, ...currentPackages];
    }

    await savePackagesToFile(updated);
    return NextResponse.json({ success: true, data: newPkg }, { status: 201 });
  } catch (error) {
    console.error("Error saving travel package:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save travel package." },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/v1/travel/packages
 * Updates an existing travel package.
 */
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const currentPackages = await ensureDataFile();

    const updatedPkg: TravelPackage = body;
    if (!updatedPkg.id) {
      return NextResponse.json(
        { success: false, error: "Package ID is required for update." },
        { status: 400 }
      );
    }

    const exists = currentPackages.some((p) => p.id === updatedPkg.id);
    const updated = exists
      ? currentPackages.map((p) => (p.id === updatedPkg.id ? updatedPkg : p))
      : [updatedPkg, ...currentPackages];

    await savePackagesToFile(updated);
    return NextResponse.json({ success: true, data: updatedPkg });
  } catch (error) {
    console.error("Error updating travel package:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update travel package." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/v1/travel/packages?id=pkg-id
 * Deletes a package by ID.
 */
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Package ID is required." },
        { status: 400 }
      );
    }

    const currentPackages = await ensureDataFile();
    const filtered = currentPackages.filter((p) => p.id !== id);

    await savePackagesToFile(filtered);
    return NextResponse.json({ success: true, message: "Package deleted successfully." });
  } catch (error) {
    console.error("Error deleting travel package:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete travel package." },
      { status: 500 }
    );
  }
}
