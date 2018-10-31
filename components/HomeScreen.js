import React, {Component} from 'react';

import { 
    Text, 
    View,
    FlatList,
    ScrollView,
    Platform,
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
        this.state = {
            amount: 1230.75,
            spent: 315.25,
            spentToday: [
                {key: 'Fare', amount: -60.00},
                {key: 'Food', amount: -95.00},
                {key: 'Supplies', amount: -120.00},
                {key: 'Hobby', amount: -30.00},
                {key: 'Lost', amount: -10.25},
            ],
            historyToday: [
                {key:'8', reason: 'Fare', amount: -30.00},
                {key:'7', reason: 'Lost', amount: -10.25},
                {key:'6', reason: 'Hobby', amount: -30.00},
                {key:'5', reason: 'Earned', amount: 30.00},
                {key:'4', reason: 'Supplies', amount: -120.00},
                {key:'3', reason: 'Food', amount: -95.00},
                {key:'2', reason: 'Fare', amount: -30.00},
                {key:'1', reason: 'Allowance', amount: 1000.00},
            ] 

        };
    }
    
    pesoString=(whole,part)=>{
        sentimo = (whole*100)%100;
        peso = whole;
        pesoStr = '';
        sentimoStr = '';
        if(whole < 0){
            peso = -peso;
            pesoStr = '-';
            sentimoStr = '-';
            sentimo= sentimo * -1;
        }
        peso = Math.floor(peso / 1);
        sentimo = Math.floor(sentimo / 1) + part;
        if(sentimo >= 100){
            peso = peso + Math.floor(sentimo/100);
            sentimo = sentimo % 100;
        }
        pesoStr = pesoStr + '₱' + peso + ".";
        sentimoStr = sentimoStr + sentimo + '¢';
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

        return (
            <View style={{flex:1}}>
                {/*Header*/}
                <View style={[{flexDirection: 'column'}, Platform.select({
                    ios:{
                        height: 64,
                    },
                    android:{
                        height: 56,
                    }
                })]}>
                    <AppNoLeftHeader route={this.props.navigation.state.routeName} />
                </View>
                {/*Content*/}
                <ScrollView style={[styles.background,{flex:1}]}>
                    <View style={[styles.background,{flexDirection:'row', flex:1}]}>
                        <View style={[styles.container,{flex:1,marginRight:5,marginBottom:5}]}>
                            <Text style={[styles.welcome,{marginBottom:0}]}>Current Money</Text>
                            <Text style={[styles.moneyDisplay,this.state.amount < 0 ? styles.moneySpent:styles.moneyEarned,{marginTop:5}]}>{this.pesoString(this.state.amount,0)}</Text>
                        </View>
                        <View style={[styles.container,{flex:1,marginLeft:5,marginBottom:5}]}>
                            <Text style={[styles.welcome,{marginBottom:0}]}>Spent Today</Text>
                            <Text style={[styles.moneyDisplay,this.state.spent > 0 ? styles.moneySpent:styles.moneyEarned,{marginTop:5}]}>{this.pesoString(this.state.spent,0)}</Text>
                        </View>
                    </View>
                    <View style={[styles.container, {flex:2,marginTop:5,marginBottom:5}]}>
                        <Text style={styles.welcome}>Cumulative Spending Today</Text>
                        <FlatList
                            data={this.state.spentToday}
                            renderItem={({item}) => <Text style={styles.listItems}>{item.key}: <Text style={item.amount < 0 ? styles.moneySpent:styles.moneyEarned}>{this.pesoString(item.amount,0)}</Text></Text>}
                        />
                    </View>
                    <View style={[styles.container, {flex:3,marginTop:5}]}>
                        <Text style={styles.welcome}>Spending Today History</Text>
                        <FlatList
                            data={this.state.historyToday}
                            renderItem={({item}) => <Text style={styles.listItems}>{item.reason}:{"\t"}<Text style={item.amount < 0 ? styles.moneySpent:styles.moneyEarned}>{this.pesoString(item.amount,0)}</Text></Text>}
                        />
                    </View>
                    {/*  */}
                </ScrollView>
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
