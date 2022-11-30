import {Text, TextInput, View} from 'react-native';
import React from 'react';
import Button from '@components/core/Button';
import useNavigation from '@hooks/useNavigation';
import {Screens} from '@config/navigation';

export default function Trading() {
  const {showModal} = useNavigation();
  return (
    <View>
      <Text>My Movements Trading</Text>
      <TextInput />
      <Text>Flatlist of open orders</Text>
      <Button title="Add" onPress={() => showModal(Screens[3].name)} />
    </View>
  );
}
