import { DbWrapper } from "./util/IndexedDbWrapper";
import { createUsefulDb } from "./util/UsefulDb";

const dbWrapped = new DbWrapper().addTable(
  { configTheme: "++, themeName" },
  {} as { themeName: "light" | "dark" | "loading" }
);

export const { DbProvider, useDb } = createUsefulDb(dbWrapped);
