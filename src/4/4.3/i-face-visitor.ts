import { ServiceLogRecord } from "./i-face-service-log";

export interface ServiceLogVisitor<T, R = T> {
  visitLogRecord(state: T, record: ServiceLogRecord): T;
  getInitialState(): T;
  report(state: T): R;
}
