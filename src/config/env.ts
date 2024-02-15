export default {
  POSTGRESQL: {
    user: process.env.POSTGRESQL_USER || 'postgres',
    password: process.env.POSTGRESQL_PASSWORD || 'postgres',
    port: process.env.POSTGRESQL_PORT || 5432,
    host: process.env.POSTGRESQL_HOST || 'localhost',
    db: 'rinha'
  },
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/rinha'
} as const;