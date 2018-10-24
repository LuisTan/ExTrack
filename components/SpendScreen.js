import React, {Component} from 'react';

import {
    Text, 
    View
} from 'react-native';

import styles from './Style.js'
import AppHeader from './AppHeader.js';


export default class StatusScreen extends Component<Props> {
    constructor(props){
      super(props)
      this.state = {text: ''};
    }
    render() {

      return (
        <View style={{flex:1}}>
          {/*Header*/}
          <View style={{flex:1}}>
            <AppHeader route={this.props.navigation.state.routeName} />
          </View>
          {/*Content*/}
          <View  style={[styles.background,{flex:9}]}>
            <View style={[styles.container, {flex:1}]}>
              <Text style={styles.welcome}>Spend Screen</Text>
            </View>
          </View>
        </View>
      );
    }
}
