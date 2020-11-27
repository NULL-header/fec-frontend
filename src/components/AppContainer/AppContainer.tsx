import React from "react";
import { useAsyncMemo } from "use-async-memo";
import { ContentContainer } from "src/components";
import { createThemeProvider } from "src/theme";
import { useDb } from "src/db";

type Db = ReturnType<typeof useDb>;

const createOnChange = (db: Db) => async (
  arg: "light" | "dark" | "loading"
) => {
  await db.configTheme.put({ themeName: arg }, 0);
};

const useDefaultThemeName = (db: Db) => {
  return useAsyncMemo(
    async () => (await db.configTheme.get(0))?.themeName,
    [db.configTheme.get],
    "loading"
  );
};
export const AppContainer: React.FC<BaseComponentProps> = (props) => {
  const db = useDb();
  const defaultThemeName = useDefaultThemeName(db);
  const onChange = React.useMemo(() => createOnChange(db), [db]);
  (async () => console.log(await db.configTheme.toArray()))();
  let el: JSX.Element;
  if (defaultThemeName == "loading") {
    el = <div>Loading</div>;
  } else {
    const ThemeProvider = createThemeProvider(
      defaultThemeName == null ? "light" : defaultThemeName,
      onChange
    );
    el = (
      <ThemeProvider>
        <ContentContainer />
      </ThemeProvider>
    );
  }
  return el;
};
