export interface ListenerFactory {
    makeButtonClick: () => (this: HTMLButtonElement, evt: MouseEvent) => void;
    makeInputInput: () => (this: HTMLInputElement, evt: InputEvent) => void;
    makeInputClick: () => (this: HTMLInputElement, evt: MouseEvent) => void;
    makeSelectInput: () => (this: HTMLSelectElement, evt: InputEvent) => void;
    makeTextAreaInput: () => (this: HTMLTextAreaElement, evt: InputEvent) => void;
  }
  