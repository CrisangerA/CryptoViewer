import {Animated} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {cardStyles as styles} from '../styles';

export default function Card({style, children}: PropsWithChildren<any>) {
  return <Animated.View style={[styles.root, style]}>{children}</Animated.View>;
}
