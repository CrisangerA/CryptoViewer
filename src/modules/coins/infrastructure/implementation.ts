import HttpRepository from '@modules/shared/domain/repository/http.repository';
import {COINGECKO_API_ROUTES} from '@config/api.routes';
import ICoinRepository from '../domain/repository';
import Coin, {CoinDetail, Market} from '../domain/model';

//@singleton()

export default class CoinRepository implements ICoinRepository {
  public static inject = ['HttpRepository'] as const;
  constructor(
    //@inject('HttpRepository') http: HttpRepository,
    private readonly http: HttpRepository,
  ) {}
  async GetCoinsMarkets(): Promise<Market[]> {
    const res = await this.http.Get(
      COINGECKO_API_ROUTES.root + COINGECKO_API_ROUTES.coins.markets,
    );
    return res.data;
  }

  async GetCoinsList(): Promise<Coin[]> {
    const res = await this.http.Get(
      COINGECKO_API_ROUTES.root + COINGECKO_API_ROUTES.coins.list,
    );
    return res.data;
  }

  async GetCoinDetails(id: string): Promise<CoinDetail> {
    const res = await this.http.Get(
      COINGECKO_API_ROUTES.root + COINGECKO_API_ROUTES.coins.details(id),
    );
    const detail: CoinDetail = res.data;
    detail.tickers = detail.tickers.filter(
      (ticker, index) =>
        detail.tickers.findIndex(
          t => t.market.identifier === ticker.market.identifier,
        ) === index,
    );
    detail.links.homepage = detail.links.homepage.filter(link => link !== '');
    detail.links.blockchain_site = detail.links.blockchain_site.filter(
      link => link !== '',
    );
    return detail;
  }
}
