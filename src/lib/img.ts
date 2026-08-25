import "server-only";
import { existsSync, readdirSync } from "fs";
import { join } from "path";

const PUBLIC_DIR = join(process.cwd(), "public");

export function imgExists(src: string): boolean {
  const rel = src.replace(/^\//, "");
  return existsSync(join(PUBLIC_DIR, rel));
}

const GALLERY_EXT = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Returns gallery image paths for a room.
 *
 * Primary lookup: `public/images/rooms/<roomId>/`
 * Fallback: scans sibling dirs and matches by normalised name
 * (spaces → hyphens, lowercased) so uploads named with display
 * names still resolve to the correct slug.
 */
export function listRoomGallery(roomId: string): string[] {
  let dir = join(PUBLIC_DIR, "images", "rooms", roomId);

  if (!existsSync(dir)) {
    const roomsRoot = join(PUBLIC_DIR, "images", "rooms");
    if (existsSync(roomsRoot)) {
      const match = readdirSync(roomsRoot).find((entry) => {
        const normalised = entry
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        return normalised === roomId;
      });
      if (match) dir = join(roomsRoot, match);
    }
  }

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
