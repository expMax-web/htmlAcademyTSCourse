import { Amount, makeAmount } from "../../i-face-service-log";
import { ServiceLogVisitor } from "../../i-face-visitor";
import { ServiceCenterTotals, Totals } from "./i-face-service-center-totals";

const collect = (state: Totals | undefined, total: Amount): Totals => {
  if (typeof state === "undefined") {
    return {
      totalIncome: total,
      vehicleCount: 1
    };
  }
  return {
    totalIncome: makeAmount(state.totalIncome + total),
    vehicleCount: state.vehicleCount + 1
  };
};

export const createServiceCenterTotals = (): ServiceLogVisitor<
  ServiceCenterTotals
> => ({
  getInitialState: () => ({}),
  report: (state) => state,
  visitLogRecord: (state, item) => {
    const { workshop, total } = item;
    return { ...state, [workshop]: collect(state[workshop], total) };
  }
});
