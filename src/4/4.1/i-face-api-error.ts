export interface ApiError<TData> {
  status: "error";
  error: string;
  fieldsWithError: Partial<Record<keyof TData, string>>;
}
