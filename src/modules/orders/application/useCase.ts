import Order from '../domain/model';
import IOrdersRepository from '../domain/repository';

export default class OrdersUseCase {
  constructor(private readonly repository: IOrdersRepository) {}
  public static inject = ['IOrdersRepository'] as const;

  async GetAllOrdersByCoin(coin: string) {
    return this.repository.GetAllOrdersByCoin(coin);
  }
  async GetAllOrders() {
    return this.repository.GetAllOrders();
  }
  async CreateNewOrder(order: Order) {
    return this.repository.CreateNewOrder(order);
  }
  async DeleteOrder(id: string) {
    return this.repository.DeleteOrder(id);
  }
}
