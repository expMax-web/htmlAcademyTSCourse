import { wrapNotify } from "./adapter";

// придумаем себе объект - плоское значение
const buffer = {
  value1: 42,
  value2: "the answer",
};

// обернем его в уведомляющий прокси
const proxy = wrapNotify(buffer);

// подпишем вывод на консоль
// уведомлений об изменениях свойства value1
const cancelSubscription = proxy.value1Changed.subscribe((b, p) =>
  window.console.log({ b, p })
);

// изменим свойство
proxy.value1 = 73;
//<<== console.log сообщает об обнаружении изменений

// отменим подписку
cancelSubscription();

proxy.value1 = 97;
//<<== никому больше не интересно...
