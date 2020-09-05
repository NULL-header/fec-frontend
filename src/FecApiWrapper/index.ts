import { TokenGuard } from "./TokenGuard";
import { CONSTVALUES } from "../config";
import {
  // eslint-disable-next-line no-unused-vars
  AuthPostResponse,
  // eslint-disable-next-line no-unused-vars
  BadResponse,
  // eslint-disable-next-line no-unused-vars
  BaseResponse,
  // eslint-disable-next-line no-unused-vars
  UsersPostResponse,
} from "./APITypes";

/* eslint-disable no-var */

export class FecApiWrapper {
  private readonly tokenGuard = new TokenGuard();
  private readonly apiUrl = CONSTVALUES.baseUrl + CONSTVALUES.apiv1;

  async fetch<T = BaseResponse>(
    path: string,
    value: Record<string, unknown>,
    option?: RequestInit
  ) {
    console.log("before");
    const res = await fetch(this.apiUrl + path, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
      ...option,
    });
    const httpStatus = res.status;
    const data = { ...(await res.json()), httpStatus } as T | BadResponse;
    console.log("after");
    return data;
  }

  async login(argObj: { email: string; password: string }) {
    const res = await this.fetch<AuthPostResponse>(
      CONSTVALUES.auth,
      { value: argObj },
      { method: "POST" }
    ).catch((e) => undefined);
    if (res != null && !this.badGurad(res)) {
      this.setTokensCache(res.body.token);
    }
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
    const onetime = this.tokenGuard.getOnetime();
    const res = await this.fetch(
      CONSTVALUES.users + `/${name}`,
      { token: onetime },
      { method: "DELETE" }
    );
    return res;
  }

  badGurad(arg: BaseResponse | BadResponse): arg is BadResponse {
    return arg.status !== "SUCCESS";
  }

  setTokensCache({ onetime, master }: { onetime: string; master?: string }) {
    this.tokenGuard.setOntime(onetime);
    if (master != null) this.tokenGuard.setMaster(master);
  }
}
