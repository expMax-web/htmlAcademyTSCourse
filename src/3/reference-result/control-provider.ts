import { Collection } from "../collections";
import { getHtmlFactory } from "./factory";
import { ControlProvider } from "./i-face-control-provider";

let collection: Collection | null = null;

const variants = {
  html: getHtmlFactory,
};

export const init = (variant: keyof typeof variants): void => {
  collection = variants[variant]();
};

export const getControl: ControlProvider = (type) => {
  if (collection === null) {
    throw new Error("not initialized");
  }
  return collection[type]() as never;
};
