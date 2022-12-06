import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import Button from '@components/core/Button';
import useNavigation from '@hooks/useNavigation';
import {Screens} from '@config/navigation';
import useCoins from '@hooks/useCoins';
import Order from '@modules/orders/domain/model';
import OrderCard from './Order';
import NotRecords from '@components/layout/NotRecords';

//------------------------------------------------------------------------------------------------------
interface Props {
  coin: string;
  currentPrice: number;
  selected: Order | null;
  setSelected: React.Dispatch<React.SetStateAction<Order | null>>;
}
export default function OrderListView({
  coin,
  currentPrice,
  selected,
  setSelected,
}: Props) {
  const {showModal} = useNavigation();
  const {data, loading} = useCoins({coin});

  return (
    <View>
      {loading && <ActivityIndicator />}
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <OrderCard
            order={item}
            currentPrice={currentPrice}
            selected={selected}
            setSelected={setSelected}
            index={index}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={<NotRecords />}
        showsVerticalScrollIndicator={false}
        bouncesZoom
        style={style.list}
      />
      <Button
        title="AGREGAR"
        onPress={() => showModal(Screens[3].name, {coin})}
      />
    </View>
  );
}

const style = StyleSheet.create({
  list: {height: '90%'},
});
