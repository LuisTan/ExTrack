import React, { Component } from 'react';

import {
  Text,
  View,
  ScrollView,
  Alert
} from 'react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryLine,
  VictoryPie,
  VictoryLabel,
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryZoomContainer
} from "victory-native";
import DatePicker from 'react-native-datepicker'
import PureChart from 'react-native-pure-chart';
import moment from 'moment'
import { Dimensions } from 'react-native'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addRecord } from './RecordsReducer.js';
import styles from './Style.js';
import AppNoLeftHeader from './AppNoLeftHeader.js';


class StatusScreen extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      data_length: '',
      //date_min: 0,
      //date_max: 0
      screen_width: Dimensions.get('window').width,
      screen_height: Dimensions.get('window').height,
      date_min: this.props.records.data_records[this.props.records.data_records.length - 1].date,
      date_max: this.props.records.data_records[0].date
    };
  }

  componentDidMount() {
  }

  checkDate = (date1, date2) => {
    return (date1.substring(0, 10) != date2.substring(0, 10));
  }

  getOverall = (in_out) => {
    let index = this.props.records.data_records.length - 1;
    let cost = 0;

    //No Records
    if (index == -1) {
      return 0;
    }

    //Finding the first element in the range
    while (this.checkDate(this.props.records.data_records[index].date, this.state.date_min)) {
      index -= 1;
    }

    //Calculating the earned in the range and finding the last element in the range
    while (this.checkDate(this.props.records.data_records[index].date, this.state.date_max)) {
      this.props.records.data_records[index].items.forEach(element => {
        if (element.inout == in_out) {
          cost += element.cost;
        }
      });
      index -= 1;
    }

    //For the last element
    this.props.records.data_records[index].items.forEach(element => {
      if (element.inout == in_out) {
        cost += element.cost;
      }
    });

    return cost;
  }

  getAverage = (item) => {
    let index = this.props.records.data_records.length - 1;
    let cost = 0;
    let count = 0;

    //No Records
    if (index == -1) {
      return 0;
    }

    //Finding the first element in the range
    while (this.checkDate(this.props.records.data_records[index].date, this.state.date_min)) {
      index -= 1;
    }

    //Calculating the earned in the range and finding the last element in the range
    while (this.checkDate(this.props.records.data_records[index].date, this.state.date_max)) {
      switch (item) {
        case 'net':
          cost += this.props.records.data_records[index].net
          break;
        case 'total_spent':
          cost += this.props.records.data_records[index].total_spent
          break;
        default:
          break;
      }
      count++;
      index -= 1;
    }

    //For the last element
    switch (item) {
      case 'net':
        cost += this.props.records.data_records[index].net
        break;
      case 'total_spent':
        cost += this.props.records.data_records[index].total_spent
        break;
      default:
        break;
    }
    count++;

    return cost / count;
  }

  getCategories = (category, inout) => {
    let index = this.props.records.data_records.length - 1;
    let cost = 0;

    //No Records
    if (index == -1) {
      return 0;
    }

    //Finding the first element in the range
    while (this.checkDate(this.props.records.data_records[index].date, this.state.date_min)) {
      index -= 1;
    }

    //Calculating the earned in the range and finding the last element in the range
    while (this.checkDate(this.props.records.data_records[index].date, this.state.date_max)) {
      this.props.records.data_records[index].items.forEach(element => {
        if (element.category == category && element.inout == inout) {
          cost += element.cost;
        }
      });
      index -= 1;
    }

    //For the last element
    this.props.records.data_records[index].items.forEach(element => {
      if (element.category == category && element.inout == inout) {
        cost += element.cost;
      }
    });

    return cost;
  }

  getTotalSpent = () => {
    let index = this.props.records.data_records.length - 1;
    let array = [];

    //No Records
    if (index == -1) {
      return 0;
    }

    //Finding the first element in the range
    while (this.checkDate(this.props.records.data_records[index].date, this.state.date_min)) {
      index -= 1;
    }

    //Calculating the earned in the range and finding the last element in the range
    while (this.checkDate(this.props.records.data_records[index].date, this.state.date_max)) {
      array.push({ x: this.props.records.data_records[index].date.substring(0, 10), y: this.props.records.data_records[index].total_spent })
      index -= 1;
    }

    //For the last element
    array.push({ x: this.props.records.data_records[index].date.substring(0, 10), y: this.props.records.data_records[index].total_spent })

    let previous = moment(this.state.date_min).subtract(1, 'd').format()

    index = 0;
    while (this.checkDate(this.props.records.data_records[index].date, previous)) {
      index += 1;
      if (index == this.props.records.data_records.length) {
        array.unshift({ x: previous.substring(0, 10), y: 0 })
        return array;
      }
    }
    array.unshift({ x: this.props.records.data_records[index].date.substring(0, 10), y: this.props.records.data_records[index].total_spent })
    return array;
  }

  getNet = () => {
    let index = this.props.records.data_records.length - 1;
    let array = [];

    //No Records
    if (index == -1) {
      return 0;
    }

    //Finding the first element in the range
    while (this.checkDate(this.props.records.data_records[index].date, this.state.date_min)) {
      index -= 1;
    }

    //Calculating the earned in the range and finding the last element in the range
    while (this.checkDate(this.props.records.data_records[index].date, this.state.date_max)) {
      array.push({ x: this.props.records.data_records[index].date.substring(0, 10), y: this.props.records.data_records[index].net })
      index -= 1;
    }

    //For the last element
    array.push({ x: this.props.records.data_records[index].date.substring(0, 10), y: this.props.records.data_records[index].net })

    let previous = moment(this.state.date_min).subtract(1, 'd').format()

    index = 0;
    while (this.checkDate(this.props.records.data_records[index].date, previous)) {
      index += 1;
      if (index == this.props.records.data_records.length) {
        array.unshift({ x: previous.substring(0, 10), y: 0 })
        return array;
      }
    }
    array.unshift({ x: this.props.records.data_records[index].date.substring(0, 10), y: this.props.records.data_records[index].net })
    return array;
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

  getData = (category, inout) => {
    let output = []
    category[0].forEach((categ) => {
      if (categ != "Choose Category") {
        output.push({ category: categ.substring(0, 6), cost: this.getCategories(categ, inout), label: this.getCategories(categ, inout) })
      }
    })
    return output
  }


  render() {
    let category = [["Choose Category"]]
    let ecategory = [["Choose Category"]]
    this.props.records.categories.forEach((categ) => {
      if (categ[1] == "Spend") {
        category[0].push(categ[0])
      }
      else {
        ecategory[0].push(categ[0])
      }
    })


    return (
      <View style={{ flex: 1 }}>
        {/*Header*/}
        <View style={{ flex: 1 }}>
          <AppNoLeftHeader route={this.props.navigation.state.routeName} />
        </View>
        {/*Content*/}
        <View style={{ flex: 9 }}>
          <ScrollView style={{ backgroundColor: '#ffffff' }}>

            {/*DatePicker*/}
            <View style={[styles.homeContainer, { backgroundColor: '#3aafb9', borderColor: '#0000000', padding: 10, paddingLeft: 17, paddingRight: 0, flex: 1, flexDirection: 'row' }]}>
              {/*From*/}
              <View style={[{ flex: 2, flexDirection: 'row' }]}>
                <Text style={{ paddingTop: 10, color: 'white', fontWeight: 'bold' }}>
                  From:
                  </Text>
                <DatePicker
                  style={{ width: this.state.screen_width / 2.74 }}
                  date={this.state.date_min}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate={this.props.records.data_records[this.props.records.data_records.length - 1].date.substring(0, 10)}
                  //minDate="2018-11-05"
                  maxDate={this.state.date_max}
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
                      backgroundColor: '#ffffff'
                    }
                    // ... You can check the source to find the other keys.
                  }} getItem
                  onDateChange={(date) => {
                    this.setState({ date_min: date });
                  }}
                />
              </View>
              {/*To*/}
              <View style={[{ flex: 2, flexDirection: 'row' }]}>
                <Text style={{ paddingTop: 10, color: 'white', fontWeight: 'bold' }}>
                  To:
                  </Text>
                <DatePicker
                  style={{ width: this.state.screen_width / 2.74 }}
                  date={this.state.date_max}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate={this.state.date_min}
                  maxDate={this.props.records.data_records[0].date.substring(0, 10)}
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
                      backgroundColor: '#ffffff'
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {
                    this.setState({ date_max: date });
                  }}
                />
              </View>
            </View>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, }} />

            {/*OverallEarned*/}
            <View styles={[styles.homeContainer, { flex: 1 }]}>
              <Text style={[styles.welcome]}>
                Overall Earned
                </Text>
              <Text style={[
                styles.moneyDisplay,
                styles.moneyEarned,
                { marginTop: 0 }
              ]}>
                {this.pesoString(this.getOverall('Earn'), "Earn")}
              </Text>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, }} />

            {/*Overall Spent*/}
            <View styles={[styles.homeContainer, { flex: 1 }]}>
              <Text style={[styles.welcome]}>
                Overall Spent
                </Text>
              <Text style={[
                styles.moneyDisplay,
                styles.moneySpent,
                { marginTop: 0 }
              ]}>
                {this.pesoString(this.getOverall('Spend'), "Spend")}
              </Text>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, }} />

            {/*Average Net*/}
            <View styles={[styles.homeContainer, { flex: 1 }]}>
              <Text style={[styles.welcome]}>
                Average remaining money per day
                </Text>
              <Text style={[
                styles.moneyDisplay,
                this.getAverage('net') > 0 ? styles.moneyEarned : styles.moneySpent,
                { marginTop: 0 }
              ]}>
                {this.pesoString(this.getAverage('net'), "Earn")}
              </Text>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, }} />

            {/*Average Spent*/}
            <View styles={[styles.homeContainer, { flex: 1 }]}>
              <Text style={[styles.welcome]}>
                Average spent money per day
                </Text>
              <Text style={[
                styles.moneyDisplay,
                styles.moneySpent,
                { marginTop: 0 }
              ]}>
                {this.pesoString(this.getAverage('total_spent'), "Spent")}
              </Text>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, }} />

            {/*Line Graph of Spendings*/}
            <View style={[styles.homeContainer, { flex: 1 }]}>
              <Text style={[styles.welcome]}>
                Daily Spendings
                </Text>
              <View>
                <PureChart numberOfYAxisGuideLine={10} data={this.getTotalSpent()} type='line' />
              </View>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, }} />

            {/*Line Graph of Net*/}
            <View style={[styles.homeContainer, { flex: 1 }]}>
              <Text style={[styles.welcome]}>
                Daily Net Money
                </Text>
              <View>
                <PureChart numberOfYAxisGuideLine={10} data={this.getNet()} type='line' />
              </View>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, }} />

            {/*Bar Graph of Spending*/}
            <View style={[styles.homeContainer, { flex: 1 }]}>
              <View pointerEvents="none" style={{ padding: 10 }}>
                { category[0].length == 1 ? <Text style={{ fontSize: this.state.screen_width / 20.55 }} >No Spending Logs Yet</Text>
                :
                <VictoryChart width={this.state.screen_width * .83} domainPadding={{ y: 10 }} height={(category[0].length+1)*40} theme={VictoryTheme.material}>
                  <VictoryLabel style={{ fontSize: this.state.screen_width / 20.55 }} text="Spendings for each Category" x={this.state.screen_width / 2.4176} y={10} textAnchor="middle" />
                  <VictoryBar horizontal
                    alignment="start"
                    barWidth={20}
                    animate={{ duration: 1000 }}
                    style={{
                      data: { fill: "#c43a31" }
                    }}
                    data={this.getData(category, "Spend")}
                    x="category"
                    y="cost"
                  />
                </VictoryChart>}
              </View>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, }} />

            {/*Bar Graph of Earning*/}
            <View style={[styles.homeContainer, { flex: 1 }]}>
              <View pointerEvents="none" style={{ padding: 10 }}>
                  { ecategory[0].length == 1 ? <Text style={{ fontSize: this.state.screen_width / 20.55 }}>No Earning Logs Yet</Text>
                  :
                  <VictoryChart width={this.state.screen_width * .83} domainPadding={{ y: 10 }} height={(ecategory[0].length+1)*40} theme={VictoryTheme.material}>
                    <VictoryLabel style={{ fontSize: this.state.screen_width / 20.55 }} text="Earnings for each Category" x={this.state.screen_width / 2.4176} y={10} textAnchor="middle" />
                    <VictoryBar horizontal
                      alignment="start"
                      barWidth={20}
                      style={{
                        data: { fill: "#c43a31" }
                      }}
                      animate={{ duration: 1000 }}
                      data={this.getData(ecategory, "Earn")}
                      x="category"
                      y="cost"
                    />
                  </VictoryChart>
                  }
              </View>
            </View>
            <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, }} />

          </ScrollView>
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

export default connect(mapStatetoProps, mapDispatchToProps)(StatusScreen)

