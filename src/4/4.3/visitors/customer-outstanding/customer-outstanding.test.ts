import { dispatch } from "../../dispatch";
import { createCustomerOutstanding } from "./customer-outstanding";
import { simpleLog, doubleLog } from "../../test-mock/service-log";

describe("собр статистики о задолженности клиентов", () => {
  it("оставляет пустой результат, если задолженности нет", () => {
    const result = dispatch(simpleLog, createCustomerOutstanding());
    expect(Object.keys(result).length).toBe(0);
  });
  it("собирает задолженность, если она есть", () => {
    const result = dispatch(doubleLog, createCustomerOutstanding());
    expect(Object.keys(result).length).toBe(1);
  });
});
