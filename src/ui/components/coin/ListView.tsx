import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
//import {useQuery} from '@tanstack/react-query';
// modules
import CoinUseCase from '@modules/coins/application/service';
//
import {Sizes} from '@components/core/styles';
import Coin, {COIN_SIZE} from './Coin';
import useNavigation from '@hooks/useNavigation';
import {Market} from '@modules/coins/domain/model';
import appInjector from '@config/di';
import useQuery from '@hooks/useQuery';
// ----------------------------------------------------------------------------------------
const coinUseCase = appInjector.injectClass(CoinUseCase);
export default function ListView() {
  const {componentId} = useNavigation();
  // hooks
  const {data, refetch, isRefetching} = useQuery<Market[]>({
    key: ['GetCoinsMarkets'],
    service: () => coinUseCase.GetCoinsMarkets(),
    options: {
      staleTime: 60 * 60 * 1000 * 1,
    },
  });

  // Animation
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View>
      <Animated.FlatList
        data={data || []}
        contentContainerStyle={styles.flatList}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id as any}
        renderItem={({item, index}) => {
          return (
            <Coin
              market={item as Market}
              y={scrollY}
              index={index}
              componentId={componentId}
            />
          );
        }}
        getItemLayout={(_, index) => ({
          index,
          length: COIN_SIZE,
          offset: COIN_SIZE * index,
        })}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        onRefresh={refetch}
        refreshing={isRefetching}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    padding: Sizes.Padding,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
