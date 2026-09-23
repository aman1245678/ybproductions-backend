import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const N = 16384;
const R = 8;
const P = 1;
const KEY_LEN = 32;

/**
 * @param {string} password
 */
export function hashPassword(password) {
  const salt = randomBytes(16).toString('base64url');
  const hash = scryptSync(password, salt, KEY_LEN, { N, r: R, p: P }).toString('base64url');
  return `scrypt$${N}$${R}$${P}$${salt}$${hash}`;
}

/**
 * @param {string} password
 * @param {string} encoded
 */
export function verifyPassword(password, encoded) {
  const parts = String(encoded).split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const n = Number(parts[1]);
  const r = Number(parts[2]);
  const p = Number(parts[3]);
  const salt = parts[4];
  const expected = parts[5];
  const actual = scryptSync(password, salt, KEY_LEN, { N: n, r, p }).toString('base64url');
  const left = Buffer.from(actual);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
