// Будем требовать от обработчиков событий соответствия
// этому интерфейсу.
export interface PropertyChangedHandler<T> {
  // Контекст — это объект, свойство которого изменилось.
  // property — это имя свойства, которое изменилось.
  (context: T, property: keyof T): void;
}

// Обозначим для себя тип действия.
interface CancelSubscription {
  (): void;
}

// Наша цель — для каждого «простого» свойства
// простого объекта предоставить программе возможность
// подписать процедуру для получения уведомления.
// Определим интерфейс для оформления и отказа
// от подписки.
export interface PropertyChangedEvent<T> {
  subscribe: (handler: PropertyChangedHandler<T>) => CancelSubscription;
  unsubscribe: (handler: PropertyChangedHandler<T>) => void;
}

// Создадим код для генерации экземпляров
// менеджеров событий.
// Для каждого наблюдаемого свойства подготовим
// экземпляр с таким интерфейсом.
export interface EventManager<T> {
  subscriptionManager: PropertyChangedEvent<T>;
  dispatch: PropertyChangedHandler<T>;
}

// Воспользуемся возможностями TypeScript
// и создадим производный тип,
// все свойства которого заменим на события.
// То есть
// {prop:number} --> {propChanged: ...для подписки на события}
type WithPropertyChangeEvents<T> = {
  [K in keyof T as `${K & string}Changed`]: PropertyChangedEvent<
    T & WithPropertyChangeEvents<T>
  >;
};

// Тогда тип обёрнутого значения
// можно выразить объединением
// его оригинального типа, дополненного свойствами-событиями.
export type Notify<T> = T & WithPropertyChangeEvents<T>;
