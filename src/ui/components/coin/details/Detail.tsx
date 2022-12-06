import {useQuery} from '@tanstack/react-query';
import {
  ActivityIndicator,
  Clipboard,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ScrollView, Text} from '@components/core';
import {MainStyles, textStyles} from '@components/core/styles';
import appInjector from '@config/di';
import CoinUseCase from '@modules/coins/application/service';
// ---------------------------------------------------------------------------------------------------
const coinUseCase = appInjector.injectClass(CoinUseCase);
export default function CoinDetail({id}: {id: string}) {
  const {data, isLoading} = useQuery(
    ['GetCoinDetails', id],
    () => coinUseCase.GetCoinDetails(id),
    {
      staleTime: Infinity,
    },
  );
  async function handleOpenLink(link: string) {
    Clipboard.setString(link);
    ToastAndroid.show('Copied', ToastAndroid.SHORT);
  }
  return (
    <View>
      <ScrollView>
        <Text text="Description" style={textStyles.title} />
        {isLoading && <ActivityIndicator />}
        <Text text={data?.description?.en || ''} style={MainStyles.text} />

        <Text text="Exchanges" style={textStyles.title} />
        {data?.tickers.map(tiker => (
          <Text text={tiker.market.name} key={tiker.market.name} />
        ))}

        <Text text="Official Links" style={textStyles.title} />
        {data?.links.homepage.map(tiker => (
          <TouchableOpacity
            key={`H-${tiker}`}
            onPress={_ => handleOpenLink(tiker)}>
            <Text text={tiker} numberOfLines={1} type="link" />
          </TouchableOpacity>
        ))}
        {data?.links.blockchain_site.map(tiker => (
          <TouchableOpacity
            key={`B-${tiker}`}
            onPress={_ => handleOpenLink(tiker)}>
            <Text text={tiker} numberOfLines={1} type="link" />
          </TouchableOpacity>
        ))}

        <Text text="Repositories" style={textStyles.title} />
        {data?.links.repos_url.bitbucket.map(tiker => (
          <TouchableOpacity key={tiker} onPress={_ => handleOpenLink(tiker)}>
            <Text text={tiker} type="link" />
          </TouchableOpacity>
        ))}
        {data?.links.repos_url.github.map(tiker => (
          <TouchableOpacity key={tiker} onPress={_ => handleOpenLink(tiker)}>
            <Text text={tiker} type="link" />
          </TouchableOpacity>
        ))}

        <Text text="Status" style={textStyles.title} />
        <Text text={JSON.stringify(data?.developer_data)} />
      </ScrollView>
    </View>
  );
}
