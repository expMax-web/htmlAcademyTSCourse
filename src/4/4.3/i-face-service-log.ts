export type Amount = number & { money: void };
export const makeAmount = (value: number) => value as Amount;
export type DateTime = string & { dateTime: void };
export const makeDateTime = (value: string) => value as DateTime;

export interface Vehicle {
  make: string;
  model: string;
  body: string;
  trim: string;
}

export interface ServiceLogRecord {
  id: string;
  //* дата события
  serviced: DateTime;
  /**
   * сервисный центр
   */
  workshop: string;
  //* марка автомобиля
  vehicle: Vehicle;
  //* год выпуска автомобиля
  year: number;
  //* пробег
  milage: number;
  //* вид обслуживания
  description: string;
  /**
   * стоимость для клиента
   **/
  total: Amount;
  //* стоимость деталей
  parts: Amount;
  //* стоимость работы
  work: Amount;
  //* водитель (заказчик)
  customer: string;
  //* механик (исполнитель)
  mechanic: string;
  /**
   *  оплаченная сумма
   */
  paid: Amount;
  //* скидка
  discount: Amount;
}
