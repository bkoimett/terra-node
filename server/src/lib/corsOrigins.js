/** Comma-separated CLIENT_URL values, e.g. https://app.com,http://localhost:5173 */
export function getCorsOrigins() {
  const raw = process.env.CLIENT_URL || 'http://localhost:5173';
  return raw.split(',').map((o) => o.trim()).filter(Boolean);
}

export function corsOriginCallback(origin, callback) {
  const allowed = getCorsOrigins();
  if (!origin || allowed.includes(origin)) {
    callback(null, true);
    return;
  }
  callback(new Error(`CORS blocked origin: ${origin}`));
}
