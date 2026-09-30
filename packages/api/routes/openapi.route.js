import { Router } from 'express';

export const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Yashvi Bagga Productions API',
    version: '1.7.0',
    description: 'Express host API for application intake, JWT admin auth, and user directory.',
  },
  servers: [{ url: '/' }],
  paths: {
    '/health': {
      get: { summary: 'Liveness', responses: { 200: { description: 'Healthy' } } },
    },
    '/ready': {
      get: { summary: 'Readiness', responses: { 200: { description: 'Store reachable' } } },
    },
    '/api/v1/applications': {
      post: { summary: 'Submit an application', responses: { 202: { description: 'Accepted' }, 400: { description: 'Validation' } } },
      get: { summary: 'List applications (admin)', security: [{ bearerAuth: [] }], responses: { 200: { description: 'Page' }, 401: { description: 'Unauthorized' } } },
    },
    '/api/v1/applications/{applicationId}': {
      get: { summary: 'Get one application', responses: { 200: { description: 'Found' }, 404: { description: 'Missing' } } },
      patch: { summary: 'Update application status (admin)', security: [{ bearerAuth: [] }], responses: { 200: { description: 'Updated' } } },
    },
    '/api/v1/auth/login': {
      post: { summary: 'Issue a JWT', responses: { 200: { description: 'Session' }, 401: { description: 'Rejected' } } },
    },
    '/api/v1/users': {
      get: { summary: 'List users (admin)', security: [{ bearerAuth: [] }], responses: { 200: { description: 'Directory' } } },
      post: { summary: 'Create a user (admin)', security: [{ bearerAuth: [] }], responses: { 201: { description: 'Created' } } },
    },
    '/api/v1/users/me': {
      get: { summary: 'Current user', security: [{ bearerAuth: [] }], responses: { 200: { description: 'Profile' } } },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
  },
};

export function createOpenApiRouter() {
  const router = Router();
  router.get('/', (_req, res) => {
    res.json(openApiDocument);
  });
  return router;
}
