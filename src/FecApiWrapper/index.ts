import axios from "axios";

import { TokenGuard } from "./TokenGuard";
import { CONSTVALUES } from "../config";

export class FecApiWrapper {
  private readonly tokenGuard = new TokenGuard();
  getApiUrl() {
    return CONSTVALUES.baseUrl + CONSTVALUES.apiv1;
  }

  postAuth(email: string, password: string): Promise<AuthPostResponse> {
    const url = this.getApiUrl() + CONSTVALUES.auth;
    return axios.post(url, { value: { email, password } });
  }

  async login(email: string, password: string) {
    const res = await this.postAuth(email, password);
    if (res.status === "SUCCESS")
      this.setTokensCache(res.body.token.ontime, res.body.token.master);
    return res;
  }

  setTokensCache(onetime: string, master?: string) {
    this.tokenGuard.setOntime(onetime);
    if (master != null) this.tokenGuard.setMaster(master);
  }
}
