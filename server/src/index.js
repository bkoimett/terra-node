import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import projectRoutes from './routes/projects.js';
import transactionRoutes from './routes/transactions.js';
import calculatorRoutes from './routes/calculator.js';
import statsRoutes from './routes/stats.js';
import Project from './models/Project.js';
import { seedProjects } from './data/seedProjects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'terranode-api' });
});

app.use('/api/projects', projectRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/calculator', calculatorRoutes);
app.use('/api/stats', statsRoutes);

async function autoSeedIfEmpty() {
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany(seedProjects);
    console.log(`Auto-seeded ${seedProjects.length} projects.`);
  }
}

async function start() {
  try {
    await connectDB();
    await autoSeedIfEmpty();
    app.listen(PORT, () => {
      console.log(`TerraNode API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
