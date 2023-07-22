import { UiControl } from "./i-face-control";

export interface Button extends UiControl {
  execute: () => void;
}
