import { Collection } from "../collections";
import { Button } from "../html/button";
import { CustomerSelect } from "../html/customer";
import { NewElement } from "../html/new";
import { ProductSelect } from "../html/product";

export const getHtmlFactory = () =>
  new Collection(Button, CustomerSelect, ProductSelect, NewElement);
