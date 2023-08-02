import { Amount } from "../../i-face-service-log";

export interface Totals {
  vehicleCount: number;
  totalIncome: Amount;
}
export interface ServiceCenterTotals {
  [serviceCenter: string]: Totals;
}
