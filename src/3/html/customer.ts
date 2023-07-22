import { CustomerSelect as CustomerSelectInterface } from "../i-face-customer";

export class CustomerSelect implements CustomerSelectInterface {
  constructor(
    public enableVIP = false,
    public name = "",
    public label = "",
    public helpId = "",
    public disabled = false
  ) {}
}
