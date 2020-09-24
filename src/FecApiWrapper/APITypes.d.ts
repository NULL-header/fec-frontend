type Status = "SUCCESS" | "FAILED" | "OLD_TOKEN" | "ERROR";
type BadStatus = "FAILED" | "OLD_TOKEN" | "ERROR";

export interface BaseResponse {
  status: Status;
  body: unknown;
  httpStatus: number;
}

interface APIError {
  key: string;
  messages: string[];
  code: null;
}

export interface BadResponse extends BaseResponse {
  status: BadStatus;
  body: null;
  message: string;
  errors: APIError[];
}

export interface GoodResponse extends BaseResponse {
  status: "SUCCESS";
}

interface Tokens {
  master: string;
  onetime: string;
}

interface AuthPostFBody {
  token: Token;
}

export interface AuthPostResponse extends GoodResponse {
  body: AuthPostFBody;
}

interface UsersPostFBody {
  message: string;
}

export interface UsersPostResponse extends GoodResponse {
  body: UsersPostFBody;
}
