import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {useQuery} from '@tanstack/react-query';
// modules
import CoinService from '@modules/coins/application/service';
//
import {Sizes} from '@components/core/styles';
import Coin from './Coin';
import useNavigation from '@hooks/useNavigation';
import {Market} from '@modules/coins/domain/model';
import appInjector from '@config/di';
//const {height} = Dimensions.get('window');
// di
//const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const coinService = appInjector.injectClass(CoinService);
export default function ListView() {
  const {componentId} = useNavigation();
  // hooks
  const {data} = useQuery(
    ['GetCoinsMarkets'],
    () => coinService.GetCoinsMarkets(),
    {
      staleTime: Infinity,
    },
  );

  // Animation
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View>
      {/* <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.image}
        blurRadius={50}
      /> */}
      <Animated.FlatList
        data={data || []}
        initialNumToRender={8}
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
        contentContainerStyle={styles.flatList}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
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
