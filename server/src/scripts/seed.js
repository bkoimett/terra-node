import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Project from '../models/Project.js';
import Transaction from '../models/Transaction.js';
import { seedProjects } from '../data/seedProjects.js';

dotenv.config();

async function seed() {
  await connectDB();
  await Transaction.deleteMany({});
  await Project.deleteMany({});
  const projects = await Project.insertMany(seedProjects);
  console.log(`Seeded ${projects.length} restoration projects.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
