import Order from '../domain/model';
import IOrdersRepository from '../domain/repository';
import SQLiteRepository from './sqlite.repository';

export default class OrdersRepository implements IOrdersRepository {
  constructor(private readonly sqlite: SQLiteRepository) {}
  public static inject = ['SQLiteRepository'] as const;

  async GetAllOrdersByCoin(coin: string) {
    const query = `SELECT * FROM ORDERS o WHERE o.coin = '${coin}' AND o.type = 'BUY'`;
    return this.sqlite.Read<Order[]>(query);
  }
  async GetAllOrders() {
    return this.sqlite.Read<Order[]>('SELECT * FROM ORDERS o');
  }
  async DeleteOrder(id: string) {
    const query = 'DELETE FROM ORDERS WHERE id = ?';
    return this.sqlite.Write<number>(query, [id]);
  }
  async CreateBuyOrder(order: Order) {
    const query = `INSERT OR REPLACE INTO ORDERS (${Object.keys(order)
      .map(key => key)
      .join(',')}) values (${Object.keys(order)
      .map(_ => '?')
      .join(',')})`;
    this.sqlite.Write(query, Object.values(order));
    return order;
  }
  async CreateSellOrder(order: Order) {
    const query = `INSERT OR REPLACE INTO ORDERS (${Object.keys(order)
      .map(key => key)
      .join(',')}) values (${Object.keys(order)
      .map(_ => '?')
      .join(',')})`;
    this.sqlite.Write(query, Object.values(order));
    return order;
  }
  async CreateNewOrder(order: Order) {
    if (order.type === 'BUY') {
      return this.CreateBuyOrder(order);
    }
    if (order.type === 'SELL') {
      return this.CreateSellOrder(order);
    }
    throw new Error('Invalid order type');
  }
}
