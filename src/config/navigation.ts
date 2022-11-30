import {Navigation} from '@imports/react-native-navigation';
// Screens
import CoinsDetailPage from 'src/ui/pages/Coin/details';
import CoinsMarkersPage from 'src/ui/pages/Coin/markers';
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
  Drawer: () => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          center: {
            stack: {
              id: 'AuthStack',
              children: [
                {
                  component: {
                    name: 'HomeScreen',
                  },
                },
              ],
            },
          },
          left: {
            component: {
              name: 'AccountScreen',
            },
          },
        },
      },
    });
  }, // OR
  BottomTabs: () => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'HomeScreen',
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'AccountScreen',
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    });
  },
  Unauth: () => {
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
