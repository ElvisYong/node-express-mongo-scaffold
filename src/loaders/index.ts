import expressLoader from './express';
import database from '../repositories/database';

// The purpose of loaders is to split startup process into testable modules
export default async ({ expressApp }) => {
  // Connect to the database on startup
  if (!database.isDbConnected()) {
    await database.connect();
  }

  await expressLoader({ app: expressApp });
};
