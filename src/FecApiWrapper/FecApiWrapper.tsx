import { TokenGuard } from "./TokenGuard";
import { CONSTVALUES } from "src/config";

const apiUrl = CONSTVALUES.baseUrl + CONSTVALUES.apiv1;
const tokenGuard = new TokenGuard();

export const isBadResponse = (
  arg: GoodResponse | BadResponse
): arg is BadResponse => {
  return arg.status !== "SUCCESS";
};

export const isLogin = () => {
  console.log(tokenGuard.getMaster());
  return tokenGuard.getMaster() != null;
};

export const isGoodResponse = (
  arg: GoodResponse | BadResponse | undefined
): arg is GoodResponse => arg != null && !isBadResponse(arg);

export const isOldTokenResponse = (arg: ApiResponse) =>
  arg != null &&
  isBadResponse(arg) &&
  arg.errors.findIndex((e) =>
    e.messages.includes("onetime token is too old")
  ) != -1;

const setTokensCache = ({ onetime, master }: Tokens) => {
  tokenGuard.setOntime(onetime);
  if (master == null) return;
  tokenGuard.setMaster(master);
};

export class FecApiWrapper {
  private readonly abortCtl = new AbortController();

  async fetch<T extends GoodResponse>(
    path: string,
    value: Record<string, unknown>,
    option?: RequestInit
  ) {
    console.log("before");
    const res = await fetch(apiUrl + path, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
      signal: this.abortCtl.signal,
      ...option,
    });
    const httpStatus = res.status;
    const data = { ...(await res.json()), httpStatus } as T | BadResponse;
    console.log("after");
    return data;
  }

  stopComunicateAll() {
    this.abortCtl.abort();
  }

  async login(argObj: { email: string; password: string }) {
    const res = await this.fetch<AuthPostResponse>(
      CONSTVALUES.auth,
      { value: argObj },
      { method: "POST" }
    ).catch((e) => undefined);
    if (res != null && !isBadResponse(res)) {
      setTokensCache(res.body.token);
    }
    return res;
  }

  async logout() {
    const values = { token: tokenGuard.getOnetime() };
    const res = await this.fetch<AuthDeleteResponse>(CONSTVALUES.auth, values, {
      method: "DELETE",
    }).catch((e) => undefined);
    if (res != null) tokenGuard.deleteTokens();
    return res;
  }

  async createUser(argObj: { email: string; password: string; name: string }) {
    const res = await this.fetch<UsersPostResponse>(
      CONSTVALUES.users,
      { value: argObj },
      { method: "POST" }
    ).catch((e) => undefined);
    return res;
  }

  async deleteUser(name: string) {
    const onetime = tokenGuard.getOnetime();
    const res = await this.fetch(
      CONSTVALUES.users + `/${name}`,
      { token: onetime },
      { method: "DELETE" }
    );
    return res;
  }

  async activateUser(argObj: { token: string; email: string }) {
    const res = await this.fetch<ActivatePutResponse>(
      CONSTVALUES.activate,
      { value: argObj },
      { method: "PUT" }
    ).catch((e) => undefined);
    return res;
  }
}
