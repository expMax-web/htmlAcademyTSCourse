import { Amount, DateTime, makeAmount } from "../../i-face-service-log";
import { ServiceLogVisitor } from "../../i-face-visitor";
import { AgeCostCorrelation } from "./i-face-age-cost-correlations";

const collect = (age: number, state: AgeCostCorrelation, total: Amount) => ({
  [age]: makeAmount((state[age] || 0) + total)
});

export const createAgeCostCorrelationVisitor = (
  reference: DateTime
): ServiceLogVisitor<AgeCostCorrelation> => {
  const refYear = new Date(reference).getFullYear();
  return {
    getInitialState: () => ({}),
    report: (state) => state,
    visitLogRecord: (state, item) => {
      const { year, total } = item;
      return year > refYear
        ? state
        : { ...state, ...collect(refYear - year, state, total) };
    }
  };
};
