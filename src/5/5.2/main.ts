import { createPromised } from "./promised";
import { createStatistics } from "./statistics-view";

const statistics = createStatistics();
const start = async () => {
  const { promiseDisarmDevice, promiseEncourageMate, promiseNeutralizeEvil } =
    createPromised();
  await Promise.all([
    promiseDisarmDevice,
    promiseNeutralizeEvil,
    promiseEncourageMate,
  ]);
  statistics.show();
};

statistics.onClosing(() => start());

start();
