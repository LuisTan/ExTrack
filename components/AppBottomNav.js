import React, {Component} from 'react';
import {
  View
  } from 'react-native';
import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FAB, Button } from 'react-native-paper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {  addRecord } from './RecordsReducer.js';
import HomeScreen from './HomeScreen'
import StatusScreen from './StatusScreen'
import HistoryScreen from './HistoryScreen'
import styles from './Style'

class AppBottomNav extends Component{
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
        tabBarColor: 'green',
        tabBarLabel: 'Home',
        tabBarIcon:({tintColor}) =>(
          <Icon name='home' color={tintColor} size={24}/>
        )
      }
    },
    Status:{
      screen:StatusScreen,
      navigationOptions:{
        tabBarColor: 'blue',
        tabBarLabel: 'Status',
        tabBarIcon:({tintColor}) =>(
          <Icon name='bar-chart' color={tintColor} size={24}/>
        )
      }
    },
    History:{
      screen:HistoryScreen,
      navigationOptions:{
        tabBarColor: 'red',
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

const mapStatetoProps = (state) => {
  const { records } = state
  return { records }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addRecord,
  }, dispatch)
);

export default connect(mapStatetoProps, mapDispatchToProps)(AppBottomNav)