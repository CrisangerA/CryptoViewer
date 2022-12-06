import {createInjector, Scope} from 'typed-inject';
import {COINGECKO_API_ROUTES} from './api.routes';
import Http from '@modules/shared/infrastructure/http.implementation';
import CoinRepository from '@modules/coins/infrastructure/implementation';
import CoinUseCase from '@modules/coins/application/service';
import OrdersUseCase from '@modules/orders/application/useCase';
import OrdersRepository from '@modules/orders/infrastructure/implementation';
import SQLiteRepository from '@modules/orders/infrastructure/sqlite.repository';

const injector = createInjector()
  .provideValue('API_ROUTE_ROOT', COINGECKO_API_ROUTES.root)
  .provideClass('HttpRepository', Http, Scope.Singleton)
  .provideClass('SQLiteRepository', SQLiteRepository, Scope.Singleton)
  .provideClass('ICoinRepository', CoinRepository, Scope.Singleton)
  .provideClass('IOrdersRepository', OrdersRepository, Scope.Singleton)
  .provideClass('CoinUseCase', CoinUseCase, Scope.Singleton)
  .provideClass('OrdersUseCase', OrdersUseCase, Scope.Singleton);

export default injector;
