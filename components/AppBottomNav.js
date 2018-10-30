import React, {Component} from 'react';
import {
  View
  } from 'react-native';
import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FAB, Button } from 'react-native-paper';

import HomeScreen from './HomeScreen'
import StatusScreen from './StatusScreen'
import HistoryScreen from './HistoryScreen'
import styles from './Style'

export default class AppBottomNav extends Component{
    constructor(props){
      super(props)
      this.state = {
          text: '',
          open: false
      };
    }

    render(){
        return (
            <View style={{flex:1}}>
                <BottomNav/>
                <FAB.Group
                    style={styles.fab} 
                    open={this.state.open}
                    icon={this.state.open ? 'today' : 'add'}
                    actions={[
                    { icon: 'update', label: 'Earn', onPress: () => this.props.navigation.navigate('Earn') },
                    { icon: 'add', label: 'Spend', onPress: () => this.props.navigation.navigate('Spend')},
                    ]}
                    onStateChange={({ open }) => this.setState({ open })}
                />
            </View>
        )
    }
}

const BottomNav = createMaterialBottomTabNavigator({
    Home: {
      screen:HomeScreen,
      navigationOptions:{
        tabBarLabel: 'Home',
        tabBarIcon:({tintColor}) =>(
          <Icon name='home' color={tintColor} size={24}/>
        )
      }
    },
    Status:{
      screen:StatusScreen,
      navigationOptions:{
        tabBarLabel: 'Status',
        tabBarIcon:({tintColor}) =>(
          <Icon name='bar-chart' color={tintColor} size={24}/>
        )
      }
    },
    History:{
      screen:HistoryScreen,
      navigationOptions:{
        tabBarLabel: 'History',
        tabBarIcon:({tintColor}) =>(
          <Icon name='history' color={tintColor} size={24}/>
        )
      }
    }
  },{
    initialRouteName: 'Home',
    activeTintColor: 'orange',
    shifting:true
  }
)