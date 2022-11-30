import {Colors as NativeColors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet} from 'react-native';
import {Theme} from '@config/styles';

export const Colors = {
  text: '#000',
  bgColor: '#000',
  lighter: NativeColors.lighter,
};
export const Fonts = {
  fontSizeCardTitle: 20,
  fontSizeCardSubtitle: 18,
  fontSizeText: 12,
};
export const Sizes = {
  Spacing: 16,
  Margin: 20,
  Padding: 20,
  AvatarImage: 69,
  DetailImage: 100,
  CoinSize: 60 + 20 * 2 + 16 * 2 + 24, // DEPRECATED
};

export const textStyles = StyleSheet.create({
  text: {
    color: Theme.color.text,
  },
  button: {
    color: Theme.color.primary,
    fontSize: Theme.text.size.button,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    fontSize: Theme.text.size.input,
    marginBottom: Theme.layout.margin(1),
    color: '#212121',
  },
  pageTitle: {
    color: '#212121',
    fontSize: Theme.text.size.pageTitle,
    fontWeight: 'bold',
  },
  title: {
    fontSize: Theme.text.size.title,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: Theme.text.size.subtitle,
  },
});

export const buttonStyles = StyleSheet.create({
  root: {
    padding: Theme.layout.padding(3),
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: Theme.layout.borderRadius(3),
    elevation: 10,
  },
  transparent: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
  outlined: {},
});

export const cardStyles = StyleSheet.create({
  root: {
    borderRadius: Theme.layout.borderRadius(3),
    padding: Theme.layout.borderRadius(5),
    backgroundColor: '#fff',
    elevation: 6,
    marginHorizontal: 30,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: Theme.text.size.title,
    color: Theme.color.text,
    fontWeight: 'bold',
  },
});

export const MainStyles = StyleSheet.create({
  // FOR LAYOUT
  ml2: {
    marginLeft: 8,
  },
  flex: {
    flex: 1,
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowJustifyBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRowAlignCenterJustifyBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowAlignEndJustifyBetween: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  flexRowAlignStartJustifyBetween: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  // IMAGES
  imageAvatar: {
    width: Sizes.AvatarImage,
    height: Sizes.AvatarImage,
  },
  imageDetail: {
    width: Sizes.DetailImage,
    height: Sizes.DetailImage,
  },
  // FOR TEXT
  text: {
    color: Colors.text,
    fontSize: Fonts.fontSizeText,
    marginB: 0,
  },
  cardTitle: {
    color: Colors.text,
    fontSize: Fonts.fontSizeCardTitle,
    fontWeight: '700',
  },
  cardSubtitle: {
    color: Colors.text,
    fontSize: Fonts.fontSizeCardTitle,
    fontWeight: '300',
    textTransform: 'uppercase',
  },
});
