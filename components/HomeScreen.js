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

        if(this.props.records.data_records == null){
            net = 714.75;
            // moneySpent = 315.25;
            items = [
                {
                    details: "Go Home",
                    category: "Transportation",
                    cost: 30.00,
                    inout: "Spend",
                    time: new Date().toLocaleTimeString(),
                },
                {
                    details: "Stolen",
                    category: "Lost",
                    cost: 10.25,
                    inout: "Spend",
                    time: new Date().toLocaleTimeString(),
                },
                {
                    details: "Art Stuff",
                    category: "Others",
                    cost: 150.00,
                    inout: "Spend",
                    time: new Date().toLocaleTimeString(),
                },
                {
                    details: "Part Time Work",
                    category: "Salary",
                    cost: 30.00,
                    inout: "Earn",
                    time: new Date().toLocaleTimeString(),
                },
                {
                    details: "Lunch",
                    category: "Food & Drinks",
                    cost: 95.00,
                    inout: "Spend",
                    time: new Date().toLocaleTimeString(),
                },
                {
                    details: "Go To Work",
                    category: "Transportation",
                    cost: 30.00,
                    inout: "Spend",
                    time: new Date().toLocaleTimeString(),
                },
                {
                    details: "Some Money From Dad",
                    category: "Allowance",
                    cost: 1000.00,
                    inout: "Earn",
                    time: new Date().toLocaleTimeString(),
                },
            ];
        }
        else if(this.props.records.data_records.length == 0){
            net = 0.00;
            // moneySpent = 0.00;
            items = [];
        }
        else{
            net = 0.00;
            for(x = 0; x < this.props.records.data_records.length; x++){
                for(y = 0; y < this.props.records.data_records[x].items.length; y++){
                    if(this.props.records.data_records[x].items[y].inout == "earn"){
                        net = net + this.props.records.data_records[x].items[y].cost;
                    }
                    else
                        net = net - this.props.records.data_records[x].items[y].cost;
                }
            }
            currdate = new Date();
            currdateString = currdate.toDateString();
            mydate = new Date(this.props.records.data_records[0].date);
            mydateString = mydate.toDateString();
            if(currdateString == mydateString){
                // moneySpent = this.props.records.data_records[0].total_spent;
                items = this.props.records.data_records[0].items;
            }
            else{
                // moneySpent = 0.00;
                items = [];
            }
        }

        moneySpent = 0.00;
        spendCategories = ["Food & Drinks", "Bills", "Transportation", "Grocery", "Shopping/Entertainment", "Maintenance/Repair", "Health/Medication", "Lost", "Others"];
        spendingRecord =[];

        for(x = 0; x < spendCategories.length; x++){
            spendingRecord.push({
                category: spendCategories[x],
                cost: 0,
            })
        }

        for(x = 0; x < items.length; x++){
            for(c = 0; c < spendingRecord.length; c++){
                if(spendingRecord[c].category === items[x].category){
                    spendingRecord[c].cost = spendingRecord[c].cost + items[x].cost;
                    moneySpent = moneySpent + items[x].cost;
                }
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
    
    renderSpentItem=(item)=>{
        return(
            <View style={
                [
                    styles.homeContainer,
                    {
                        flexDirection:'row',
                        marginTop:0,
                        flex:1,
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }
                ]}>
                <View style={
                    {
                        alignItems:'flex-start',
                        width:'50%'
                    }}>
                    <Text style={[styles.listItems,{flex:1}]}>
                        {item.category}
                    </Text>
                </View>
                <View style={{alignItems:'flex-end', verticalAlign:'middle', width:'50%'}}>
                    <Text
                        style={
                            [
                                styles.listItems,item.cost > 0 ? styles.moneySpent:styles.moneyEarned,
                                {flex:1}
                            ]
                        }>
                        {this.pesoString(item.cost,"Spend")}
                    </Text>
                </View>
            </View>
        );
    }

    renderHistoryItem=(item)=>{
        return(
            <View style={[styles.background,{flex:1}]}>
                <View style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}/>
                <View style={[styles.homeContainer,{flexDirection:'row',flex:1,marginTop:1}]}>
                    <View style={{alignItems:'flex-start', width:'50%'}}>
                        <Text style={[styles.listItems,{flex:1}]}>
                            {item.details}
                        </Text>
                    </View>
                    <View style={{alignItems:'flex-end', width:'50%'}}>
                        <Text style={[styles.listItems,{flex:1}]}>
                            {item.time}
                        </Text>
                    </View>
                </View>
                <View style={[styles.homeContainer,{flexDirection:'row',flex:2}]}>
                    <View style={{alignItems:'flex-start', width:'50%'}}>
                        <Text style={[styles.listItems,{flex:1}]}>
                            {item.category}
                        </Text>
                    </View>
                    <View style={{alignItems:'flex-end', width:'50%'}}>
                        <Text
                            style={
                                [
                                    styles.listItems,
                                    item.inout === 'Spend' ? styles.moneySpent:styles.moneyEarned,
                                    {flex:1}
                                ]
                                }>
                            {this.pesoString(item.cost,item.inout)}
                        </Text>
                    </View>
                </View>
            </View>
        );
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
                    <View style={[styles.homeContainer,{flex:1}]}>
                        <Text style={[styles.welcome,{}]}>Current Money</Text>
                        <Text style={[styles.moneyDisplay,
                            this.state.amount <= 0 ? styles.moneySpent:styles.moneyEarned,{}]}>{this.pesoString(this.state.amount,"Earn")}</Text>
                    </View>
                    <View style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 2,
                        }}/>
                    <View style={[styles.homeContainer,{flex:1}]}>
                        <Text style={[styles.welcome,{}]}>Spent Today</Text>
                        <Text style={[styles.moneyDisplay,this.state.spent > 0 ? styles.moneySpent:styles.moneyEarned,{marginTop:0}]}>{this.pesoString(this.state.spent,"Spend")}</Text>
                    </View>
                    <View style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 2,
                        }}/>
                    <View style={
                        [
                            styles.homeContainer,
                            {
                                flex:4,
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                            }
                        ]}>
                        <Text style={styles.welcome}>Cumulative Spending Today</Text>
                    </View>
                    <FlatList
                            data={this.state.spentToday}
                            keyExtractor={(item)=>item.category}
                            renderItem={({item}) => this.renderSpentItem(item)}
                        />
                    <View style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 2,
                        }}/>
                    <View style={[styles.homeContainer, {flex:4}]}>
                        <Text style={styles.welcome}>Spending Today History</Text>
                    </View>
                    <FlatList
                            data={this.state.historyToday}
                            keyExtractor={(item,index)=>item.category + index}
                            renderItem={({item}) => this.renderHistoryItem(item)}
                        />
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
