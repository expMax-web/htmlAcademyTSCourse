import { Binder } from "./i-face-binder";
import { createReducer } from "./reducer-creator";
import { seed } from "./reducer-seed";

export const bindForm: Binder = (form, container) => {
  const subscriptions = Object.entries(form).reduce(
    createReducer(container),
    seed()
  );
  return () => {
    subscriptions.forEach((subscription) => subscription());
  };
};
