import { TokenGuard } from "./TokenGuard";
import { CONSTVALUES } from "../config";
// eslint-disable-next-line no-unused-vars
import { AuthPostResponse, BadResponse, BaseResponse } from "./APITypes";

/* eslint-disable no-var */

export class FecApiWrapper {
  private readonly tokenGuard = new TokenGuard();
  private readonly apiUrl = CONSTVALUES.baseUrl + CONSTVALUES.apiv1;

  async fetch(
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
    const data = { ...(await res.json()), httpStatus } as
      | BaseResponse
      | BadResponse;
    console.log("after");
    return data;
  }

  async login(argObj: { email: string; password: string }) {
    const res = await this.fetch(
      CONSTVALUES.auth,
      { value: argObj },
      { method: "POST" }
    ).catch((e) => undefined);
    if (res != null && !this.badGurad(res)) {
      this.setTokensCache((res as AuthPostResponse).body.token);
    }
    return res;
  }

  async createUser(argObj: { email: string; password: string; name: string }) {
    const res = await this.fetch(
      CONSTVALUES.users,
      { value: argObj },
      { method: "POST" }
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
