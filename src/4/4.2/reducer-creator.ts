import { detectBindElement } from "./detect-bind-element";
import { Unsubscribe } from "./i-face-binder";
import { ListenerFactory } from "./i-face-listener-factory";

export const createReducer = (container: HTMLElement) => (
  unSubscribers: Unsubscribe[],
  [field, factory]: [string, ListenerFactory]
) => [
  ...unSubscribers,
  ...detectBindElement(container.querySelector(`[name=${field}]`), factory)
];
