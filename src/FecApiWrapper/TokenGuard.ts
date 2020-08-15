import cookies from "js-cookie";

export class TokenGuard {
  private readonly master = "TokenGuardMaster";
  private readonly onetime = "TokenGuardOnetime";

  getMaster() {
    return cookies.get()[this.master];
  }

  setMaster(value: string) {
    return cookies.set(this.master, value);
  }

  getOnetime() {
    return cookies.get()[this.onetime];
  }

  setOntime(value: string) {
    return cookies.set(this.onetime, value);
  }
}
