import {Market} from '@modules/coins/domain/model';
import {MainStyles, Colors, Sizes} from '@components/core/styles';
import {fCurrency} from '@modules/shared/domain/utils/formatNumber';
import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Screens} from '@config/navigation';
import {Text} from '@components/core';
// ---------------------------------------------------------------------------------------------
interface Props {
  market: Market;
  y: Animated.Value;
  index: number;
  componentId: string;
}
// ----------------------------------------------------------------------------
export const COIN_SIZE = Sizes.AvatarImage + Sizes.Padding * 2 + Sizes.Margin;
export default class CoinCard extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    Navigation.push(this.props.componentId, {
      component: {
        name: Screens[2].name,
        passProps: {market: this.props.market},
        options: {
          animations: {
            push: {
              content: {
                translationX: {
                  from: require('react-native').Dimensions.get('window').width,
                  to: 0,
                  duration: 300,
                },
              },
              sharedElementTransitions: [
                {
                  fromId: `image${this.props.market.id}`,
                  toId: `image${this.props.market.id}Dest`,
                  interpolation: {type: 'spring'},
                  duration: 300,
                },
              ],
            },
            pop: {
              content: {
                translationX: {
                  from: 0,
                  to: require('react-native').Dimensions.get('window').width,
                  duration: 300,
                },
              },
              sharedElementTransitions: [
                {
                  fromId: `image${this.props.market.id}Dest`,
                  toId: `image${this.props.market.id}`,
                  interpolation: {type: 'spring'},
                  duration: 300,
                },
              ],
            },
          },
        },
      },
    });
  }

  render() {
    const {market, y, index} = this.props;
    // ANIMATION
    const scale = y.interpolate({
      inputRange: [-1, 0, COIN_SIZE * index, COIN_SIZE * (index + 1)],
      outputRange: [1, 1, 1, 0],
      extrapolate: 'clamp',
    });
    const opacity = y.interpolate({
      inputRange: [-1, 0, COIN_SIZE * index, COIN_SIZE * (index + 1)],
      outputRange: [1, 1, 1, 0],
      extrapolate: 'clamp',
    });
    // STYLES
    const animation = {
      opacity,
      transform: [{scale}],
    };
    const card = [styles.card, animation];

    return (
      <Animated.View key={market.id} style={card}>
        <TouchableOpacity onPress={this.handlePress}>
          <View style={MainStyles.flexRowAlignCenter}>
            <Image
              style={MainStyles.imageAvatar}
              source={{uri: market.image}}
              nativeID={`image${this.props.market.id}`}
              resizeMode={'contain'}
            />
            <View
              style={[
                MainStyles.flexRowAlignCenterJustifyBetween,
                MainStyles.flex,
                MainStyles.ml2,
              ]}>
              <View style={styles.text}>
                {/* <Text style={MainStyles.cardTitle}>{market.name}</Text> */}
                <Text
                  text={market.symbol.toUpperCase()}
                  style={MainStyles.cardTitle}
                />
              </View>
              <View>
                <Text
                  text={fCurrency(market.current_price)}
                  style={MainStyles.cardSubtitle}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: Sizes.Padding,
    marginBottom: Sizes.Margin,
    borderRadius: 20,
    backgroundColor: Colors.lighter,
    elevation: 20,
  },
  text: {
    //marginLeft: 8,
  },
});
