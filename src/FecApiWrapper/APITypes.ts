type Status = "SUCCESS" | "FAILED";

interface Data {
  status: Status;
  body: unknown;
}
interface BaseResponse {
  data: Data;
}

export interface Token {
  master: string;
  onetime: string;
}

interface AuthPostResponseBody {
  token: Token;
}
interface AuthPostResponseData extends Data {
  body: AuthPostResponseBody;
}

export interface AuthPostResponse {
  data: AuthPostResponseData;
}
