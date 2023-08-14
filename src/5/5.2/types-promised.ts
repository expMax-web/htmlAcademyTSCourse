import { GameBoardView } from "./types";

// Определим тип, в котором для каждого ключа исходного типа
// GameBoardView переопределит его имя и тип.
// Используем Capitalize для придания эстетичного вида новым свойствам.
export type GamePromised = {
  [K in keyof GameBoardView as `promise${Capitalize<K>}`]: Promise<void>;
};
