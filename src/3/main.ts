import { Collection } from "./collections";
import { Button, Button as ButtonElement } from "./html/button";
import {
  CustomerSelect,
  CustomerSelect as CustomerSelectElement,
} from "./html/customer";
import { NewElement } from "./html/new";
import {
  ProductSelect,
  ProductSelect as ProductSelectElement,
} from "./html/product";
import { getControl as getControlRefernce } from "./reference-result/control-provider";

let initCollection: Collection;

const init = (param: "html") => {
  if (param === "html") {
    initCollection = new Collection(
      ButtonElement,
      CustomerSelectElement,
      ProductSelectElement,
      NewElement
    );
  }
};

function getControl(type: "button"): Button;
function getControl(type: "customer"): CustomerSelect;
function getControl(type: "product"): ProductSelect;
function getControl(type: unknown) {
  if (type === "button") {
    return initCollection.button();
  }

  if (type === "customer") {
    return initCollection.customer();
  }

  return initCollection.product();
}

init("html");

const button = getControl("button");
const customer = getControl("customer");
const product = getControl("product");

const buttonReference = getControlRefernce("button");
const customerReference = getControlRefernce("customer");
const productReference = getControlRefernce("product");
const newReference = getControlRefernce("newElement");
