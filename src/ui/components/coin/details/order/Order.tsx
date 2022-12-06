import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Order from '@modules/orders/domain/model';
import {MainStyles} from '@components/core/styles';
import {Card} from '@components/core/card';
import {timeSince} from '@modules/shared/domain/utils/formatDate';
import {fCurrency, fPercent} from '@modules/shared/domain/utils/formatNumber';
import Text from '@components/core/Text';

// ---------------------------------------------------------------------------------------------------
interface OrderCardProps {
  currentPrice: number;
  order: Order;
  selected: Order | null;
  setSelected: React.Dispatch<React.SetStateAction<Order | null>>;
  index: number;
}
export default function OrderCard({
  order,
  currentPrice,
  selected,
  setSelected,
}: OrderCardProps) {
  const percent = ((currentPrice - order.priceCoin) * 100) / order.priceCoin;
  const {flexRowAlignCenterJustifyBetween, p5} = MainStyles;
  return (
    <Card style={selected?.id === order.id && style.selected}>
      <TouchableOpacity onLongPress={() => setSelected(order)}>
        <View style={[flexRowAlignCenterJustifyBetween, p5]}>
          <Text text={timeSince(new Date(order.date))} />
          <View>
            <Text text={fCurrency(order.priceCoin)} />
            <Text
              text={`% ${fPercent(percent)}`}
              style={currentPrice > order.priceCoin ? style.profit : style.lost}
            />
          </View>
          <Text text={fCurrency(order.valueMoney)} />
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const style = StyleSheet.create({
  selected: {backgroundColor: 'red'},
  profit: {color: 'green'},
  lost: {color: 'red'},
});
