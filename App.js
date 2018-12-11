/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  StatusBar
  } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import { Provider as NPProvider } from 'react-native-paper'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from 'react-native-splash-screen'

import AppBottomNav from './components/AppBottomNav'
import EarnScreen from './components/EarnScreen'
import SpendScreen from './components/SpendScreen'

import {store,persistor} from './components/store.js'

export default class App extends Component {

  componentDidMount(){
    SplashScreen.hide();
  }

  render(){
    return (
      <Provider store = { store }>
        <PersistGate persistor={persistor}>
          <NPProvider>
            <View style={{flex:1}}>
              <StatusBar
                backgroundColor="#083A3E"
                barStyle="light-content"
              />
              <AppStackNav/>
            </View>
          </NPProvider>
        </PersistGate>
      </Provider>
    )
  }
}


const AppStackNav = createStackNavigator({
  AppBottomNav: {
    screen: AppBottomNav,
    navigationOptions: {
      headerTintColor: '#97c8eb',
      header: null      
    }
  },
  Earn: {
    screen: EarnScreen,
    navigationOptions: {
      headerTintColor: '#97c8eb',
      headerTransparent: true,   
    }
  },
  Spend: {
    screen: SpendScreen,
    navigationOptions: {
      headerTintColor: '#97c8eb',
      headerTransparent: true,
    }
  },
})