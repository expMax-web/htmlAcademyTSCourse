import { UiCollection } from "./i-face-collection";
import { Button } from "./i-face-button";
import { CustomerSelect } from "./i-face-customer";
import { ProductSelect } from "./i-face-product";

export class Collection implements UiCollection {
  constructor(
    private buttonCtor: new () => Button,
    private customerCtor: new () => CustomerSelect,
    private productCtor: new () => ProductSelect
  ) {}

  button = () => new this.buttonCtor();
  customer = () => new this.customerCtor();
  product = () => new this.productCtor();
}
