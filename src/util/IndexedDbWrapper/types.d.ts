type Dexie = import("dexie");

type ArgType<T> = T extends (arg: infer Arg) => any ? Arg : never;
type Schema = ArgType<Dexie.Version["stores"]>;
type AnyRecord = Record<string, any>;
