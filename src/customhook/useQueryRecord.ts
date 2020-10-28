import { useQuery } from "src/util/customhook";

const queryKeys = ["token", "email"];

export const useQueryRecord = () => {
  const queryMap = useQuery();
  return queryKeys.reduce((a, e) => {
    a[e] = queryMap.get(e);
    return a;
  }, {} as Record<string, string | null>);
};
