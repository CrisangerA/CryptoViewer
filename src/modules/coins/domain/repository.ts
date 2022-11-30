import Coin, {CoinDetail, Market} from './model';

export default interface ICoinRepository {
  GetCoinsList(): Promise<Coin[]>;
  GetCoinsMarkets(): Promise<Market[]>;
  GetCoinDetails(id: string): Promise<CoinDetail>;
}
