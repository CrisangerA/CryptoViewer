import {Navigation} from '@imports/react-native-navigation';
// Screens
import CoinsDetailPage from 'src/ui/pages/coin/details';
import CoinsMarkersPage from 'src/ui/pages/coin/markers';
// Modals
import ModalAddOrder from '@components/coin/details/AddOrder';
//----------------------------------------------------------------
export const Screens = {
  1: {
    name: 'coin.markers',
    Component: CoinsMarkersPage,
  },
  2: {
    name: 'coin.detail',
    Component: CoinsDetailPage,
  },
  3: {
    name: 'modal.coin.add.order',
    Component: ModalAddOrder,
  },
};
// Define type of root navigation
export const NavigationTypes = {
  Main: () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: Screens[1].name,
              },
            },
          ],
        },
      },
    });
  },
};
