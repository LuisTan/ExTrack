import React, {Component} from 'react';

import { 
    Text, 
    View,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {  addRecord } from './RecordsReducer.js';
import styles from './Style.js';
import AppNoLeftHeader from './AppNoLeftHeader.js';
import { Button } from 'react-native-paper';

class HomeScreen extends Component<Props> {
    constructor(props){
      super(props)
      this.state ={
        text: '',
      }
    }


    render() {

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

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addRecord,
  }, dispatch)
);

export default connect(mapStatetoProps, mapDispatchToProps)(HomeScreen)
