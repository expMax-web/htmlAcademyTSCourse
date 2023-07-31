import { TableReservation } from "./i-face-example";
import { ApiResponse } from "./i-face-response";

export interface Api {
  (form: Partial<TableReservation>): Promise<ApiResponse<TableReservation>>;
}
