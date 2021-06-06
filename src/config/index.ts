import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash the whole process
  throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT, 10),

  // your db string stored in env
  databaseURL: process.env.MONGODB_URI,

  // used by winston logger if we gna use any logger
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  // API configs
  api: {
    prefix: '/api',
  },
};
