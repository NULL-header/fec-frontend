import Dexie from "dexie";

export class DbWrapper<
  T extends Record<string, string>,
  U extends Record<keyof T, Dexie.Table<any, "current">>
> {
  constructor(
    private readonly tables: T = {} as T,
    private readonly tableTypes: U = {} as U
  ) {}

  addTable<Entity, UserSchema extends Schema>(
    schema: UserSchema,
    _entity: Entity
  ) {
    const next = Object.assign({}, this.tables, schema);
    const oldType = this.tableTypes;
    const nextType = {} as typeof oldType &
      { [Key in keyof typeof schema]: Dexie.Table<Entity, "current"> };
    return new DbWrapper(next, nextType);
  }

  makeDb() {
    const db = new Dexie("indexedDbWrapper");
    db.version(1).stores(this.tables);
    return db as typeof db & { [Key in keyof U]: U[Key] };
  }

  getTables() {
    return this.tables as Record<keyof U, string>;
  }
}
