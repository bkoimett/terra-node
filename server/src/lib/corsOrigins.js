/** Comma-separated CLIENT_URL values, e.g. https://app.com,http://localhost:5173 */
export function getCorsOrigins() {
  const raw = process.env.CLIENT_URL || 'http://localhost:5173';
  const origins = raw.split(',').map((o) => o.trim()).filter(Boolean);

  if (process.env.VERCEL_URL) {
    origins.push(`https://${process.env.VERCEL_URL}`);
  }

  return [...new Set(origins)];
}

export function corsOriginCallback(origin, callback) {
  const allowed = getCorsOrigins();
  if (!origin || allowed.includes(origin)) {
    callback(null, true);
    return;
  }
  callback(new Error(`CORS blocked origin: ${origin}`));
}
