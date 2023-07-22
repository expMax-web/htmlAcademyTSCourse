import { UiCollection } from "../i-face-collection";

export type ControlProvider = <T extends keyof UiCollection>(
  type: T
) => ReturnType<UiCollection[T]>;
