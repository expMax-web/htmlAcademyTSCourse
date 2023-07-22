import { UiControl } from "../i-face-control";

export interface NewSelect extends UiControl {
  enableNotVIP: boolean;
}

export class NewElement implements NewSelect {
  constructor(
    public enableNotVIP = false,
    public name = "",
    public label = "",
    public helpId = "",
    public disabled = false
  ) {}
}
