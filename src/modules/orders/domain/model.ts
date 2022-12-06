export default interface Order {
  id: string;
  coin: string;
  priceCoin: number;
  valueMoney: number;
  quantity: number;
  type: 'BUY' | 'SELL';
  date: Date;
}

export class OrderValues implements Order {
  id: string;
  valueMoney: number;
  type: 'BUY' | 'SELL';
  quantity: number;
  priceCoin: number;
  coin: string;
  date: Date;

  constructor({id, valueMoney, type, priceCoin, quantity, coin, date}: Order) {
    this.id = id;
    this.valueMoney = valueMoney;
    this.type = type;
    this.quantity = quantity;
    this.priceCoin = priceCoin;
    this.coin = coin;
    this.date = date;
  }
}
