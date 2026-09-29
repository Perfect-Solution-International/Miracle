import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const EXTENSION_MAP: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

/**
 * Ensures the target upload directory exists.
 */
async function getUploadDir(): Promise<string> {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "travel");
  await fs.mkdir(uploadDir, { recursive: true });
  return uploadDir;
}

/**
 * POST /api/v1/travel/upload
 * Handles single and multi-file image uploads from Admin Panel.
 * Saves uploaded images persistently in public/uploads/travel/ and returns public URLs.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const files: File[] = [];

    // Support both 'file' and 'files' fields in formData
    const singleFile = formData.get("file");
    if (singleFile && singleFile instanceof File) {
      files.push(singleFile);
    }

    const multipleFiles = formData.getAll("files");
    for (const f of multipleFiles) {
      if (f instanceof File && !files.includes(f)) {
        files.push(f);
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { success: false, error: "No image file provided in request." },
        { status: 400 }
      );
    }

    const uploadDir = await getUploadDir();
    const uploadedResults: Array<{ url: string; name: string; size: number; type: string }> = [];

    for (const file of files) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            error: `File '${file.name}' exceeds the 10MB maximum limit.`,
          },
          { status: 400 }
        );
      }

      // Validate MIME type
      const mimeType = file.type.toLowerCase();
      if (!ALLOWED_MIME_TYPES.has(mimeType)) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid file format for '${file.name}'. Only JPG, JPEG, PNG, and WebP images are allowed.`,
          },
          { status: 400 }
        );
      }

      const extension = EXTENSION_MAP[mimeType] || ".jpg";
      const randomSuffix = crypto.randomBytes(6).toString("hex");
      const filename = `pkg-img-${Date.now()}-${randomSuffix}${extension}`;
      const filePath = path.join(uploadDir, filename);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/travel/${filename}`;
      uploadedResults.push({
        url: publicUrl,
        name: filename,
        size: file.size,
        type: mimeType,
      });
    }

    if (uploadedResults.length === 1 && uploadedResults[0]) {
      const first = uploadedResults[0];
      return NextResponse.json(
        {
          success: true,
          url: first.url,
          name: first.name,
          size: first.size,
          type: first.type,
          files: uploadedResults,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        files: uploadedResults,
        urls: uploadedResults.map((r) => r.url),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing image upload:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Server error occurred while saving the uploaded image. Please try again.",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/v1/travel/upload?file=filename.jpg
 * Removes a stored image from the persistent uploads directory.
 */
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("file");

    if (!filename) {
      return NextResponse.json(
        { success: false, error: "Filename parameter is required." },
        { status: 400 }
      );
    }

    // Sanitize filename to prevent directory traversal
    const safeFilename = path.basename(filename);
    const uploadDir = await getUploadDir();
    const filePath = path.join(uploadDir, safeFilename);

    try {
      await fs.unlink(filePath);
      return NextResponse.json({ success: true, message: "File removed successfully." });
    } catch {
      // If file doesn't exist, still return success
      return NextResponse.json({ success: true, message: "File not found or already removed." });
    }
  } catch (error) {
    console.error("Error deleting image file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove image file." },
      { status: 500 }
    );
  }
}
