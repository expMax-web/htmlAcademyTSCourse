import { DateTime, LogRecord } from "./types";

// В «дикой природе» номер записи будет возникать во время
// её сохранения в базу данных. Здесь мы
// воспользуемся функцией с приватной замкнутой переменной
//  nextIdentity: ()=>number;.
const nextIdentity = (() => {
  let id = 0;
  return () => {
    return ++id;
  };
})();

// В «дикой природе» дату будет присваивать проверенный и доверенный сервер,
// а не клиентский браузер.
const getDate = (): DateTime => new Date().toISOString() as DateTime;

// Как именно будет происходить запись в журнал,
// зависит от обстоятельств вашего приложения.
const logFramework = (record: LogRecord): void => {
  window.console.log({ record });
};

// Это реализация инфраструктурной функции записи в журнал.
// Она получает все сведения о событии
// за исключением идентификатора и даты.
// Мы сообщаем об этом коллегам и компилятору с помощью
// утилитарного типа Omit.
// Дополнительно мы заявляем, что не будем изменять полученное значение.
export const register = (
  newRecord: Readonly<Omit<LogRecord, "id" | "date">>
): void => {
  logFramework({
    ...newRecord,
    id: nextIdentity(),
    date: getDate(),
  });
};
