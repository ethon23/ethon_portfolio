/**
 * Production entrypoint compatible with Vercel's Express runtime and local Node.
 * The Express app itself lives in server.runtime.js.
 */
import express from 'express';
import app, { initializeDb } from './server.runtime.js';

// Keep a single initialization promise so both local Node and Vercel wait for the
// CMS state to be ready before serving requests.
await initializeDb();

const PORT = Number(process.env.PORT) || 3000;

if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
    if (!process.env.APP_SECRET) {
      console.warn('WARNING: APP_SECRET is not set. Set it in production.');
    }
  });
}

export default app;
