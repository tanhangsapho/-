import dotenv from 'dotenv';
import e from 'express';
import path from 'path';

function createConfig(configPath: string) {
  dotenv.config({ path: configPath });

  // Validate essential configuration
  const requiredConfig = [
    'NODE_ENV',
    'PORT',
    'DB_CONNECTION_URI',
    'LOG_LEVEL',
    'ENABLE_INTROSPECTION',
  ];
  const missingConfig = requiredConfig.filter((key) => !process.env[key]);

  if (missingConfig.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingConfig.join(', ')}`
    );
  }

  // Return configuration object
  return {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
    mongoUrl: process.env.DB_CONNECTION_URI,
    enableIntrospection: process.env.ENABLE_INTROSPECTION,
  };
}

const getConfig = (currentEnv: string = 'development') => {
  const configPath =
    currentEnv === 'development'
      ? path.join(__dirname, `../../configs/.env`)
      : path.join(__dirname, `../../configs/.env.${currentEnv}`);
  return createConfig(configPath);
};

export { getConfig };
