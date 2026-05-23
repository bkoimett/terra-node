import { getReadyApp } from './app.js';

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    const app = await getReadyApp();
    app.listen(PORT, () => {
      console.log(`TerraNode API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
