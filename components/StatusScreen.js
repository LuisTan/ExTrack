import React, {Component} from 'react';

import {
    Text,  
    View,
    ScrollView,
    Alert
} from 'react-native';
import { 
  VictoryArea, 
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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {  addRecord } from './RecordsReducer.js';
import styles from './Style.js';
import AppNoLeftHeader from './AppNoLeftHeader.js';


class StatusScreen extends Component<Props> {
    constructor(props){
      super(props)
      this.state = {
        hide_date_max: true,
        text: '',
        data_length: '',
        //date_min: 0,
        //date_max: 0
        date_min: this.props.records.data_records[this.props.records.data_records.length-1].date,
        date_max: this.props.records.data_records[0].date
      };
    }

    componentDidMount(){
      //alert(this.props.records.data_records);

      //No Records
      
      //Finding the first element in the range
      //alert(this.props.records.data_records[index].date+this.state.date_min)
    }

    checkDate = (date1,date2)=>{
      return(date1.substring(0,10)!=date2.substring(0,10));
    }

    getOverall = (in_out) => {
      let index = this.props.records.data_records.length - 1;
      let cost = 0;

      //No Records
      if(index== -1) {
        return 0;
      }
      
      alert("70----" + JSON.stringify(this.props.records.data_records[0]))
      //Finding the first element in the range
      while(this.checkDate(this.props.records.data_records[index].date, this.state.date_min)){
        index -= 1;
      }
      
      //Calculating the earned in the range and finding the last element in the range
      while(this.checkDate(this.props.records.data_records[index].date, this.state.date_max)){
        this.props.records.data_records[index].items.forEach(element => {
          if(element.inout == in_out){
            cost+=element.cost;
          }
        });
        index -= 1;
      }

      //For the last element
      this.props.records.data_records[index].items.forEach(element => {
        if(element.inout == in_out){
          cost+=element.cost;
        }
      });

      return cost;
    }

    getAverage = (item) => {
      let index = this.props.records.data_records.length - 1;
      let cost = 0;
      let count = 0;

      //No Records
      if(index== -1) {
        return 0;
      }
      
      //Finding the first element in the range
      while(this.checkDate(this.props.records.data_records[index].date, this.state.date_min)){
        index -= 1;
      }
      
      //Calculating the earned in the range and finding the last element in the range
      while(this.checkDate(this.props.records.data_records[index].date, this.state.date_max)){
        switch(item){
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
      switch(item){
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

      return cost/count;
    }

    getCategories = (category) =>{
      let index = this.props.records.data_records.length - 1;
      let cost = 0;

      //No Records
      if(index== -1) {
        return 0;
      }
      
      //Finding the first element in the range
      while(this.checkDate(this.props.records.data_records[index].date, this.state.date_min)){
        index -= 1;
      }
      
      //Calculating the earned in the range and finding the last element in the range
      while(this.checkDate(this.props.records.data_records[index].date, this.state.date_max)){
        this.props.records.data_records[index].items.forEach(element => {
          if(element.category == category){
            cost+=element.cost;
          }
        });
        index -= 1;
      }

      //For the last element
      this.props.records.data_records[index].items.forEach(element => {
        if(element.category == category){
          cost+=element.cost;
        }
      });

      return cost;
    }

    getTotalSpent = () =>{
      let index = this.props.records.data_records.length - 1;
      let array = [];

      //No Records
      if(index== -1) {
        return 0;
      }
      
      //Finding the first element in the range
      while(this.checkDate(this.props.records.data_records[index].date, this.state.date_min)){
        index -= 1;
      }
      
      //Calculating the earned in the range and finding the last element in the range
      while(this.checkDate(this.props.records.data_records[index].date, this.state.date_max)){
        array.push({x: this.props.records.data_records[index].date.substring(0,10),y: this.props.records.data_records[index].total_spent})
        index -= 1;
      }

      //For the last element
      array.push({x: this.props.records.data_records[index].date.substring(0,10),y: this.props.records.data_records[index].total_spent})
      
      let previous = moment(this.state.date_min).subtract(1,'d').format()

      index = 0;
      while(this.checkDate(this.props.records.data_records[index].date, previous)){
        index += 1;
        if (index == this.props.records.data_records.length){
          array.unshift({x: previous.substring(0,10),y: 0})
          return array;
        }
      }
      array.unshift({x: this.props.records.data_records[index].date.substring(0,10),y: this.props.records.data_records[index].total_spent})
      return array;
    }

    getNet = () =>{
      let index = this.props.records.data_records.length - 1;
      let array = [];

      //No Records
      if(index== -1) {
        return 0;
      }
      
      //Finding the first element in the range
      while(this.checkDate(this.props.records.data_records[index].date, this.state.date_min)){
        index -= 1;
      }
      
      //Calculating the earned in the range and finding the last element in the range
      while(this.checkDate(this.props.records.data_records[index].date, this.state.date_max)){
        array.push({x: this.props.records.data_records[index].date.substring(0,10),y: this.props.records.data_records[index].net})
        index -= 1;
      }

      //For the last element
      array.push({x: this.props.records.data_records[index].date.substring(0,10),y: this.props.records.data_records[index].net})
      
      let previous = moment(this.state.date_min).subtract(1,'d').format()

      index = 0;
      while(this.checkDate(this.props.records.data_records[index].date, previous)){
        index += 1;
        if (index == this.props.records.data_records.length){
          array.unshift({x: previous.substring(0,10),y: 0})
          return array;
        }
      }
      array.unshift({x: this.props.records.data_records[index].date.substring(0,10),y: this.props.records.data_records[index].net})
      return array;
    }


    render() {
      var category = [["Choose Category", "Food & Drinks", "Bills", "Transportation", "Grocery", "Shopping/Entertainment", "Maintenance/Repair", "Health/Medication", "Lost", "Others"]]
      var cat = [["cc", "F & D","Bills","Trans","Grcry","S & E", "M & R", "H & M", "Lost", "Others"]]
      var ecategory = [["Choose Category", "Salary", "Allowance", "Found", "Others"]]
      var sampleData = [100,200,2000]
      
      return (
        <View style={{flex:1}}>
          {/*Header*/}
          <View style={{flex:1}}>
            <AppNoLeftHeader route={this.props.navigation.state.routeName} />
          </View>
          {/*Content*/}
          <View  style={{flex:9}}>
            <ScrollView>
              {/*From*/}
              <Text>
                {JSON.stringify(this.props.records.data_records)}
              </Text>
              <View style={[styles.homeContainer,{margin: 10, flex:1, flexDirection: 'row'}]}>
                <Text>
                  From: 
                </Text>
                <DatePicker
                  style={{width: 200}}
                  date={this.props.records.data_records[0].date.substring(0,10)}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate={this.props.records.data_records[this.props.records.data_records.length-1].date.substring(0,10)}
                  //minDate="2018-11-05"
                  maxDate={this.props.records.data_records[0].date.substring(0,10)}
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
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {
                    this.setState({date_min: date});
                    this.setState({hide_date_max: false});
                  }}
                />
              </View>
              {/*To*/}
              <View style={[{margin: 10,flex:1}]}>
                <View style={[{flex:1, flexDirection: 'row'}]}>
                  <Text>
                    To: 
                  </Text>
                  <DatePicker
                    style={{width: 200}}
                    date={this.props.records.data_records[0].date.substring(0,10)}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate={this.state.date_min}
                    maxDate={this.props.records.data_records[0].date.substring(0,10)}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    disabled={this.state.hide_date_max}
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      this.setState({date_max: date});
                      this.setState({hide_date_max: true});
                    }}
                  />
                </View>
                <Text>
                    {(this.state.hide_date_max?<Text style={{color: 'red'}}>First choose a min date</Text>:<Text></Text>)}
                </Text>
              </View>

              <Text>
                Overall Earned: {this.getOverall('Earn')}
              </Text>
              <Text>
                Overall Spent: {this.getOverall('Spend')}
              </Text>
              <Text>
                Average remaining money per day: {this.getAverage('net')}
              </Text>
              <Text>
                Average spent per day: {this.getAverage('total_spent')}
              </Text>
              <Text>
                Line Graph of Spendings Each Day
              </Text>
              {/*<Text>
                {JSON.stringify(this.getTotalSpent())}
              </Text>*/}
              <PureChart data={this.getTotalSpent()} type='line'/>
              <Text>
                Line Graph of Net Money Each Day
              </Text>
              <PureChart data={this.getNet()} type='line'/>
              <Text>
                Bar Graph of Overall Spendings for each category:
              </Text>
              <View pointerEvents="none" style={{padding: 10}}>
                <VictoryChart 
                    //containerComponent={<VictoryZoomContainer
                    //  zoomDimension="x"
                    //  allowZoom={false}
                    //  zoomDomain={{x:[1,6]}}
                    ///>}
                    domainPadding={25}
                    theme={VictoryTheme.material}>
                  <VictoryBar horizontal
                    barWidth={25}
                    style={{
                      data: { fill: "#c43a31" }
                    }}
                    data={[
                      {category: cat[0][1], cost: this.getCategories(category[0][1])},
                      {category: cat[0][2], cost: this.getCategories(category[0][2])},
                      {category: cat[0][3], cost: this.getCategories(category[0][3])},
                      {category: cat[0][4], cost: this.getCategories(category[0][4])},
                      {category: cat[0][5], cost: this.getCategories(category[0][5])},
                      {category: cat[0][6], cost: this.getCategories(category[0][6])},
                      {category: cat[0][7], cost: this.getCategories(category[0][7])},
                      {category: cat[0][8], cost: this.getCategories(category[0][8])},
                      {category: cat[0][9], cost: this.getCategories(category[0][9])}
                    ]}
                    labels={[this.getCategories(category[0][1]),this.getCategories(category[0][2]),this.getCategories(category[0][3]),this.getCategories(category[0][4]),this.getCategories(category[0][5]),this.getCategories(category[0][6]),this.getCategories(category[0][7]),this.getCategories(category[0][8]),this.getCategories(category[0][9])]}
                    x="category"
                    y="cost"
                  />
                </VictoryChart>
              </View>
              <Text>
                Bar Graph of Overall Earnings for each category:
              </Text>
              <View pointerEvents="none" style={{padding: 10}}>
                <VictoryChart 
                    //containerComponent={<VictoryZoomContainer
                    //  zoomDimension="x"
                    //  allowZoom={false}
                    //  zoomDomain={{x:[1,6]}}
                    ///>}
                    domainPadding={25}
                    theme={VictoryTheme.material}>
                  <VictoryBar horizontal
                    barWidth={25}
                    style={{
                      data: { fill: "#c43a31" }
                    }}
                    animate={{duration: 1000}}
                    data={[
                      {category: ecategory[0][1], cost: this.getCategories(ecategory[0][1])},
                      {category: ecategory[0][2], cost: this.getCategories(ecategory[0][2])},
                      {category: ecategory[0][3], cost: this.getCategories(ecategory[0][3])},
                      {category: ecategory[0][4], cost: this.getCategories(ecategory[0][4])}
                    ]}
                    labels={[this.getCategories(ecategory[0][1]),this.getCategories(ecategory[0][2]),this.getCategories(ecategory[0][3]),this.getCategories(ecategory[0][4])]}
                    x="category"
                    y="cost"
                  />
                </VictoryChart>
              </View>
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

