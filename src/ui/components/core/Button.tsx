import {StyleProp, TouchableHighlight, ViewStyle} from 'react-native';
import React from 'react';
import Text from './Text';
import {buttonStyles as styles, Colors} from './styles';
interface Props {
  type: 'root' | 'transparent' | 'outlined';
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle> | undefined;
}
Button.defaultProps = {
  type: 'transparent',
};
export default function Button({type, title, onPress, disabled, style}: Props) {
  const rootStyle = [styles.root, styles[type], style];
  return (
    <TouchableHighlight
      style={rootStyle}
      onPress={onPress}
      disabled={disabled}
      underlayColor={Colors.underlay}>
      <Text type="button" text={title} />
    </TouchableHighlight>
  );
}
