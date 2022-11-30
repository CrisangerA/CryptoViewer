import {
  StyleSheet,
  TextInput as NativeTextInput,
  TextInputProps,
} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import Text from '@components/core/Text';

type Props = {
  label: string;
  control: any;
  name: string;
  rules?: any;
} & TextInputProps;
export default function TextInput({
  control,
  name,
  rules,
  label,
  ...props
}: Props) {
  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <>
          <Text type="input" text={label} />
          <NativeTextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={text => onChange(text)}
            value={value}
            {...props}
          />
        </>
      )}
      name={name}
      rules={rules}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 16,
    //
    borderColor: '#bdbdbd',
    borderWidth: 1,
    fontSize: 16,
  },
});
