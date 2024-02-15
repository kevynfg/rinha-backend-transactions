import { Kysely, sql } from "kysely"

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('clientes')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('nome', 'text', (col) => col.notNull())
    .addColumn('limite', 'integer', (col) => col.notNull())
    .execute()

  await db.schema
    .createTable('transacoes')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('cliente_id', 'integer', (col) =>
      col.references('clientes.id').onDelete('cascade').notNull()
    )
    .addColumn('valor', 'integer', (col) => col.notNull())
    .addColumn('tipo', 'char', (col) => col.notNull())
    .addColumn('descricao', 'text', (col) => col.notNull())
    .addColumn('data', 'timestamp', (col) => col.notNull().defaultTo(sql`now()`))
    .addForeignKeyConstraint('clientes_id_foreign', ["cliente_id"], "clientes", ['id'])
    .execute()

    await db.schema
    .createTable('saldos')
    .addColumn('id', 'integer', (col) => col.primaryKey())
    .addColumn('cliente_id', 'integer', (col) =>
      col.references('clientes.id').onDelete('cascade').notNull()
    )
    .addColumn('valor', 'integer', (col) => col.notNull())
    .addForeignKeyConstraint('clientes_id_foreign', ["cliente_id"], "clientes", ['id'])
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('clientes').execute()
  await db.schema.dropTable('transacoes').execute()
  await db.schema.dropTable('saldos').execute()
}