export const CONSTVALUES = {
  baseUrl: process.env.REACT_APP_API_BASE,
  routeUrl: process.env.BRANCH_NAME,
  apiv1: "/api/v1/",
  auth: "auth",
  users: "users",
  activate: "account_activations",
  themeNameCacheKey: "themeName",
  defaultThemeName: "light",
} as const;
