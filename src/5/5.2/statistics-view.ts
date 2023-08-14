import { GAME_RESET_BUTTONS, HIDDEN } from "./constants";
import { StatisticsView } from "./types";
import { isElement } from "./utils";

export const createStatistics = (): StatisticsView => {
  const defrost = document.querySelector(GAME_RESET_BUTTONS);
  if (!isElement(defrost)) {
    throw new Error();
  }
  defrost.addEventListener("click", () => defrost.classList.add(HIDDEN));
  return {
    onClosing: (handler) => defrost.addEventListener("click", handler),
    show: () => defrost.classList.remove(HIDDEN),
  };
};
