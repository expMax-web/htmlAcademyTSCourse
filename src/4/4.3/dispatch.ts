import { ServiceLogRecord } from "./i-face-service-log";
import { ServiceLogVisitor } from "./i-face-visitor";

export const dispatch = <T, R>(
  items: ServiceLogRecord[],
  visitor: ServiceLogVisitor<T, R>
) =>
  visitor.report(
    items.reduce(
      (state, item) => visitor.visitLogRecord(state, item),
      visitor.getInitialState()
    )
  );
