import cookies from "js-cookie";

const coreKey = "TokenGuard";

// keyName should be Pascal case
const genKey = (keyName: string) => coreKey + keyName;

const masterTokenKey = genKey("Master");
const onetimeTokenKey = genKey("Onetime");

export class TokenGuard {
  private cache!: Record<string, string>;
  private isChanged = false;

  constructor() {
    this.update();
  }

  private update() {
    this.cache = cookies.get();
  }

  private setLatest() {
    if (this.isChanged) this.update();
    this.isChanged = false;
  }

  private setOld() {
    this.isChanged = true;
  }

  getMaster() {
    this.setLatest();
    return this.cache[masterTokenKey];
  }

  setMaster(value: string) {
    this.setOld();
    return cookies.set(masterTokenKey, value);
  }

  getOnetime() {
    this.setLatest();
    return this.cache[onetimeTokenKey];
  }

  setOntime(value: string) {
    this.setOld();
    return cookies.set(onetimeTokenKey, value);
  }

  deleteTokens() {
    cookies.remove(masterTokenKey);
    cookies.remove(onetimeTokenKey);
    this.setOld();
  }
}
