import React, {Component} from 'react';

import { 
    Text, 
    View,
    FlatList
} from 'react-native';

import styles from './Style.js';
import AppNoLeftHeader from './AppNoLeftHeader.js';

export default class HomeScreen extends Component<Props> {
    constructor(props){
      super(props)
      this.state = {
          text: '' ,
          peso: 0,
          sentimo: 0,
          historyToday: [
                        {key: 'Fare'},
                        {key: 'Food'},
                        {key: 'Supplies'},
                        {key: 'Food'},
                        {key: 'Hobby'},
                        {key: 'Dropped'},
                        {key: 'Fare'},
                        {key: 'Tithe'},
                        ]
      };
    }
    
    pesoString(whole,part){
        sentimo = whole % 1;
        peso = Math.floor(whole / 1);
        sentimo = Math.floor(sentimo / 1) + part;
        if(sentimo >= 100){
            peso = peso + Math.floor(sentimo/100);
            sentimo = sentimo % 100;
        }
        pesoStr = '₱' + peso + ".";
        sentimoStr = sentimo + '¢'
        if(sentimo > 0){
            if(peso == 0){
                return sentimoStr;
            }
            if(sentimo < 10){
                pesoStr = pesoStr + "0" + sentimo;
                return pesoStr;
            }
            else{
                pesoStr = pesoStr + sentimo;
            }
        }
        else{
            pesoStr = pesoStr + "00";
        }
        return pesoStr;
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
              <Text style={styles.welcome}>{this.pesoString(this.state.peso,this.state.sentimo)}</Text>
            </View>
            <View style={[styles.container, {flex:4}]}>
                <Text style={styles.welcome}>List of Events Today</Text>
                <FlatList
                    data={this.state.historyToday}
                    renderItem={({item}) => <Text style={{
                        padding: 10,
                        fontSize: 18,
                        height: 44,
                      }}>{item.key}</Text>}
                />
            </View>
            {/*  */}
          </View>
        </View>
      );
    }
}
