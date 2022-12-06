import injector from '@config/di';
import OrdersUseCase from '@modules/orders/application/useCase';
import Order from '@modules/orders/domain/model';
import useQuery from '@hooks/useQuery';
import {ToastAndroid} from 'react-native';
import React from 'react';
import {Market} from '@modules/coins/domain/model';
import CoinUseCase from '@modules/coins/application/service';

// --------------------------------------------------------------------------------------
interface Props {
  coin?: string;
}
const ordersUseCase = injector.injectClass(OrdersUseCase);
const coinUseCase = injector.injectClass(CoinUseCase);
export default function useCoins({coin}: Props = {coin: ''}) {
  const [data, setData] = React.useState<Order[]>([]);
  // hooks
  const {
    data: coins,
    refetch: refetchCoins,
    isRefetching,
  } = useQuery<Market[]>({
    key: ['GetCoinsMarkets'],
    service: () => coinUseCase.GetCoinsMarkets(),
    options: {
      staleTime: 60 * 60 * 1000 * 0.125,
    },
  });
  const {isLoading: loading, refetch} = useQuery<Order[]>({
    key: ['GetAllOrders', coin],
    service: () => ordersUseCase.GetAllOrdersByCoin(coin || ''),
    options: {
      staleTime: 0,
      enabled: coin ? true : false,
      onSuccess: (res: Order[]) => setData(res),
    },
  });
  const {data: orders, refetch: refetchAllOrders} = useQuery<Order[]>({
    key: ['GetAllOrders', coin],
    service: () => ordersUseCase.GetAllOrders(),
    options: {
      staleTime: 0,
    },
  });
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

  return {
    data,
    loading,
    createNewOrder,
    refetch,
    deleteOrder,
    coins,
    refetchCoins,
    isRefetching,
    orders,
    refetchAllOrders,
  };
}
