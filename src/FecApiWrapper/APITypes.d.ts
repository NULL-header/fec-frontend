type Status = "SUCCESS" | "FAILED" | "OLD_TOKEN" | "ERROR";
type BadStatus = "FAILED" | "OLD_TOKEN" | "ERROR";
type ApiResponse = GoodResponse | BadResponse | undefined;

interface BaseBody {
  message: string;
}

interface BaseResponse {
  status: Status;
  body: BaseBody;
  httpStatus: number;
}

interface APIError {
  key: string;
  messages: string[];
  code: null;
}

interface BadResponse extends BaseResponse {
  status: BadStatus;
  body: null;
  errors: APIError[];
}

interface GoodResponse extends BaseResponse {
  status: "SUCCESS";
}

interface Tokens {
  master: string;
  onetime: string;
}

interface AuthPostFBody extends BaseBody {
  token: Tokens;
}

interface AuthPostResponse extends GoodResponse {
  body: AuthPostFBody;
}

type UsersPostResponse = GoodResponse;

type ActivatePutResponse = GoodResponse;

type AuthDeleteResponse = GoodResponse;
