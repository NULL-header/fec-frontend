interface BaseResponse {
  status: "SUCCESS" | "FAILED";
  body: Record<string, unknown>;
}

interface AuthPostResponse extends BaseResponse {
  body: {
    token: {
      master: string;
      ontime: string;
    };
  };
}
