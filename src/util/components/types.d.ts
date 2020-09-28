export interface ValidatedResult {
  value: string;
  isRegular: boolean;
  failedReason?: string;
}

export type Validate = (value: string) => ValidatedResult;
