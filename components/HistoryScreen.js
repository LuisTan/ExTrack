import React, {Component} from 'react';

import {
    Text,
    View,
    ScrollView,
    SectionList,
    Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {  addRecord } from './RecordsReducer.js';
import styles from './Style.js';
import AppNoLeftHeader from './AppNoLeftHeader.js';

import { pesoString } from './ExTrackParsers.js';

class HistoryScreen extends Component {
    constructor(props){
      super(props)

      sectioning = [];
      for(x = 0; x < this.props.records.data_records.length; x++){
        date = new Date(this.props.records.data_records[x].date)
        sectioning.push({
          title: date.toDateString(),
          data: this.props.records.data_records[x].items,
        })
      }

      this.state = {
        history: sectioning
      };
    }
    
    renderListItem = (item) =>{
      return(
        <View style={[styles.background,{flex:1}]}>
            <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}/>
            <View style={[styles.homeContainer,{flexDirection:'row',flex:1,marginTop:1}]}>
                <View style={{alignItems:'flex-start', width:'70%'}}>
                    <Text style={[styles.listItems,{flex:1}]}>
                        {item.details}
                    </Text>
                </View>
                <View style={{alignItems:'flex-end', width:'30%'}}>
                    <Text style={[styles.listItems,{flex:1}]}>
                        {item.time}
                    </Text>
                </View>
            </View>
            <View style={[styles.homeContainer,{flexDirection:'row',flex:2}]}>
                <View style={{alignItems:'flex-start', width:'70%'}}>
                    <Text style={[styles.listItems,{flex:1}]}>
                        {item.category}
                    </Text>
                </View>
                <View style={{alignItems:'flex-end', width:'30%'}}>
                    <Text
                        style={
                            [
                                styles.listItems,
                                item.inout === 'Spend' ? styles.moneySpent:styles.moneyEarned,
                                {flex:1}
                            ]
                            }>
                        {pesoString(item.cost,item.inout)}
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
          <View style={[{}, Platform.select({
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
              <SectionList
                      sections={this.state.history}
                      keyExtractor={(item)=>item.date}
                      renderSectionHeader={({section: {title}}) => (
                        <Text style={[styles.welcome,{fontWeight: 'bold'}]}>{title}</Text>
                      )}
                      renderItem={({item}) => this.renderListItem(item)}
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