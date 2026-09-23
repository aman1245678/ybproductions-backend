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
 */
export function listDirectory(actor) {
  if (actor.role !== 'Admin') {
    throw new ForbiddenError();
  }
  return listUsers();
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
