import {StyleSheet, SafeAreaView, ImageBackground} from 'react-native';
import React, {PropsWithChildren} from 'react';

const imageUrl =
  'https://img.freepik.com/free-vector/big-data-abstract-graph-finance-stock-market-visualization-cash-income-data-analysis-futuristic-infographic-aesthetics-design-science-cloud-data-representation_1217-5660.jpg?w=1480&t=st=1666816401~exp=1666817001~hmac=297c5244996cd6495bf2db8e326ed8e8eef2748a29bd10deb3f7cb3e80b22fc3';
export default function Page({children}: PropsWithChildren) {
  return (
    <ImageBackground
      source={{
        uri: imageUrl,
      }}
      style={styles.image}
      blurRadius={50}>
      <SafeAreaView style={styles.root}>{children}</SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, padding: 0, backgroundColor: 'transparent'},
  image: {
    width: '100%',
    height: '100%',
  },
});
