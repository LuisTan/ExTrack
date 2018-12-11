import React, { Component } from 'react';

import {
    Text,
    View,
    ScrollView,
    SectionList,
    Platform,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { Dimensions } from 'react-native'


import { addRecord } from './RecordsReducer.js';
import styles from './Style.js';
import AppNoLeftHeader from './AppNoLeftHeader.js';
import { Button } from 'react-native-paper';

class HistoryScreen extends Component {
    constructor(props){
      super(props);
      this.state = {
        data_records: this.props.records.data_records,
        date: '',
        todate: '',
        filtering: false,
      };
    }

    getItemSections=()=>{
        sectioning = [];
        for(x = 0; x < this.props.records.data_records.length; x++){
          date = moment(this.props.records.data_records[x].date).set({
            'hour':0,
            'minute': 0,
            'second': 0,
            'millisecond':0
            });
          sectioning.push({
            date: date,
            title: date.format("ddd MMM DD, YYYY"),
            data: this.props.records.data_records[x].items,
          })
        }
        if(this.state.filtering){
            if(this.state.todate)
                toDate = moment(this.state.todate).set({
                    'hour':0,
                    'minute': 0,
                    'second': 0,
                    'millisecond':0
                });
            else
                toDate = moment().set({
                    'hour':0,
                    'minute': 0,
                    'second': 0,
                    'millisecond':0
                });
            if(this.state.date)
                chosendate = moment(this.state.date).set({
                    'hour':0,
                    'minute': 0,
                    'second': 0,
                    'millisecond':0
                });
            else
                chosendate = moment(this.state.data_records[this.state.data_records.length-1].date).set({
                    'hour':0,
                    'minute': 0,
                    'second': 0,
                    'millisecond':0
                });
            return sectioning.filter(section => section.date.diff(chosendate, 'days') >= 0 && section.date.diff(toDate, 'days') <= 0);
        }
        else {
            return sectioning;
        }
    }

    pesoString = (money, inout) => {
        absValMoney = money;
        if (money < 0)
            absValMoney = -money;
        sentimo = Math.floor(absValMoney * 100) % 100;
        peso = Math.floor(absValMoney);
        pesoStr = '';
        sentimoStr = '';
        if (inout === "Spend" && money != 0) {
            pesoStr = '-';
            sentimoStr = '-';
        }
        pesoStr = pesoStr + '₱' + peso + ".";
        sentimoStr = sentimoStr + sentimo + '¢';
        if (sentimo > 0) {
            if (peso == 0) {
                return sentimoStr;
            }
            if (sentimo < 10) {
                pesoStr = pesoStr + "0" + sentimo;
                return pesoStr;
            }
            else {
                pesoStr = pesoStr + sentimo;
            }
        }
        else {
            pesoStr = pesoStr + "00";
        }
        return pesoStr;
    }

    renderHistoryItem = (item) => {
        return (
            <View style={[styles.background, { flex: 1 }]}>
                <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }} />
                <View style={[
                    styles.homeContainer,
                    styles.historyItemRow,
                    { flex: 1, marginTop: 1 }]}>
                    <View style={{ alignItems: 'flex-start', flexBasis: '60%' }}>
                        <Text style={[styles.listItems, styles.historyItemCategory, { flex: 1 }]}>
                            {item.category}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', flexBasis: '40%' }}>
                        <Text style={[styles.listItems, styles.historyItemTime, { flex: 1 }]}>
                            {item.time}
                        </Text>
                    </View>
                </View>
                <View style={[
                    styles.homeContainer,
                    styles.historyItemRow,
                    {
                        flex: 2,
                        width: '100%'
                    }]}>
                    <View style={{ alignItems: 'flex-start', flexBasis: '60%' }}>
                        <Text style={[styles.listItems, styles.historyItemDetail, { flex: 1 }]}>
                            {item.details}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', flexBasis: '40%' }}>
                        <Text
                            style={
                                [
                                    styles.listItems,
                                    styles.historyItemCost,
                                    item.inout === 'Spend' ? styles.moneySpent : styles.moneyEarned,
                                    { flex: 1 }
                                ]
                            }>
                            {this.pesoString(item.cost, item.inout)}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
      return (
        <View style={{flex:1,justifyContent:"center"}}>
            {/*Header*/}
            <View style={[{flexDirection:
            'row'}, Platform.select({
                ios:{
                    height: 64,
                },
                android:{
                    height: 56,
                }
            })]}>
                <AppNoLeftHeader route={this.props.navigation.state.routeName} />
            </View>
            <View style = {[{flexDirection:'row',borderBottomColor:'black',borderBottomWidth:1}]}>
                <DatePicker
                    style={[styles.datepicker,{
                        flex: 1
                    }]}
                    date={this.state.date}
                    mode="date"
                    placeholder="From Date"
                    format="YYYY-MM-DD"
                    minDate={moment(this.state.data_records[this.state.data_records.length-1].date).toDate()}
                    maxDate={moment(this.state.data_records[0].date).toDate()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36,
                        backgroundColor: 'white'

                    }
                // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date)=>{
                        this.setState({
                            date: date,
                            filtering: true,
                        });
                    }}
                />
                <DatePicker
                    style={[styles.datepicker,{
                        flex: 1
                    }]}
                    date={this.state.todate}
                    mode="date"
                    placeholder="To Date"
                    format="YYYY-MM-DD"
                    minDate={moment(this.state.data_records[this.state.data_records.length-1].date).toDate()}
                    maxDate={moment(this.state.data_records[0].date).toDate()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36,
                        backgroundColor: 'white'

                    }
                // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date)=>{
                        this.setState({
                            todate: date,
                            filtering: true,
                        });
                    }}
                />
                <Icon.Button
                    style={
                        {
                            alignItems:'center',
                            justifyContent:"center",
                            margin: 0,
                        }
                    }
                    name="times"
                    backgroundColor="#3aafb9"
                    borderRadius={0}
                    size={36}
                    iconStyle={
                        {
                            alignItems:'flex-end',
                            justifyContent:"center",
                            margin: 0,
                        }
                    }
                    onPress={()=>{
                        if(this.state.filtering){
                            this.setState({
                                filtering: false,
                                date: '',
                                todate: '',
                            });
                        }}
                    />
                    <Icon.Button
                        style={
                            {
                                alignItems: 'center',
                                justifyContent: "center",
                                margin: 0,
                            }
                        }
                        name="times"
                        backgroundColor="#093A3E"
                        borderRadius={0}
                        size={36}
                        iconStyle={
                            {
                                alignItems: 'center',
                                justifyContent: "center",
                                margin: 0,
                            }
                        }
                        onPress={() => {
                            if (this.state.filtering) {
                                this.setState({
                                    filtering: false,
                                    date: '',
                                });
                            }
                            else {
                                Alert.alert("All Dates are Shown");
                            }
                        }}
                    />
                </View>
                {/*Content*/}
                <ScrollView style={[styles.background, { flex: 20 }]}>
                    <SectionList
                        sections={this.getItemSections()}
                        keyExtractor={(item, index) => item + index}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={
                                [{
                                    backgroundColor: "#3aafb9",
                                }]
                            }>
                                <Text style={[styles.welcome, { fontWeight: "bold" }]}>{title}</Text>
                            </View>
                        )}
                        renderItem={({ item }) => this.renderHistoryItem(item)}
                    />
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

export default connect(mapStatetoProps, mapDispatchToProps)(HistoryScreen)
