export interface ApiSuccess<TData> {
  status: "success";
  rowCreated: Required<TData>;
}
