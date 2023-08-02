import { Amount } from "../../i-face-service-log";

export interface CustomerOutstanding {
  [customer: string]: Amount;
}
