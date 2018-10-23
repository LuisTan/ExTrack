/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Alert, 
  Platform, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  KeyboardAvoidingView, 
  Button
  } from 'react-native';
import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import {createStackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
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