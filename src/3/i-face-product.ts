import { UiControl } from "./i-face-control";

export interface ProductSelect extends UiControl {
  includeDescription: boolean;
  maxDiscount: number;
}
