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
import {createStackNavigator} from 'react-navigation'
import {Provider} from 'react-native-paper'

import AppBottomNav from './components/AppBottomNav'
import EarnScreen from './components/EarnScreen'
import SpendScreen from './components/SpendScreen'

export default class App extends Component {
  render(){
    return (
      <Provider>
        <View style={{flex:1}}>
          <AppStackNav/>
        </View>
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