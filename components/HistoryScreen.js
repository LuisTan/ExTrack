import React, {Component} from 'react';

import {
    Text,
    View,
    ScrollView,
    SectionList,
    Platform,
    Alert,
    Modal,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

import {  addRecord } from './RecordsReducer.js';
import styles from './Style.js';
import AppNoLeftHeader from './AppNoLeftHeader.js';
import { Button } from 'react-native-paper';

import HistoryItem from './HistoryItem.js';

class HistoryScreen extends Component {
    constructor(props){
      super(props)

      sectioning = [];
      for(x = 0; x < this.props.records.data_records.length; x++){
        date = new Date(this.props.records.data_records[x].date)
        sectioning.push({
          date: date,
          title: date.toLocaleDateString(),
          data: this.props.records.data_records[x].items,
        })
      }
      date= new Date();
      this.state = {
        originalhistory: sectioning,
        history: sectioning,
        date: '',
        filtering: false,
      };
    }

    render() {
      return (
        <View style={{flex:1,justifyContent:"center"}}>
            {/*Header*/}
            <View style={[{flexDirection:'row'}, Platform.select({
                ios:{
                    height: 64,
                },
                android:{
                    height: 56,
                }
            })]}>
                <AppNoLeftHeader route={this.props.navigation.state.routeName} />
                <DatePicker
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'skyblue'
                    }}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="MM/DD/YYYY"
                    minDate={this.state.originalhistory[this.state.originalhistory.length-1].date}
                    maxDate={this.state.originalhistory[0].date}
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
                    onDateChange={(date)=>{
                        section = [];
                        for(x = 0; x < this.state.originalhistory.length; x++){
                            if(date == this.state.originalhistory[x].date.toLocaleDateString){
                                section.push(this.state.originalhistory[x]);
                            }
                        }
                        this.setState({
                            date: date,
                            sectioning: section,
                            filtering: true,
                        });
                        this.forceUpdate();
                    }}
                />
                <Icon.Button
                    style={
                        {
                            alignItems:'center',
                            justifyContent:"center",                         
                        }
                    }
                    name="times"
                    backgroundColor="skyblue"
                    borderRadius={0}
                    size={30}
                    iconStyle={
                        {
                            alignItems:'center',
                            justifyContent:"center",                         
                        }
                    }
                    onPress={()=>{
                        if(this.state.filtering){
                            this.setState({
                                filtering: false,
                                history: this.state.originalhistory,
                                date: '',
                            });
                        }
                        else{
                            Alert.alert("All Dates are Shown");
                        }
                        this.forceUpdate();   
                    }}
                    />
            </View>
          {/*Content*/}
          <ScrollView style={[styles.background,{flex:20}]}>
              <SectionList
                      sections={this.state.history}
                      keyExtractor={(item)=>item.date}
                      renderSectionHeader={({section: {title}}) => (
                        <Text style={[styles.welcome,{fontWeight: 'bold'}]}>{title}</Text>
                      )}
                      renderItem={({item}) => <HistoryItem item={item}/>}
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