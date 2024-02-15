export default {
  POSTGRESQL: {
    user: process.env.POSTGRESQL_USER || 'postgres',
    password: process.env.POSTGRESQL_PASSWORD || 'postgres',
    port: process.env.POSTGRESQL_PORT || 5432,
    host: process.env.POSTGRESQL_HOST || 'localhost',
    db: 'rinha'
  },
  PORT: process.env.PORT || 3002,
  NODE_ENV: process.env.NODE_ENV || 'development'
} as const;