import { NextResponse } from "next/server";
import { handleCors, handlePreflight } from "@/middlewares/cors";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

export async function OPTIONS() {
  return handlePreflight();
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return handleCors(
        NextResponse.json(
          { success: false, error: "No file uploaded" },
          { status: 400 }
        )
      );
    }

    // Validate type (must be image/jpeg, image/png, image/webp, image/gif)
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return handleCors(
        NextResponse.json(
          { success: false, error: "Invalid file type. Only JPEG, PNG, WEBP, and GIF images are allowed." },
          { status: 400 }
        )
      );
    }

    // Read file bytes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save directory (frontend/public/images)
    const uploadDir = process.env.UPLOAD_DIR || join(process.cwd(), "..", "frontend", "public", "images");
    let isSavedLocal = false;
    let filename = "";

    try {
      // Ensure dir exists
      mkdirSync(uploadDir, { recursive: true });
      
      // Generate secure filename
      const fileExtension = file.name.split(".").pop() || "jpg";
      filename = `${randomUUID()}.${fileExtension}`;
      const filePath = join(uploadDir, filename);

      // Write file
      writeFileSync(filePath, buffer);
      isSavedLocal = true;
    } catch (writeError: any) {
      console.warn("Local filesystem write failed, falling back to base64 encoding. Error:", writeError);
    }

    if (isSavedLocal) {
      // Return the image URL path relative to the frontend public root
      return handleCors(
        NextResponse.json({
          success: true,
          data: {
            url: `/images/${filename}`
          }
        })
      );
    } else {
      // Fallback: Base64 data URL
      const base64Data = buffer.toString("base64");
      const dataUrl = `data:${file.type};base64,${base64Data}`;
      return handleCors(
        NextResponse.json({
          success: true,
          data: {
            url: dataUrl
          }
        })
      );
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return handleCors(
      NextResponse.json(
        { success: false, error: error.message || "Failed to upload file" },
        { status: 500 }
      )
    );
  }
}
