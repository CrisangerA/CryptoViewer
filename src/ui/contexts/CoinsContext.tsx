import useCoins from '@hooks/useCoins';
import {Market} from '@modules/coins/domain/model';
import React, {PropsWithChildren} from 'react';

// ---------------------------------------------------------------------------------------------------
interface CoinsContextState {}
const initialState: CoinsContextState = {};
const CoinsContext = React.createContext<CoinsContextState>(initialState);
// ---------------------------------------------------------------------------------------------------

function CoinsProvider({children}: PropsWithChildren) {
  // hooks
  const {refetchCoins, refetchAllOrders} = useCoins();
  React.useEffect(() => {
    const id = setInterval(async () => {
      const fetchCoins = await refetchCoins();
      const fetchOrders = await refetchAllOrders();
      const coins = fetchCoins.data || [];
      const orders = fetchOrders.data || [];

      const coinsByOrder = [...new Set(orders?.map(o => o.coin))];
      let coinsActive = coinsByOrder.map(
        a => coins[coins.findIndex(c => c.symbol === a)],
      );
      console.log(
        '=====> SET INTERVAL : Refetch Coins: ',
        coins?.length,
        orders?.length,
      );
      coinsActive = coinsActive.map(c => {
        c.orders = orders.filter(o => o.coin === c?.symbol);
        return c;
      });
      function formatText(text: Market) {
        return `= ${text?.symbol}: ${text?.current_price} | Max: ${text?.high_24h} | Min: ${text?.low_24h} |`;
      }
      coinsActive.map(coin => {
        console.log('======================================================');
        console.log('= ', coin.name, ' Orders: ', coin.orders.length);
        coin?.orders.map(order => {
          if (coin.current_price) {
            if (order.priceCoin > coin.current_price) {
              console.log('= En perdidas');
              console.log(formatText(coin));
              console.log(`= $${order.priceCoin}`);
            } else if (order.priceCoin < coin.current_price) {
              console.log('= En ganancias');
              console.log(formatText(coin));
              console.log(`= $${order.priceCoin}`);
            }
          }
        });
      });
    }, 20000);
    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CoinsContext.Provider value={{}}>{children}</CoinsContext.Provider>;
}

export {CoinsContext, CoinsProvider};
