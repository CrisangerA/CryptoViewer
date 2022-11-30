//import {Text} from 'react-native';
import React from 'react';
import {CardTitle} from '@components/core/card';
import TextInput from '@components/@forms/TextInput';
import Button from '@components/core/Button';
import {useForm} from 'react-hook-form';
import ModalBottomSheet from '@components/layout/ModalBottomSheet';
import Text from '@components/core/Text';
import Margin from '@components/layout/Margin';

interface FormData {
  coin: string;
  currentPrice: string;
  quantity: string;
}
export default function ModalAddOrder() {
  // @Form
  const {
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = useForm<FormData>({
    defaultValues: {
      coin: '',
      currentPrice: '',
      quantity: '',
    },
  });
  const onSubmit = async () => {};
  return (
    <ModalBottomSheet>
      <CardTitle title="Registrar nueva compra" />
      <Text text="Ingresa la cantidad que vas a comprar y el precio al que lo compras." />
      {/* <TextInput label="Coin" control={control} name="coin" /> */}
      <Margin top={8} />
      <TextInput
        label="Cantidad"
        control={control}
        name="quantity"
        keyboardType="number-pad"
      />
      <TextInput
        label="Precio"
        control={control}
        name="currentPrice"
        keyboardType="number-pad"
      />

      <Button
        title="GUARDAR"
        type="outlined"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />
    </ModalBottomSheet>
  );
}
