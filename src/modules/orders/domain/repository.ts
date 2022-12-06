import Order from './model';

export default interface IOrdersRepository {
  GetAllOrdersByCoin(coin: string): Promise<Order[]>;
  GetAllOrders(): Promise<Order[]>;
  CreateBuyOrder(order: Order): Promise<Order>;
  CreateSellOrder(order: Order): Promise<Order>;
  CreateNewOrder(order: Order): Promise<Order>;
  DeleteOrder(id: string): Promise<number>;
}
