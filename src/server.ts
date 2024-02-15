import 'dotenv/config';
import { env } from "./config";
import { migrateToLatest } from "./data/db/init";

async function main() {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    await migrateToLatest();
  }
  const { setupApp } = await import('./app')
  const app = setupApp();
  app.listen(env.default.PORT, () => {
    console.log(`Server running on port ${env.default.PORT}`);
  });
}

main();