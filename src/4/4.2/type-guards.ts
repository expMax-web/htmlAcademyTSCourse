export const isButton = (element: Element): element is HTMLButtonElement =>
  element.tagName === "BUTTON";
export const isInput = (element: Element): element is HTMLInputElement =>
  element.tagName === "INPUT";
export const isCheckBox = (element: HTMLInputElement): boolean =>
  element.type === "checkbox";
export const isSelect = (element: Element): element is HTMLSelectElement =>
  element.tagName === "SELECT";
export const isTextArea = (element: Element): element is HTMLTextAreaElement =>
  element.tagName === "TEXTAREA";
