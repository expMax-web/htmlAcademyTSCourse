import { Button } from "./i-face-button";
import { CustomerSelect } from "./i-face-customer";
import { ProductSelect } from "./i-face-product";

export interface UiCollection {
  button: () => Button;
  customer: () => CustomerSelect;
  product: () => ProductSelect;
}
