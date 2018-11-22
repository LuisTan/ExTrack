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
import PureChart from 'react-native-pure-chart';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {  addRecord } from './RecordsReducer.js';
import styles from './Style.js';
import AppNoLeftHeader from './AppNoLeftHeader.js';


class StatusScreen extends Component<Props> {
    constructor(props){
      super(props)
      this.state = {
        text: '',
        data_length: '',
      };
    }

    getEveryDateNet = () => {
      const length = this.props.records.data_records.length
      let date_net = []
      if (length == 0){
        date_net.push({date: new Date().toLocaleString().replace(/-/g,'/').substring(0,5), net: 0})
        date_net.push({date: new Date(new Date() - 864e5).toLocaleString().replace(/-/g,'/').substring(0,5), net: 0})
        date_net.push({date: new Date(new Date() - (864e5*2)).toLocaleString().replace(/-/g,'/').substring(0,5), net: 0})
      }
      else{
        date_net = this.props.records.data_records.map(obj => {
          return {date: obj.date.toLocaleString().replace(/-/g,'/').substring(0,5),net: obj.net};
        })
        date_net.push({date: new Date(this.props.records.data_records[length-1].date - 864e5).toLocaleString().replace(/-/g,'/').substring(0,5), net: 0})
        date_net.push({date: new Date(this.props.records.data_records[length-1].date - (864e5*2)).toLocaleString().replace(/-/g,'/').substring(0,5), net: 0})
      }
      return date_net.reverse()
    }

    getEveryDateSpent = () => {
      const length = this.props.records.data_records.length
      let date_spent = []
      if (length == 0){
        date_spent.push({date: new Date().toLocaleString().replace(/-/g,'/').substring(0,5), spent: 0})
        date_spent.push({date: new Date(new Date() - 864e5).toLocaleString().replace(/-/g,'/').substring(0,5), spent: 0})
        date_spent.push({date: new Date(new Date() - (864e5*2)).toLocaleString().replace(/-/g,'/').substring(0,5), spent: 0})
      }
      else{
        date_spent = this.props.records.data_records.map((obj) => {
          return {date: obj.date.toLocaleString().replace(/-/g,'/').substring(0,5),spent: obj.total_spent};
        })
        date_spent.push({date: new Date(this.props.records.data_records[length-1].date - 864e5).toLocaleString().replace(/-/g,'/').substring(0,5), spent: 0})
        date_spent.push({date: new Date(this.props.records.data_records[length-1].date - (864e5*2)).toLocaleString().replace(/-/g,'/').substring(0,5), spent: 0})
      }
      return date_spent.reverse()
    }



    render() {
      var category = [["Choose Category", "Food & Drinks", "Bills", "Transportation", "Grocery", "Shopping/Entertainment", "Maintenance/Repair", "Health/Medication", "Lost", "Others"]]
      let sampleData = [{x: '1', y: 300}, { x: '2', y: 100 }, { x: '2', y: 250 }, {x: '3', y: 50}, {x: '4', y: 400}];
      //let sampleData = [30, 200, 170, 250, 10]
      /*
      let sampleData = [
        {
          value: 50,
          label: 'Marketing',
          color: 'red',
        }, {
          value: 40,
          label: 'Sales',
          color: 'blue'
        }, {
          value: 25,
          label: 'Support',
          color: 'green'
        }
     
      ]*/
      return (
        <View style={{flex:1}}>
          {/*Header*/}
          <View style={{flex:1}}>
            <AppNoLeftHeader route={this.props.navigation.state.routeName} />
          </View>
          {/*Content*/}
          <View  style={{flex:9}}>
            <ScrollView>
              <Text>
                Overall Earned: {this.props.records.statistical_data.total_earned}
              </Text>
              <Text>
                Overall Spent: {this.props.records.statistical_data.total_spent}
              </Text>
              <Text>
                Average remaining money per day: {(this.props.records.statistical_data.total_earned-this.props.records.statistical_data.total_spent)/this.props.records.data_records.length}
              </Text>
              <Text>
                Average spent per day: {this.props.records.statistical_data.total_spent/this.props.records.data_records.length}
              </Text>
              <Text>
                Bar Graph of Overall Spendings for each category:
              </Text>
              <View pointerEvents="none">
                <VictoryChart theme={VictoryTheme.material}>
                  <VictoryBar horizontal
                    style={{
                      data: { fill: "#c43a31" }
                    }}
                    data={[
                      {category: "Food & Drinks", cost: this.props.records.categorical_records.spend.fooddrinks.cost},
                      {category: "Bills", cost: this.props.records.categorical_records.spend.bills.cost},
                      {category: "Transportation", cost: this.props.records.categorical_records.spend.transportation.cost},
                      {category: "Grocery", cost: this.props.records.categorical_records.spend.grocery.cost},
                      {category: "Shopping/Entertainment", cost: this.props.records.categorical_records.spend.shoppingentertainment.cost},
                      {category: "Maintenance/Repair", cost: this.props.records.categorical_records.spend.maintenancerepair.cost},
                      {category: "Health/Medication", cost: this.props.records.categorical_records.spend.healthmedication.cost},
                      {category: "Lost", cost: this.props.records.categorical_records.spend.lost.cost},
                      {category: "Others", cost: this.props.records.categorical_records.spend.others.cost}
                    ]}
                    x="category"
                    y="cost"
                  />
                </VictoryChart>
                <Text>
                  Line Graph of Spent for each day:
                </Text>
                <VictoryChart
                  containerComponent={<VictoryZoomContainer
                    zoomDimension="x"
                    allowZoom={false}
                    zoomDomain={{x:[1,5]}}
                  />}
                >
                  <VictoryLine data={ this.getEveryDateSpent() }
                    x="date"
                    y="spent"
                  />
                  </VictoryChart>
                <Text>{Object.keys(this.getEveryDateSpent()).length}</Text>
                </View>
                <View>
                  <Text>Bar</Text>
                   <PureChart type={'bar'}
            data={sampleData}
            xAxisColor={'red'}
            yAxisColor={'red'}
            xAxisGridLineColor={'red'}
            yAxisGridLineColor={'red'}
            labelColor={'red'}
            backgroundColor={'blue'}
            color={'blue'} />
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

