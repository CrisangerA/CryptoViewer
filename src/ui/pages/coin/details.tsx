import React from 'react';
import {
  Animated,
  BackHandler,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import {NavigationComponentProps} from 'react-native-navigation';
// components
import Page from '@components/layout/Page';
import {MainStyles} from '@components/core/styles';
import CoinDetail from '@components/coin/details/Detail';
import Button from '@components/core/Button';
import CoinHeaderDetail from '@components/coin/details/HeaderDetail';
import Box from '@components/layout/Box';
import OrderListView from '@components/coin/details/order/ListView';
// modules
import {Market} from '@modules/coins/domain/model';
import useCoins from '@hooks/useCoins';
import Order from '@modules/orders/domain/model';

interface Props extends NavigationComponentProps {
  market: Market;
}
export default function CoinsDetailPage({market}: Props) {
  const [selected, setSelected] = React.useState<Order | null>(null);
  const {deleteOrder, refetch} = useCoins({coin: selected?.coin});
  const tabLeft = React.useRef(new Animated.Value(1)).current;
  const tabRight = React.useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    const event = BackHandler.addEventListener('hardwareBackPress', () => {
      if (selected !== null) {
        setSelected(null);
        return true;
      }
      return false;
    });
    return () => {
      event.remove();
    };
  }, [selected]);
  // events
  async function handleDelete() {
    if (selected) {
      await deleteOrder(selected.id);
      refetch();
      setSelected(null);
    }
  }
  // animation
  function toggleTab(to: string) {
    if (to === 'trad') {
      Animated.parallel([
        Animated.timing(tabLeft, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(tabRight, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
    if (to === 'info') {
      Animated.parallel([
        Animated.timing(tabLeft, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(tabRight, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }
  const leftStyles = {
    transform: [
      {
        translateX: tabLeft.interpolate({
          inputRange: [0, 1],
          outputRange: [-Dimensions.get('window').width, 0],
        }),
      },
    ],
  };
  const rightStyles = {
    transform: [
      {
        translateX: tabRight.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Dimensions.get('window').width],
        }),
      },
    ],
  };
  return (
    <Page>
      <View style={{height: '23%'}}>
        <Box p={8}>
          <CoinHeaderDetail market={market} />
        </Box>

        <View style={MainStyles.flexRowAlignCenterJustifyBetween}>
          {selected !== null ? (
            <Button
              title="DELETE"
              onPress={() => handleDelete()}
              style={MainStyles.flex}
            />
          ) : (
            <>
              <Button
                title="TRADE"
                onPress={() => toggleTab('trad')}
                style={MainStyles.flex}
              />
              <Button
                title="INFO"
                onPress={() => toggleTab('info')}
                style={MainStyles.flex}
              />
            </>
          )}
        </View>
      </View>
      <View style={styles.tabs}>
        <Animated.View style={[styles.left, leftStyles]}>
          <OrderListView
            currentPrice={market.current_price}
            coin={market.symbol}
            selected={selected}
            setSelected={setSelected}
          />
        </Animated.View>
        <Animated.View style={[styles.right, rightStyles]}>
          <CoinDetail id={market.id} />
        </Animated.View>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    height: '77%',
  },
  left: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  right: {
    paddingHorizontal: 12,
  },
});
