import Coin, {CoinDetail, Market} from '../domain/model';
import ICoinRepository from '../domain/repository';

export default class CoinService {
  public static inject = ['ICoinRepository'] as const;
  constructor(private readonly repository: ICoinRepository) {}
  // Transform in dto
  async GetCoinsMarkets(): Promise<Market[]> {
    return this.repository.GetCoinsMarkets();
  }

  async GetCoinsList(): Promise<Coin[]> {
    return this.repository.GetCoinsList();
  }

  async GetCoinDetails(id: string): Promise<CoinDetail> {
    return this.repository.GetCoinDetails(id);
  }
}
