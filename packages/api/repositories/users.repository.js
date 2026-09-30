import { randomUUID } from 'node:crypto';
import { withStore } from '../db/store.js';

/**
 * @param {{ email: string, passwordHash: string, role?: string }} input
 */
export function insertUser(input) {
  const now = new Date().toISOString();
  const user = {
    id: `usr_${randomUUID()}`,
    email: input.email.toLowerCase(),
    passwordHash: input.passwordHash,
    role: input.role || 'Admin',
    createdAt: now,
    updatedAt: now,
  };
  return withStore((snap) => {
    snap.users[user.id] = user;
    return publicUser(user);
  });
}

/**
 * @param {string} email
 */
export function findUserByEmail(email) {
  const needle = email.toLowerCase();
  return withStore((snap) => {
    const user = Object.values(snap.users).find((row) => row.email === needle);
    return user ? { ...user } : null;
  });
}

/**
 * @param {string} id
 */
export function findUserById(id) {
  return withStore((snap) => {
    const user = snap.users[id];
    return user ? { ...user } : null;
  });
}

export function listUsers() {
  return withStore((snap) => Object.values(snap.users).map(publicUser));
}

export function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
