import {Image, Text, View} from 'react-native';
import React from 'react';
import {MainStyles} from '@components/core/styles';
import {fCurrency} from '@modules/shared/domain/utils/formatNumber';
import {Market} from '@modules/coins/domain/model';

export default function CoinHeaderDetail({market}: {market: Market}) {
  return (
    <View style={MainStyles.flexRowAlignCenter}>
      <Image
        source={{uri: market.image}}
        nativeID={`image${market.id}Dest`}
        style={MainStyles.imageDetail}
        resizeMode="contain"
      />
      <View style={[MainStyles.flex, MainStyles.ml2]}>
        <View style={[MainStyles.flexRowAlignStartJustifyBetween]}>
          <View>
            <Text style={MainStyles.cardTitle}>{market.name}</Text>
            <Text style={MainStyles.cardSubtitle}>{market.symbol}</Text>
          </View>
          <Text style={MainStyles.cardTitle}>
            {fCurrency(market.current_price)}
          </Text>
        </View>
        <View style={[MainStyles.flexRowAlignEndJustifyBetween]}>
          <Text style={MainStyles.text}>LAST 24H</Text>
          <View style={MainStyles.alignEnd}>
            <Text style={MainStyles.text}>
              HIGH {fCurrency(market.high_24h)}
            </Text>
            <Text style={MainStyles.text}>LOW {fCurrency(market.low_24h)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
