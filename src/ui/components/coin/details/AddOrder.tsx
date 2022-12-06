//import {Text} from 'react-native';
import React from 'react';
import {CardTitle} from '@components/core/card';
import TextInput from '@components/@forms/TextInput';
import Button from '@components/core/Button';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import ModalBottomSheet from '@components/layout/ModalBottomSheet';
import Text from '@components/core/Text';
import Margin from '@components/layout/Margin';
import Order from '@modules/orders/domain/model';
import useCoins from '@hooks/useCoins';
import useNavigation from '@hooks/useNavigation';

export default function ModalAddOrder({coin}: {coin: string}) {
  const id = React.useId();
  const {dismissModal} = useNavigation();
  const {createNewOrder, refetch} = useCoins({coin});
  // @Form
  const {...methods} = useForm<Order>({
    defaultValues: {
      id,
      coin,
      type: 'BUY',
    },
  });
  const onSubmit: SubmitHandler<Order> = async values => {
    values.quantity = values.valueMoney / values.priceCoin;
    values.date = new Date();
    values.id = values.id.replace(/:/g, 'A');
    await createNewOrder(values);
    refetch();
    dismissModal();
  };
  return (
    <ModalBottomSheet>
      <CardTitle title="Registrar nueva compra" />
      <Text
        text={`Ingresa el precio al que compras ${coin.toUpperCase()} y la cantidad en USD`}
      />
      <Margin top={8} />
      <FormProvider {...methods}>
        <TextInput
          label="Precio"
          name="priceCoin"
          keyboardType="number-pad"
          rules={{required: true}}
          control={methods.control}
          //autoFocus
        />
        <TextInput
          label="Cantidad"
          name="valueMoney"
          keyboardType="number-pad"
          rules={{required: true}}
          control={methods.control}
        />
      </FormProvider>
      <Button
        title="GUARDAR"
        onPress={methods.handleSubmit(onSubmit)}
        disabled={methods.formState.isSubmitting}
      />
    </ModalBottomSheet>
  );
}
