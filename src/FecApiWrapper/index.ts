import { TokenGuard } from "./TokenGuard";
import { CONSTVALUES } from "../config";
// eslint-disable-next-line no-unused-vars
import { AuthPostResponse, BadResponse } from "./APITypes";

/* eslint-disable no-var */

export class FecApiWrapper {
  private readonly tokenGuard = new TokenGuard();
  private readonly apiUrl = CONSTVALUES.baseUrl + CONSTVALUES.apiv1;

  async fetch(
    path: string,
    value: Record<string, unknown>,
    option?: RequestInit
  ) {
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
      | AuthPostResponse
      | BadResponse;
    return data;
  }

  login(email: string, password: string) {
    return this.fetch(
      CONSTVALUES.auth,
      { value: { email, password } },
      { method: "POST" }
    );
  }

  // reson which ontime argument is first is to become to able to call with a onetime argument only.
  setTokensCache(onetime: string, master?: string) {
    this.tokenGuard.setOntime(onetime);
    if (master != null) this.tokenGuard.setMaster(master);
  }
}
