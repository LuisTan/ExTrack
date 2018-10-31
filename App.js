/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View
  } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import { Provider as NPProvider } from 'react-native-paper'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import recordsReducer from './components/RecordsReducer.js';
import AppBottomNav from './components/AppBottomNav'
import EarnScreen from './components/EarnScreen'
import SpendScreen from './components/SpendScreen'

const store = createStore(recordsReducer)

export default class App extends Component {
  render(){
    return (
      <Provider store = { store }>
        <NPProvider>
          <View style={{flex:1}}>
            <AppStackNav/>
          </View>
        </NPProvider>
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