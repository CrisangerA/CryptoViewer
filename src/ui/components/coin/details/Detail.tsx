import {useQuery} from '@tanstack/react-query';
import {ActivityIndicator, ScrollView, Text} from 'react-native';
import React from 'react';
import {MainStyles, textStyles} from '@components/core/styles';
import appInjector from '@config/di';
import CoinService from '@modules/coins/application/service';
// ---------------------------------------------------------------------------------------------------
const coinService = appInjector.injectClass(CoinService);
export default function CoinDetail({id}: {id: string}) {
  const {data, isLoading} = useQuery(
    ['GetCoinDetails', id],
    () => coinService.GetCoinDetails(id),
    {
      staleTime: Infinity,
    },
  );
  return (
    <ScrollView>
      <Text style={textStyles.title}>Description</Text>
      {isLoading && <ActivityIndicator />}
      <Text style={MainStyles.text}>{data?.description?.en}</Text>

      <Text style={textStyles.title}>Exchanges</Text>
      {data?.tickers.map(tiker => (
        <Text key={tiker.market.name} style={MainStyles.text}>
          {tiker.market.name}
        </Text>
      ))}

      <Text style={textStyles.title}>Official Links</Text>
      {data?.links.homepage.map(tiker => (
        <Text key={`H-${tiker}`} style={MainStyles.text} numberOfLines={1}>
          {tiker}
        </Text>
      ))}
      {data?.links.blockchain_site.map(tiker => (
        <Text key={`B-${tiker}`} style={MainStyles.text} numberOfLines={1}>
          {tiker}
        </Text>
      ))}

      <Text style={textStyles.title}>Repositories</Text>
      {data?.links.repos_url.bitbucket.map(tiker => (
        <Text key={tiker} style={MainStyles.text}>
          {tiker}
        </Text>
      ))}
      {data?.links.repos_url.github.map(tiker => (
        <Text key={tiker} style={MainStyles.text}>
          {tiker}
        </Text>
      ))}

      <Text style={textStyles.title}>Status</Text>
      <Text>{JSON.stringify(data?.developer_data)}</Text>

      {/* <Text>{JSON.stringify(data?.tickers)}</Text> */}
    </ScrollView>
  );
}
