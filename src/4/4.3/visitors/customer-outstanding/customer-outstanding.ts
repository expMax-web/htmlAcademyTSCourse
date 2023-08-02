import { Amount, makeAmount } from "../../i-face-service-log";
import { ServiceLogVisitor } from "../../i-face-visitor";
import { CustomerOutstanding } from "./i-face-customer-outstanding";

const collect = (soFar: Amount | undefined, atItem: number) =>
  makeAmount((soFar || 0) + atItem);

export const createCustomerOutstanding = (): ServiceLogVisitor<
  CustomerOutstanding
> => ({
  getInitialState: () => ({}),
  report: (state) => state,
  visitLogRecord: (state, item) => {
    const { customer, total, paid } = item;
    return total <= paid
      ? state
      : {
          ...state,
          [customer]: collect(state[customer], total - paid)
        };
  }
});
