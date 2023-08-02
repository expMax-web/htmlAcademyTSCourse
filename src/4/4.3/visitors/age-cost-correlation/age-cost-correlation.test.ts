import { dispatch } from "../../dispatch";
import { makeDateTime } from "../../i-face-service-log";
import { simpleLog } from "../../test-mock/service-log";
import { createAgeCostCorrelationVisitor } from "./age-cost-correlation";
describe("сбор статистики по стоимости обслуживания автомобилей от возраста", () => {
  it("собирает статистику из единственной записи для прошлогодней машины", () => {
    const refDate = makeDateTime(`${new Date().getFullYear()}`);
    const result = dispatch(
      simpleLog,
      createAgeCostCorrelationVisitor(refDate)
    );
    expect(result).toEqual({ 1: 1 });
  });
});
