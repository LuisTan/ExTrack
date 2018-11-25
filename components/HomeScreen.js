import React, {Component} from 'react';

import { 
    Text, 
    View,
    FlatList,
    ScrollView,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addRecord } from './RecordsReducer.js';
import styles from './Style.js';
import AppNoLeftHeader from './AppNoLeftHeader.js';
import { pesoString } from './ExTrackParsers.js';
import HistoryItem from './HistoryItem.js';

class HomeScreen extends Component {
    constructor(props){
        super(props);

        currdate = new Date();
        currdateString = currdate.toLocaleDateString();
        if(this.props.records.data_records.length <= 0)
            mydate = new Date();
        else
            mydate = new Date(this.props.records.data_records[0].date);
        mydateString = mydate.toLocaleDateString();
        if(currdateString == mydateString){
            if(this.props.records.data_records.length <= 0){
                moneySpent = 0;
                items = [];
            }
            else{
                moneySpent = this.props.records.data_records[0].total_spent;
                items = this.props.records.data_records[0].items;
            }
        }
        else{
            moneySpent = 0.00;
            items = [];
        }
        
        spendCategories = ["Food & Drinks", "Bills", "Transportation", "Grocery", "Shopping/Entertainment", "Maintenance/Repair", "Health/Medication", "Lost", "Others"];
        spendingRecord = [];

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
                }
            }
        }

        this.state = {
            amount: this.props.records.statistical_data.current,
            spent: moneySpent,
            spentToday: spendingRecord,
            historyToday: items,
            refreshing: false,
        };
    }

    update=()=>{
        currdate = new Date();
        currdateString = currdate.toLocaleDateString();
        mydate = new Date(this.props.records.data_records[0].date);
        mydateString = mydate.toLocaleDateString();
        if(currdateString == mydateString){
            moneySpent = this.props.records.data_records[0].total_spent;
            items = this.props.records.data_records[0].items;
        }
        else{
            moneySpent = 0.00;
            items = [];
        }
        
        spendCategories = ["Food & Drinks", "Bills", "Transportation", "Grocery", "Shopping/Entertainment", "Maintenance/Repair", "Health/Medication", "Lost", "Others"];
        spendingRecord = [];

        for(x = 0; x < spendCategories.length; x++){
            spendingRecord.push({
                category: spendCategories[x],
                cost: 0,
            })
        }

        this.setState({
            amount: this.props.records.statistical_data.current,
            spent: moneySpent,
            spentToday: spendingRecord,
            historyToday: items,
            refreshing: false
        })
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
                        width:'70%'
                    }}>
                    <Text style={[styles.listItems,{flex:1}]}>
                        {item.category}
                    </Text>
                </View>
                <View style={{alignItems:'flex-end',width:'30%'}}>
                    <Text
                        style={
                            [
                                styles.listItems,item.cost > 0 ? styles.moneySpent:styles.moneyEarned,
                                {flex:1}
                            ]
                        }>
                        {pesoString(item.cost,"Spend")}
                    </Text>
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
                <ScrollView 
                    style={[styles.background,{flex:1}]}>
                    <View style={[styles.homeContainer,{flex:1}]}>
                        <Text style={[styles.welcome,{}]}>Current Money</Text>
                        <Text style={[styles.moneyDisplay,
                            this.state.amount <= 0 ? styles.moneySpent:styles.moneyEarned,{}]}>{pesoString(this.state.amount,"Earn")}</Text>
                    </View>
                    <View style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 2,
                        }}/>
                    <View style={[styles.homeContainer,{flex:1}]}>
                        <Text style={[styles.welcome,{}]}>Spent Today</Text>
                        <Text style={[styles.moneyDisplay,this.state.spent > 0 ? styles.moneySpent:styles.moneyEarned,{marginTop:0}]}>{pesoString(this.state.spent,"Spend")}</Text>
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
                            renderItem={({item}) => <HistoryItem item={item}/>}
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
