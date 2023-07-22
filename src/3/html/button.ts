import { Button as ButtonInterface } from "../i-face-button";

export class Button implements ButtonInterface {
  constructor(
    public execute = () => undefined,
    public name = "",
    public label = "",
    public helpId = "",
    public disabled = false
  ) {}
}

const newButton = new Button();
