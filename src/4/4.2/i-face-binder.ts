import { FieldMap } from "./i-face-field-map";

export interface Unsubscribe {
  (): void;
}

export interface Binder {
  (form: FieldMap, container: HTMLFormElement): Unsubscribe;
}
