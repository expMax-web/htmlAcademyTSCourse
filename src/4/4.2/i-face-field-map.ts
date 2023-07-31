import { ListenerFactory } from "./i-face-listener-factory";

export interface FieldMap {
  [formField: string]: ListenerFactory;
}
