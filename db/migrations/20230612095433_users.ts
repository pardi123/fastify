import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
    // Migration code
    await db.schema
      .createTable('todos')
      .addColumn('id', 'uuid', (col) =>
        col.primaryKey().defaultTo(sql`gen_random_uuid()`)
      )
      .addColumn('name', 'varchar')
      .addColumn('phone', 'varchar',(col) => col.unique()).execute();
    await db.schema.createIndex('idx_todos_id_phone').on('todos').columns(['id','phone']).execute();
  }
  
  export async function down(db: Kysely<any>): Promise<void> {
    // Migration code
    await db.schema.dropTable('todos').execute();
  }