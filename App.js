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
  ActivityIndicator
  } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import { Provider as NPProvider } from 'react-native-paper'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import AppBottomNav from './components/AppBottomNav'
import EarnScreen from './components/EarnScreen'
import SpendScreen from './components/SpendScreen'

import {store,persistor} from './components/store.js'

export default class App extends Component {
  renderLoading = () => {
    <View >
      <ActivityIndicator size="large"/>
    </View>
  };

  render(){
    return (
      <Provider store = { store }>
        <PersistGate loading={this.renderLoading} persistor={persistor}>
          <NPProvider>
            <View style={{flex:1}}>
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
      header: null      
    }
  },
  Earn: {
    screen: EarnScreen,
    navigationOptions: {
      headerTransparent: true,   
    }
  },
  Spend: {
    screen: SpendScreen,
    navigationOptions: {
      headerTransparent: true,
    }
  },
})