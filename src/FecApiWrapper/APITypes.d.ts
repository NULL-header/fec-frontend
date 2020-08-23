// F means fetch

declare type Status = "SUCCESS" | "FAILED" | "OLD_TOKEN" | "ERROR";
declare type BadStatus = "FAILED" | "OLD_TOKEN" | "ERROR";

declare interface BaseResponse {
  status: Status;
  body: unknown;
  httpStatus: number;
}

declare interface APIError {
  key: string;
  messages: string[];
  code: null;
}

export declare interface BadResponse extends BaseResponse {
  status: BadStatus;
  body: null;
  message: string;
  errors: APIError[];
}

export declare interface GoodResponse extends BaseResponse {
  status: "SUCCESS";
}

declare interface Token {
  master: string;
  onetime: string;
}

declare interface AuthPostFBody {
  token: Token;
}

export declare interface AuthPostResponse extends GoodResponse {
  body: AuthPostFBody;
}

declare interface UsersPostFBody {
  message: string;
}

export interface UsersPostResponse extends GoodResponse {
  body: UsersPostFBody;
}
