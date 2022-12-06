import injector from '@config/di';
import OrdersUseCase from '@modules/orders/application/useCase';
import Order from '@modules/orders/domain/model';
import useQuery from '@hooks/useQuery';
import {ToastAndroid} from 'react-native';
import React from 'react';

// --------------------------------------------------------------------------------------
interface Props {
  coin?: string;
}
const ordersUseCase = injector.injectClass(OrdersUseCase);
export default function useCoins({coin}: Props = {coin: ''}) {
  const [data, setData] = React.useState<Order[]>([]);
  // hooks
  const {isLoading, isRefetching, refetch} = useQuery<Order[]>({
    key: ['GetAllOrders', coin],
    service: () => ordersUseCase.GetAllOrders(coin || ''),
    options: {
      staleTime: 0,
      enabled: coin ? true : false,
      onSuccess: (res: Order[]) => setData(res),
    },
  });
  const loading = isLoading || isRefetching;
  // events
  async function createNewOrder(order: Order) {
    try {
      await ordersUseCase.CreateNewOrder(order);
      ToastAndroid.show('Order created', ToastAndroid.LONG);
      return order;
    } catch (e) {
      ToastAndroid.show('Error creating order', ToastAndroid.LONG);
      throw new Error(e as any);
    }
  }
  async function deleteOrder(id: string) {
    try {
      await ordersUseCase.DeleteOrder(id);
      ToastAndroid.show('Order deleted', ToastAndroid.LONG);
    } catch (e) {
      ToastAndroid.show('Error deleting order', ToastAndroid.LONG);
      throw new Error(e as any);
    }
  }

  return {data, loading, createNewOrder, refetch, deleteOrder};
}
