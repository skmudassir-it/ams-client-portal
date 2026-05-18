import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

/**
 * Hash a password using scrypt with a random salt.
 * Returns the salt and derived key as hex strings separated by a colon.
 */
export function hash(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Compare a plaintext password against a stored hash (format: "salt:derivedKey").
 */
export function compare(password: string, storedHash: string): boolean {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;

  const derivedKey = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");

  try {
    return timingSafeEqual(derivedKey, keyBuffer);
  } catch {
    return false;
  }
}
