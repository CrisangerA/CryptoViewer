import {StyleSheet, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

interface Props {
  mb?: number;
  m?: number;
  p?: number;
}
const Box = ({mb, m, p, children}: PropsWithChildren<Props>) => {
  const style = [styles.root];
  if (m) {
    style.push({margin: m});
  }
  if (mb) {
    style.push({marginBottom: mb});
  }
  if (p) {
    style.push({padding: p});
  }
  if (children) {
    return <View style={style}>{children}</View>;
  }
  return <View style={style} />;
};

export default Box;

const styles = StyleSheet.create({
  root: {},
});
