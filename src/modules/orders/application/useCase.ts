import Order from '../domain/model';
import IOrdersRepository from '../domain/repository';

export default class OrdersUseCase {
  constructor(private readonly repository: IOrdersRepository) {}
  public static inject = ['IOrdersRepository'] as const;

  async GetAllOrders(coin: string) {
    return this.repository.GetAllOrders(coin);
  }

  async CreateNewOrder(order: Order) {
    return this.repository.CreateNewOrder(order);
  }
  async DeleteOrder(id: string) {
    return this.repository.DeleteOrder(id);
  }
}
