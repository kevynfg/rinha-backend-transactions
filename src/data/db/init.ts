import { promises as fs } from 'fs';
import { ColumnType, FileMigrationProvider, Generated, Kysely, Migrator, PostgresDialect } from "kysely";
import * as path from 'path';
import { Pool } from 'pg';
import { env } from "../../config";
// export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
//   ? ColumnType<S, I | undefined, U>
//   : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

type Customer = {
  id: number;
  nome: string;
  limite: number;
}

type Transaction = {
  id: Generated<number>;
  cliente_id: number;
  valor: number;
  tipo: "d" | "c";
  descricao: string;
  data: Timestamp;
}

type Funds = {
  id: number;
  cliente_id: number;
  valor: number;
}

export interface Database {
  clientes: Customer;
  transacoes: Transaction;
  saldos: Funds;
}

const dialect = new PostgresDialect({
  pool: async () => new Pool({
    database: env.default.POSTGRESQL.db,
    host: env.default.POSTGRESQL.host,
    user: env.default.POSTGRESQL.user,
    port: +env.default.POSTGRESQL.port,
    password: env.default.POSTGRESQL.password,
    max: 256,
  })
})

export const db = new Kysely<Database>({
  dialect
});

export async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, './migrations')
    })
  })
  const { error, results} = await migrator.migrateToLatest();
  console.log('alo')
  results?.forEach((it) => {
    console.log('it', it)
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  };
}