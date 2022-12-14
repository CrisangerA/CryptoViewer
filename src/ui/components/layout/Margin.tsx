import {View} from 'react-native';
import React, {PropsWithChildren} from 'react';

// ---------------------------------------------------------------------------------------------------
interface Props {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}
export default function Margin({
  top,
  bottom,
  left,
  right,
  children,
}: PropsWithChildren<Props>) {
  const style = [];
  if (top) {
    style.push({marginTop: top});
  }
  if (bottom) {
    style.push({marginBottom: top});
  }
  if (left) {
    style.push({marginLeft: top});
  }
  if (right) {
    style.push({marginRight: top});
  }
  if (children) {
    return <View style={style}>{children}</View>;
  }
  return <View style={style} />;
}
