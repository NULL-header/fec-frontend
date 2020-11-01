type Status = "SUCCESS" | "FAILED" | "OLD_TOKEN" | "ERROR";
type BadStatus = "FAILED" | "OLD_TOKEN" | "ERROR";

interface BaseBody {
  message: string;
}

export interface BaseResponse {
  status: Status;
  body: BaseBody;
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
  errors: APIError[];
}

export interface GoodResponse extends BaseResponse {
  status: "SUCCESS";
}

interface Tokens {
  master: string;
  onetime: string;
}

interface AuthPostFBody extends BaseBody {
  token: Tokens;
}

export interface AuthPostResponse extends GoodResponse {
  body: AuthPostFBody;
}

export type UsersPostResponse = GoodResponse;

export type ActivatePutResponse = GoodResponse;

export type AuthDeleteResponse = GoodResponse;

interface AuthGetBody extends BaseBody {
  name: string;
  nickname: string;
  explanation: string;
  icon: string;
  // eslint-disable-next-line camelcase
  is_admin: boolean;
  // eslint-disable-next-line camelcase
  is_mypage: boolean;
}

export interface AuthGetResponse extends GoodResponse {
  body: AuthGetBody;
}
