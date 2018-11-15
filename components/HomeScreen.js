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

import { addRecord } from './RecordsReducer.js';
import styles from './Style.js';
import AppNoLeftHeader from './AppNoLeftHeader.js';
import { store } from './store.js'
import { Button } from 'react-native-paper';

class HomeScreen extends Component<Props> {
    constructor(props){
        super(props);

        if(store.data_records == null){
            net = 714.75;
            moneySpent = 315.25;
            items = [
                {
                    details: "Go Home",
                    category: "Transportation",
                    cost: 30.00,
                    inout: "Spend",
                    time: new Date().toLocaleTimeString(),
                    key:'7'
                },
                {
                    details: "Stolen",
                    category: "Lost",
                    cost: 10.25,
                    inout: "Spend",
                    time: new Date().toLocaleTimeString(),
                    key:'6'
                },
                {
                    details: "Art Stuff",
                    category: "Others",
                    cost: 150.00,
                    inout: "Spend",
                    time: new Date().toLocaleTimeString(),
                    key:'5'
                },
                {
                    details: "Part Time Work",
                    category: "Salary",
                    cost: 30.00,
                    inout: "Earn",
                    time: new Date().toLocaleTimeString(),
                    key:'4'
                },
                {
                    details: "Lunch",
                    category: "Food & Drinks",
                    cost: 95.00,
                    inout: "Spend",
                    time: new Date().toLocaleTimeString(),
                    key:'3'
                },
                {
                    details: "Go To Work",
                    category: "Transportation",
                    cost: 30.00,
                    inout: "Spend",
                    time: new Date().toLocaleTimeString(),
                    key:'2'
                },
                {
                    details: "Some Money From Dad",
                    category: "Allowance",
                    cost: 1000.00,
                    inout: "Earn",
                    time: new Date().toLocaleTimeString(),
                    key:'1'
                },
            ];
        }
        else if(store.data_records.length == 0){
            net = 0.00;
            moneySpent = 0.00;
            items = [];
        }
        else{
            net = store.data_records[0].net;
            if(store.data_records.date == new Date()){
                moneySpent = store.data_records[0].total_spent;
                items = store.data_records[0].items;
            }
            else{
                moneySpent = 0.00;
                items = [];
            }
        }

        spendCategories = ["Food & Drinks", "Bills", "Transportation", "Grocery", "Shopping/Entertainment", "Maintenance/Repair", "Health/Medication", "Lost", "Others"];
        spendingRecord =[];

        for(x = 0; x < spendCategories.length; x++){
            spendingRecord.push({
                key: '' + x,
                category: spendCategories[x],
                cost: 0,
            })
        }

        for(x = 0; x < items.length; x++){
            for(c = 0; c < spendingRecord.length; c++){
                if(spendingRecord[c].category === items[x].category)
                    spendingRecord[c].cost = spendingRecord[c].cost + items[x].cost;
            }
        }

        this.state = {
            amount: net,
            spent: moneySpent,
            spentToday: spendingRecord,
            historyToday: items,
        };
    }
    
    pesoString=(money,inout)=>{
        absValMoney = money;
        if(money < 0)
            absValMoney = -money;
        sentimo = Math.floor(absValMoney * 100) % 100;
        peso = Math.floor(absValMoney);
        pesoStr = '';
        sentimoStr = '';
        if(inout === "Spend" && money != 0){
            pesoStr = '-';
            sentimoStr = '-';
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
                    <View style={[styles.background,{flexDirection:'column', flex:1}]}>
                        <View style={[styles.homeContainer,{flex:1}]}>
                            <Text style={[styles.welcome,{}]}>Current Money</Text>
                            <Text style={[styles.moneyDisplay,
                                this.state.amount < 0 ? styles.moneySpent:styles.moneyEarned,{marginTop:0}]}>{this.pesoString(this.state.amount,"Earn")}</Text>
                        </View>
                        <View style={[styles.homeContainer,{flex:1}]}>
                            <Text style={[styles.welcome,{}]}>Spent Today</Text>
                            <Text style={[styles.moneyDisplay,this.state.spent > 0 ? styles.moneySpent:styles.moneyEarned,{marginTop:0}]}>{this.pesoString(this.state.spent,"Spend")}</Text>
                        </View>
                    </View>
                    <View style={[styles.homeContainer, {flex:2}]}>
                        <Text style={styles.welcome}>Cumulative Spending Today</Text>
                        <FlatList
                            data={this.state.spentToday}
                            renderItem={({item}) => <Text style={styles.listItems}>{item.category}: <Text style={item.cost > 0 ? styles.moneySpent:styles.moneyEarned}>{this.pesoString(item.cost,"Spend")}</Text></Text>}
                        />
                    </View>
                    <View style={[styles.homeContainer, {flex:3}]}>
                        <Text style={styles.welcome}>Spending Today History</Text>
                        <FlatList
                            data={this.state.historyToday}
                            renderItem={({item}) => <Text style={styles.listItems}>{item.category}: <Text style={item.inout === "Spend" ? styles.moneySpent:styles.moneyEarned}>{this.pesoString(item.cost,item.inout)}</Text></Text>}
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
