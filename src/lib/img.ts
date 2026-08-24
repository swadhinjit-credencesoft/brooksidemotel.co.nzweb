import "server-only";
import { existsSync, readdirSync } from "fs";
import { join } from "path";

const PUBLIC_DIR = join(process.cwd(), "public");

export function imgExists(src: string): boolean {
  const rel = src.replace(/^\//, "");
  return existsSync(join(PUBLIC_DIR, rel));
}

const GALLERY_EXT = /\.(jpe?g|png|webp|avif)$/i;

export function listRoomGallery(roomId: string): string[] {
  const dir = join(PUBLIC_DIR, "images", "rooms", roomId);
  if (!existsSync(dir)) return [];
  try {
    return readdirSync(dir)
      .filter((f) => GALLERY_EXT.test(f))
      .sort()
      .map((f) => `/images/rooms/${roomId}/${f}`);
  } catch {
    return [];
  }
}
