import { ProductSelect as ProductSelectInterface } from "../i-face-product";

export class ProductSelect implements ProductSelectInterface {
  constructor(
    public includeDescription = false,
    public maxDiscount = 0,
    public name = "",
    public label = "",
    public helpId = "",
    public disabled = false
  ) {}
}
