// F means fetch

type Status = "SUCCESS" | "FAILED";

interface BaseResponce {
  status: Status;
  body: unknown;
  httpStatus: number;
}

export interface BadResponse extends BaseResponce {
  body: null;
}

interface Token {
  master: string;
  onetime: string;
}

interface AuthPostFBody {
  token: Token;
}

export interface AuthPostResponse extends BaseResponce {
  body: AuthPostFBody;
}
