import React, {Component} from 'react';

import {
    Text,  
    View,
    ScrollView
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


    render() {
      var data = [["Choose Category", "Food & Drinks", "Bills", "Transportation", "Grocery", "Shopping/Entertainment", "Maintenance/Repair", "Health/Medication", "Lost", "Others"]]

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
                  <VictoryArea
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
                </View>
                <Text>
                  Line Graph of Net Money for each day:
                </Text>
                <VictoryChart
                  containerComponent={<VictoryZoomContainer
                    zoomDimension="x"
                    allowZoom={false}
                    zoomDomain={{x:[1,5]}}
                  />}
                >
                  <VictoryLine data={ this.props.records.data_records.map(obj =>{
                      var rObj = {date: obj.date.substring(0,5),net: obj.net};
                      return rObj;
                    })} 
                    x="date"
                    y="net"
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
                  <VictoryLine data={ this.props.records.data_records.map(obj =>{
                    var rObj = {date: obj.date.substring(0,5),net: obj.total_spent};
                    return rObj;
                  })} 
                    x="date"
                    y="net"
                  />
                </VictoryChart>
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

