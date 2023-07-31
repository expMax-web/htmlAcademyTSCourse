import { Unsubscribe } from "./i-face-binder";
import { ListenerFactory } from "./i-face-listener-factory";
import { subscribe } from "./subscribe";
import {
  isButton,
  isCheckBox,
  isInput,
  isSelect,
  isTextArea
} from "./type-guards";

const attach = (target: Element, methods: ListenerFactory): Unsubscribe => {
  if (isButton(target)) {
    return subscribe(target, "click", methods.makeButtonClick());
  }
  if (isInput(target)) {
    if (isCheckBox(target)) {
      return subscribe(target, "click", methods.makeInputClick());
    }
    return subscribe(target, "input", methods.makeInputInput());
  }
  if (isSelect(target)) {
    return subscribe(target, "input", methods.makeSelectInput());
  }
  if (isTextArea(target)) {
    return subscribe(target, "input", methods.makeTextAreaInput());
  }
  throw new Error(`unexpected target type ${target.tagName}`);
};

export const detectBindElement = (
  targetElement: Element | null,
  methods: ListenerFactory
): Unsubscribe[] =>
  targetElement === null ? [] : [attach(targetElement, methods)];
