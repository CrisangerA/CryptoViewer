import React from 'react';
import {Navigation} from '@imports/react-native-navigation';
// Providers
import WrapApp from './App';
// Screens
import {NavigationTypes, Screens} from './src/config/navigation';
import {LogBox} from 'react-native';

// Launch App
class ReactApp {
  constructor() {
    this.NavigationConfig();
    this.NavigationScreens();
  }
  NavigationScreens() {
    Object.values(Screens).map(({name, Component}) =>
      Navigation.registerComponent(
        name,
        () => props =>
          (
            <WrapApp {...props}>
              <Component {...props} />
            </WrapApp>
          ),
        () => Component,
      ),
    );
  }
  NavigationConfig() {
    Navigation.setDefaultOptions({
      topBar: {
        visible: false,
      },
      statusBar: {
        //backgroundColor: 'transparent',
      },
      animations: {
        push: {
          content: {
            enter: {
              translationX: {
                from: require('react-native').Dimensions.get('window').width,
                to: 0,
                duration: 500,
                interpolation: {
                  type: 'decelerateAccelerate',
                },
              },
            },
          },
        },
        pop: {
          content: {
            exit: {
              translationX: {
                from: 0,
                to: require('react-native').Dimensions.get('window').width,
                duration: 500,
                interpolation: {
                  type: 'spring',
                },
              },
            },
          },
        },
      },
      bottomTabs: {
        //visible: false,
      },
      hardwareBackButton: {
        popStackOnPress: false,
      },
      modalPresentationStyle: 'overCurrentContext',
      layout: {
        backgroundColor: 'transparent',
      },
    });
  }
  Start() {
    LogBox.ignoreAllLogs();
    Navigation.events().registerAppLaunchedListener(() => {
      NavigationTypes.Main();
    });
  }
}

new ReactApp().Start();
