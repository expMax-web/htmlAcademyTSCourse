import { createEventManager } from "./event-manager";
import { Notify } from "./types";

const createReducer =
  <T>(buffer: T) =>
  (proxy: Notify<T>, propertyName: keyof T) => {
    //Каждый раз создаём новый менеджер события.
    const manager = createEventManager<Notify<T>>();
    Object.defineProperty(proxy, propertyName, {
      // Само свойство обернём геттером и сеттером.
      get: () => buffer[propertyName],
      // Причём сеттер произведёт уведомление.
      set: (value) => {
        buffer[propertyName] = value;
        // Как избежать лишних сообщений об установке свойства,
        // если его значение реально не поменялось? :)
        manager.dispatch(proxy, propertyName);
      },
    });
    // Дополнительно для этого же свойства добавим
    // read-only-свойство — менеджер событий.
    Object.defineProperty(proxy, `${propertyName as string}Changed`, {
      writable: false,
      value: manager.subscriptionManager,
    });
    return proxy;
  };

// Ограничим себя «простыми» плоскими объектами.
type PlainRow = Record<string, number | boolean | string | null | undefined>;

// Адаптер для создания обёртки вокруг оригинального значения
// рассматривает каждый его ключ и добавляет в изначально пустой
// объект нужные свойства.
export const wrapNotify = <T extends PlainRow>(buffer: T): Notify<T> =>
  Object.keys(buffer).reduce(createReducer(buffer), {} as Notify<T>);
