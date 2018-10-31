import React, {Component} from 'react';

import { 
    Text, 
    View,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux'

import styles from './Style.js';
import AppNoLeftHeader from './AppNoLeftHeader.js';
import { Button } from 'react-native-paper';

class HomeScreen extends Component<Props> {
    constructor(props){
      super(props)
      this.state ={
        text: '',
        username: 'test'
      }
    }

    componentDidMount(){
      this.loadData()
    }

    loadData = async () => {
      try{
        let user = await AsyncStorage.getItem('user')
        user = JSON.parse(user).username
        this.setState({username: user})
      } catch (error){
        alert(error)
      }
    }



    render() {
      const {navigate} = () => {
        this.props.navigation('History')
      }

      return (
        <View style={{flex:1}}>
          {/*Header*/}
          <View style={{flex:1}}>
            <AppNoLeftHeader route={this.props.navigation.state.routeName} />
          </View>
          {/*Content*/}
          <View  style={[styles.background,{flex:9}]}>
            <View style={[styles.container, {flex:1}]}>
              <Text style={styles.welcome}>Home Screen</Text>
              <Text style={styles.welcome}>{this.props.navigation.getParam('name','Peter')}</Text>
            </View>
            {/*  */}
          </View>
        </View>
      );
    }
}

const mapStatetoProps = (state) => {
  const { records } = state
  return { records }
}

export default connect(mapStatetoProps)(HomeScreen)
