import React from 'react';
import {View} from 'react-native';
import {NavigationComponentProps} from 'react-native-navigation';
// components
import Page from '@components/layout/Page';
import {MainStyles} from '@components/core/styles';
import CoinDetail from '@components/coin/details/Detail';
// modules
import {Market} from '@modules/coins/domain/model';
import Button from '@components/core/Button';
import Trading from '@components/coin/details/Trading';
import CoinHeaderDetail from '@components/coin/details/HeaderDetail';

interface Props extends NavigationComponentProps {
  market: Market;
}
export default function CoinsDetailPage({market}: Props) {
  const [tab, setTab] = React.useState('trad');
  return (
    <Page>
      <CoinHeaderDetail market={market} />

      <View style={MainStyles.flexRowAlignCenterJustifyBetween}>
        <Button title="Trading" onPress={() => setTab('trad')} />
        <Button title="Information" onPress={() => setTab('info')} />
      </View>

      {tab === 'trad' && <Trading />}
      {tab === 'info' && <CoinDetail id={market.id} />}
    </Page>
  );
}
