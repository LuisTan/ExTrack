import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FAB, Portal } from 'react-native-paper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';


import { addRecord, addDate } from './RecordsReducer.js';
import HomeScreen from './HomeScreen'
import StatusScreen from './StatusScreen'
import HistoryScreen from './HistoryScreen'
import styles from './Style'

class AppBottomNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      open: false
    };
  }

  componentDidMount() {
    this.props.addDate()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BottomNav />
        <FAB.Group
          style={styles.fab}
          color={"#093A3E"}
          open={this.state.open}
          icon={this.state.open ? 'money-off' : 'monetization-on'}
          actions={[
            { icon: 'add', color: "#093A3E", label: 'Earn', onPress: () => this.props.navigation.navigate('Earn') },
            { icon: 'remove', color: "#093A3E", label: 'Spend', onPress: () => this.props.navigation.navigate('Spend') },
          ]}
          onStateChange={({ open }) => this.setState({ open })}
        />
      </View>
    )
  }
}

const BottomNav = createMaterialBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='home' color={tintColor} size={24} />
      )
    }
  },
  Status: {
    screen: StatusScreen,
    navigationOptions: {
      tabBarLabel: 'Status',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='bar-chart' color={tintColor} size={24} />
      )
    }
  },
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='history' color={tintColor} size={24} />
      )
    }
  }
}, {
    initialRouteName: 'Home',
    activeTintColor: '#97c8eb',
    shifting: true,
    barStyle: {
      backgroundColor: '#093A3E'
    }
  }
)

const mapStatetoProps = (state) => {
  const { records } = state
  return { records }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addRecord,
    addDate,
  }, dispatch)
);

export default connect(mapStatetoProps, mapDispatchToProps)(AppBottomNav)