import "server-only";
import { existsSync } from "fs";
import { join } from "path";

const PUBLIC_DIR = join(process.cwd(), "public");

export function imgExists(src: string): boolean {
  const rel = src.replace(/^\//, "");
  return existsSync(join(PUBLIC_DIR, rel));
}
