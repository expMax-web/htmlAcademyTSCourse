import { EventManager, PropertyChangedHandler } from "./types";

export const createEventManager = <T>(): EventManager<T> => {
  // Подготовим буфер для хранения ссылок на всех подписчиков.
  const handlers = new Set<PropertyChangedHandler<T>>();

  // Подготовим функцию для отмены подписки.
  const unsubscribe = (handler: PropertyChangedHandler<T>) => {
    handlers.delete(handler);
  };
  return {
    // Функция доставки уведомлений
    // вызывает всех подписчиков.
    // Мы не гарантируем порядок:
    // кто первый подписался, того первого вызовем.
    dispatch: (context, property) => {
      handlers.forEach((handler) => handler(context, property));
    },
    subscriptionManager: {
      // Функция оформления подписки
      // регистрирует функцию-обработчик
      // в буфере
      // и возвращает функцию-ярлык для отмены подписки.
      subscribe: (handler) => {
        handlers.add(handler);
        return () => unsubscribe(handler);
      },
      // Подписку можно отменить и без ярлыка,
      // зная обработчик.
      unsubscribe,
    },
  };
};
