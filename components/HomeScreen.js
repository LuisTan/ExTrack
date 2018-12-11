import React, { Component } from 'react';

import {
    Text,
    View,
    FlatList,
    ScrollView,
    Platform,
    SectionList,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';
import Modal from "react-native-modal";
import { Dimensions } from 'react-native'

import { addRecord, removeRecord } from './RecordsReducer.js';
import styles from './Style.js';
import AppNoLeftHeader from './AppNoLeftHeader.js';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            isModalVisible: false,
            removeDate: null,
            removeTime: null
        };
    }

    componentDidMount(){
        alert(JSON.stringify(this.props.records))
    }

    getCurrent = () => {
        return this.props.records.statistical_data.current;
    }

    getSpent = () => {
        var date = moment();
        if (this.props.records.data_records.length == 0
            || moment(this.props.records.data_records[0].date).format("MM-DD-YYYY") != date.format("MM-DD-YYYY"))
            return 0;
        else
            return this.props.records.data_records[0].total_spent;
    }

    getHistoryItems = () => {
        date = moment();
        if (this.props.records.data_records.length == 0
            || moment(this.props.records.data_records[0].date).format("MM-DD-YYYY") != date.format("MM-DD-YYYY"))
            return [];
        else {
            return this.props.records.data_records[0].items;
        }
    }

    getSpendRecords=()=>{
        spendingRecord = [];
        items = this.getHistoryItems();
        for(x = 0; x < items.length; x++){
            item = items[x];
            if(item.inout != 'Earn'){
                indx = -1;
                if(spendingRecord.length > 0)
                    indx = spendingRecord.findIndex(rec => rec.category == item.category);            
                if(indx >= 0)
                    spendingRecord[indx].cost += item.cost;
                else
                    spendingRecord.push({
                        category: item.category,
                        cost: item.cost,
                    });
            }
        }
        return spendingRecord;
    }

    getItemSections = () => {
        sectioning = [];
        for (x = 0; x < this.props.records.data_records.length; x++) {
            date = moment(this.props.records.data_records[x].date)
            sectioning.push({
                date: date,
                title: date.format("ddd MMM DD, YYYY"),
                data: this.props.records.data_records[x].items,
            })
        }
        chosendate = moment();
        return sectioning.filter(section => section.date.format("MM-DD-YYYY") == chosendate.format("MM-DD-YYYY"));
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

    renderSpentItem = (item) => {
        return (
            <View style={
                [
                    styles.homeContainer,
                    styles.historyItemRow,
                    {
                        marginTop: 0,
                        flex: 1,
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        flexWrap: "nowrap"
                    }
                ]}>
                <View style={
                    {
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        flexBasis: '60%'
                    }}>
                    <Text style={[
                        styles.listItems,
                        styles.spentItem,
                        {
                            flex: 1,
                            flexGrow: 5
                        }]}>
                        {item.category}
                    </Text>
                </View>
                <View style={{ alignItems: 'flex-end', flexBasis: '40%', flexWrap: 'nowrap' }}>
                    <Text
                        style={[
                            styles.listItems,
                            styles.spentItem,
                            item.cost > 0 ? styles.moneySpent : styles.moneyEarned,
                            { flex: 1 }
                        ]}>
                        {this.pesoString(item.cost, "Spend")}
                    </Text>
                </View>
            </View>
        );
    }

    _toggleModal = (item) => {
        this.setState({ removeTime: item.time, removeDate: this.props.records.data_records[0].date })
    }

    renderHistoryItem = (item) => {

        var swipeoutBtns = [
            {
                text: 'Delete',
                backgroundColor: '#E63535',
                onPress: () => {
                    this.setState({ isModalVisible: true })
                    this._toggleModal(item)
                }
            }
        ]
        return (
            <Swipeout left={swipeoutBtns} right={swipeoutBtns}>
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
            </Swipeout>
        );
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                {/*Header*/}
                <View style={[{ flexDirection: 'column' }, Platform.select({
                    ios: {
                        height: 64,
                    },
                    android: {
                        height: 56,
                    }
                })]}>
                    <AppNoLeftHeader route={this.props.navigation.state.routeName} />
                </View>

                {/*Content*/}

                <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isModalVisible: false })} >
                    <View style={[styles.modalContent]}>
                        <Text style={{ fontSize: 15, marginBottom: 20 }}>Are you sure you want to delete this record?</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginRight: 10, backgroundColor: '#DADADA', padding: 10 }} onPress={() => this.setState({ isModalVisible: false })}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 10, backgroundColor: '#E63535', padding: 10 }}
                                onPress={() => {
                                    this.props.removeRecord(this.state.removeDate, this.state.removeTime);
                                    this.setState({ isModalVisible: false });
                                }}
                            >
                                <Text style={{ color: '#ffffff' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <ScrollView
                    style={[styles.background, { flex: 1 }]}>
                    <View style={[styles.homeContainer, { flex: 1 }]}>
                        <Text style={[styles.welcome, { marginBottom: 0 }]}>Current Money</Text>
                        <Text style={[styles.moneyDisplay,
                        this.getCurrent() <= 0 ? styles.moneySpent : styles.moneyEarned,
                        { marginTop: 0 }]}>{this.pesoString(this.getCurrent(), "Earn")}</Text>
                    </View>
                    <View style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                    }} />
                    <View style={[styles.homeContainer, { flex: 1 }]}>
                        <Text style={[styles.welcome, { marginBottom: 0 }]}>Spent Today</Text>
                        <Text style={[
                            styles.moneyDisplay,
                            this.getSpent() > 0 ? styles.moneySpent : styles.moneyEarned,
                            { marginTop: 0 }
                        ]}>
                            {this.pesoString(this.getSpent(), "Spend")}
                        </Text>
                    </View>
                    <View style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                    }} />
                    <FlatList
                        data={this.getSpendRecords()}
                        keyExtractor={(item) => item.category}
                        renderItem={({ item }) => this.renderSpentItem(item)}
                        ListHeaderComponent={
                            <View style={
                                [
                                    styles.homeContainer,
                                    {
                                        backgroundColor: "#3aafb9",
                                    }
                                ]}>
                                <Text style={[styles.welcome, { color: "white" }]}>Cumulative Spending Today</Text>
                            </View>}
                    />
                    <View style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                    }} />
                    <SectionList
                        sections={this.getItemSections()}
                        keyExtractor={(item, index) => item + index}
                        ListHeaderComponent={
                            <View style={
                                [
                                    styles.homeContainer,
                                    {
                                        backgroundColor: "#3aafb9",
                                    }
                                ]}>
                                <Text style={[styles.welcome, { color: "white" }]}>Transaction History Today</Text>
                            </View>
                        }
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={
                                [{
                                    backgroundColor: "#97c8eb",
                                }]
                            }>
                                <Text style={[styles.welcome, { fontWeight: "bold" }]}>{title}</Text>
                            </View>
                        )}
                        renderItem={({ item }) => this.renderHistoryItem(item)}
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
        removeRecord
    }, dispatch)
);

export default connect(mapStatetoProps, mapDispatchToProps)(HomeScreen)
