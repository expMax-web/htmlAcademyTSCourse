import { GameBoardView } from "./types";
import { isElement } from "./utils";

export const createGameBoard = (): GameBoardView => {
  // Обратите внимание, что TypeScript не может знать, сколько
  // элементов будет найдено в документе.
  // Задача разработчика — проконтролировать выход за пределы массива,
  // как и в JavaScript.
  const [evil, timer, mate] = document.querySelectorAll("[data-id*=id]");
  if (!isElement(evil)) {
    throw new Error();
  }
  if (!isElement(timer)) {
    throw new Error();
  }
  if (!isElement(mate)) {
    throw new Error();
  }
  {
    return {
      neutralizeEvil: (done) =>
        evil.addEventListener("click", done, { once: true }),
      encourageMate: (done) =>
        mate.addEventListener("click", done, { once: true }),
      disarmDevice: (done) =>
        timer.addEventListener("click", done, { once: true }),
    };
  }
};
