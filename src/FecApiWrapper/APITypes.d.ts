// F means fetch

declare type Status = "SUCCESS" | "FAILED" | "OLD_TOKEN" | "ERROR";

interface BaseResponce {
  status: Status;
  body: unknown;
  httpStatus: number;
}

export declare interface BadResponse extends BaseResponce {
  body: null;
}

declare interface Token {
  master: string;
  onetime: string;
}

declare interface AuthPostFBody {
  token: Token;
}

export declare interface AuthPostResponse extends BaseResponce {
  body: AuthPostFBody;
}
