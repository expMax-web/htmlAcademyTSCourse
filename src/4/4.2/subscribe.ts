import { Unsubscribe } from "./i-face-binder";
import { ListenerFactory } from "./i-face-listener-factory";

interface SubscribeOverloads {
  (
    target: HTMLButtonElement,
    name: "click",
    listener: ReturnType<ListenerFactory["makeButtonClick"]>
  ): Unsubscribe;
  (
    target: HTMLInputElement,
    name: "click",
    listener: ReturnType<ListenerFactory["makeInputClick"]>
  ): Unsubscribe;
  (
    target: HTMLInputElement,
    name: "input",
    listener: ReturnType<ListenerFactory["makeInputInput"]>
  ): Unsubscribe;
  (
    target: HTMLSelectElement,
    name: "input",
    listener: ReturnType<ListenerFactory["makeSelectInput"]>
  ): Unsubscribe;
  (
    target: HTMLTextAreaElement,
    name: "input",
    listener: ReturnType<ListenerFactory["makeTextAreaInput"]>
  ): Unsubscribe;
}

export const subscribe: SubscribeOverloads = (target, name, handler) => {
  target.addEventListener(name, handler as never);
  return () => target.removeEventListener(name, handler as never);
};
