import {createInjector, Scope} from 'typed-inject';
import FirebaseRepository from '@modules/authentication/infrastructure/firebase.repository';
import LocalStorage from '@modules/shared/infrastructure/localStorage';
import {COINGECKO_API_ROUTES} from './api.routes';
import Http from '@modules/shared/infrastructure/http.implementation';
import CoinRepository from '@modules/coins/infrastructure/implementation';
import CoinService from '@modules/coins/application/service';

const injector = createInjector()
  .provideValue('API_ROUTE_ROOT', COINGECKO_API_ROUTES.root)
  .provideClass('HttpRepository', Http)
  .provideClass('ICoinRepository', CoinRepository)
  .provideClass('CoinService', CoinService)
  .provideClass('AuthRepository', FirebaseRepository, Scope.Singleton)
  .provideClass('StorageRepository', LocalStorage, Scope.Singleton);

export default injector;
