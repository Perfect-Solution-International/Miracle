import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const PROFILE_FILE_PATH = path.join(process.cwd(), "data", "admin-profile.json");

export interface AdminProfileData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  country: string;
  jobTitle: string;
  avatarUrl?: string;
  role: string;
  accountStatus: string;
  createdAt: string;
  lastUpdated: string;
  lastLogin: string;
}

const DEFAULT_ADMIN_PROFILE: AdminProfileData = {
  id: "admin-miracle-01",
  fullName: "Miracle Administrator",
  email: "admin@miracleinternational.com",
  phone: "+94 11 234 5678",
  whatsappNumber: "+94 77 123 4567",
  country: "Sri Lanka",
  jobTitle: "Operations Administrator",
  avatarUrl: "",
  role: "Administrator",
  accountStatus: "Active",
  createdAt: "Jan 15, 2024",
  lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  lastLogin: "Today, " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
};

async function readProfileData(): Promise<AdminProfileData> {
  try {
    const raw = await fs.readFile(PROFILE_FILE_PATH, "utf-8");
    if (!raw.trim()) return DEFAULT_ADMIN_PROFILE;
    return JSON.parse(raw) as AdminProfileData;
  } catch {
    // If file doesn't exist, initialize it
    await fs.mkdir(path.dirname(PROFILE_FILE_PATH), { recursive: true });
    await fs.writeFile(PROFILE_FILE_PATH, JSON.stringify(DEFAULT_ADMIN_PROFILE, null, 2), "utf-8");
    return DEFAULT_ADMIN_PROFILE;
  }
}

async function writeProfileData(data: AdminProfileData): Promise<void> {
  await fs.mkdir(path.dirname(PROFILE_FILE_PATH), { recursive: true });
  await fs.writeFile(PROFILE_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

/**
 * GET /api/v1/admin/profile
 * Returns the current authenticated admin profile data.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const profile = await readProfileData();
    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error("Failed to read admin profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve profile data from server." },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/v1/admin/profile
 * Updates the admin profile personal information and avatar.
 */
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const existing = await readProfileData();

    const updatedProfile: AdminProfileData = {
      ...existing,
      fullName: typeof body.fullName === "string" && body.fullName.trim() ? body.fullName.trim() : existing.fullName,
      email: typeof body.email === "string" && body.email.trim() ? body.email.trim() : existing.email,
      phone: typeof body.phone === "string" ? body.phone.trim() : existing.phone,
      whatsappNumber: typeof body.whatsappNumber === "string" ? body.whatsappNumber.trim() : existing.whatsappNumber,
      country: typeof body.country === "string" ? body.country.trim() : existing.country,
      jobTitle: typeof body.jobTitle === "string" ? body.jobTitle.trim() : existing.jobTitle,
      avatarUrl: typeof body.avatarUrl === "string" ? body.avatarUrl : existing.avatarUrl,
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    await writeProfileData(updatedProfile);

    return NextResponse.json({
      success: true,
      message: "Admin profile updated successfully.",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Failed to update admin profile:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update profile data on server." },
      { status: 500 }
    );
  }
}
