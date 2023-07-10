import { AccountDaily, GeneralLedgerEntry } from "./types";

const getData = (): GeneralLedgerEntry[] => {
  const request = new XMLHttpRequest();
  let data = [];
  request.open("GET", "/js/data.json", false);
  try {
    request.send();
    if (request.status != 200) {
      throw new Error("");
    } else {
      data = JSON.parse(request.response);
    }
  } catch (err) {
    throw new Error("");
  }
  return data;
};

interface GeneralLedgerEntryPart {
  posted: string;
  debitAccountId: string;
  creditAccountId: string;
  amount: number;
}

type AccountDailyReducer = (
  accountId: string,
  ledger: GeneralLedgerEntryPart[]
) => AccountDaily[];

const ACCOUNT_TO_CREDIT = "311.0001 income";

const getAccountDaily: AccountDailyReducer = (accountId, ledger) => {
  const resultArr: AccountDaily[] = [];

  const dates = new Set();

  ledger.forEach((item) => {
    dates.add(item.posted.substring(0, 10));
  });

  dates.forEach((datesItem) => {
    const accountDaily: AccountDaily = ledger.reduce(
      (acc: AccountDaily, item) => {
        const date = item.posted.substring(0, 10);

        // Уязвимость при сравнении строк
        if (date !== datesItem) {
          return acc;
        }

        if (item.creditAccountId === accountId) {
          return {
            date: date,
            debitDayTotal: acc.debitDayTotal,
            creditDayTotal: acc.creditDayTotal + item.amount,
          };
        }

        if (item.debitAccountId === accountId) {
          return {
            date: date,
            debitDayTotal: acc.debitDayTotal + item.amount,
            creditDayTotal: acc.creditDayTotal,
          };
        }

        return acc;
      },
      {
        date: "",
        debitDayTotal: 0,
        creditDayTotal: 0,
      }
    );

    if (accountDaily.date) {
      resultArr.push(accountDaily);
    }
  });

  return resultArr;
};

window.performance.mark("test1");

const test1 = getAccountDaily(ACCOUNT_TO_CREDIT, getData());

console.log(
  window.performance.measure("test1Measure", "test1").duration / 1000
);

console.log(test1);

// Эталон
const createAccountDaily = (date: string): AccountDaily => ({
  creditDayTotal: 0,
  date,
  debitDayTotal: 0,
});

const setMapThough = (
  accumulator: Map<string, AccountDaily>,
  accountDaily: AccountDaily
) => {
  accumulator.set(accountDaily.date, accountDaily);
  return accountDaily;
};

const getDate = (dateTime: string) => dateTime.substring(0, 10);

const getOrCreateDaily = (
  accumulator: Map<string, AccountDaily>,
  dateFull: string
): AccountDaily => {
  const date = getDate(dateFull);
  const stored = accumulator.get(date);
  return typeof stored !== "undefined"
    ? stored
    : setMapThough(accumulator, createAccountDaily(date));
};

const createReducer = (accountId: string) => {
  const debitFilter = (item: GeneralLedgerEntryPart) =>
    accountId === item.debitAccountId;
  const creditFilter = (item: GeneralLedgerEntryPart) =>
    accountId === item.creditAccountId;
  return (
    accumulator: Map<string, AccountDaily>,
    item: GeneralLedgerEntryPart
  ) => {
    const isCredit = creditFilter(item);
    const isDebit = debitFilter(item);
    if (isCredit || isDebit) {
      const row = getOrCreateDaily(accumulator, item.posted);
      row.creditDayTotal += isCredit ? item.amount : 0;
      row.debitDayTotal += isDebit ? item.amount : 0;
    }
    return accumulator;
  };
};

export const accountDaily: AccountDailyReducer = (accountId, ledger) => [
  ...ledger.reduce(createReducer(accountId), new Map()).values(),
];

window.performance.mark("test2");
const test2 = accountDaily(ACCOUNT_TO_CREDIT, getData());

console.log(
  window.performance.measure("test2Measure", "test2").duration / 1000
);

console.log(test2);
