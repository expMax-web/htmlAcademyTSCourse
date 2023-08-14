import { GamePromised } from "./types-promised";
import { createGameBoard } from "./original";

// Создадим адаптер. Воспользуемся математикой,
// работающей в оригинальной игре,
// но вернём новый интерфейс.
export const createPromised = (): GamePromised => {
  const original = createGameBoard();
  return {
    // Редактор будет нам подсказывать новые имена для ключей, а в качестве функции
    // обратного вызова используем resolve.
    promiseNeutralizeEvil: new Promise<void>((resolve) =>
      original.neutralizeEvil(resolve)
    ),
    promiseEncourageMate: new Promise<void>((resolve) =>
      original.encourageMate(resolve)
    ),
    promiseDisarmDevice: new Promise<void>((resolve) =>
      original.disarmDevice(resolve)
    ),
  };
};
