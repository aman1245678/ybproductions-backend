import { ConflictError, ForbiddenError, NotFoundError } from '../types/errors.js';
import { hashPassword } from '../lib/password.js';
import {
  findUserByEmail,
  findUserById,
  insertUser,
  listUsers,
  publicUser,
} from '../repositories/users.repository.js';

/**
 * @param {string} userId
 */
export function getCurrentUser(userId) {
  const user = findUserById(userId);
  if (!user) throw new NotFoundError('User was not found');
  return publicUser(user);
}

/**
 * @param {{ role?: string }} actor
 * @param {{ limit?: number, offset?: number }} [query]
 */
export function listDirectory(actor, query = {}) {
  if (actor.role !== 'Admin') {
    throw new ForbiddenError();
  }
  const rows = listUsers();
  const limit = query.limit ?? 50;
  const offset = query.offset ?? 0;
  return {
    total: rows.length,
    items: rows.slice(offset, offset + limit),
  };
}

/**
 * @param {{ email: string, password: string, role?: string }} input
 * @param {{ role?: string }} actor
 */
export function createUser(input, actor) {
  if (actor.role !== 'Admin') {
    throw new ForbiddenError();
  }
  if (findUserByEmail(input.email)) {
    throw new ConflictError(`User ${input.email} already exists`);
  }
  return insertUser({
    email: input.email,
    passwordHash: hashPassword(input.password),
    role: input.role || 'Staff',
  });
}
