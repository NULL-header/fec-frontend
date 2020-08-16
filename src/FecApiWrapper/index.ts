import axios from "axios";

import { TokenGuard } from "./TokenGuard";
import { CONSTVALUES } from "../config";
// eslint-disable-next-line no-unused-vars
import { AuthPostResponse } from "./APITypes";

/* eslint-disable no-var */

export class FecApiWrapper {
  private readonly tokenGuard = new TokenGuard();

  getApiUrl() {
    return CONSTVALUES.baseUrl + CONSTVALUES.apiv1;
  }

  postAuth(email: string, password: string): Promise<AuthPostResponse> {
    const url = this.getApiUrl() + CONSTVALUES.auth;
    return axios.post(
      url,
      { value: { email, password } },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  async login(email: string, password: string): Promise<AuthPostResponse> {
    const res = await this.postAuth(email, password);
    const token = res.data.body.token;
    if (token != null) {
      const { master, onetime } = token;
      this.setTokensCache(onetime, master);
    }
    return res;
  }

  // reson which ontime argument is first is to become to able to call with a onetime argument only.
  setTokensCache(onetime: string, master?: string) {
    this.tokenGuard.setOntime(onetime);
    if (master != null) this.tokenGuard.setMaster(master);
  }
}
