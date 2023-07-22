import { Collection } from "./collections";
import { Button, Button as ButtonElement } from "./html/button";
import {
  CustomerSelect,
  CustomerSelect as CustomerSelectElement,
} from "./html/customer";
import {
  ProductSelect,
  ProductSelect as ProductSelectElement,
} from "./html/product";

let initCollection: Collection;

const newCollection = new Collection(
  ButtonElement,
  CustomerSelectElement,
  ProductSelectElement
);

const init = (param: "html") => {
  if (param === "html") {
    initCollection = new Collection(
      ButtonElement,
      CustomerSelectElement,
      ProductSelectElement
    );
  }
};

function getControl(type: "button"): Button;
function getControl(type: "customer"): CustomerSelect;
function getControl(type: "product"): ProductSelect;
function getControl(type: unknown) {
  if (type === "button") {
    return newCollection.button();
  }

  if (type === "customer") {
    return newCollection.customer();
  }

  return newCollection.product();
}

init("html");

const button = getControl("button");
const customer = getControl("customer");
const product = getControl("product");
