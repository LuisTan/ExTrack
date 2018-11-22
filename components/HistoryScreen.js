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

class HistoryScreen extends Component<Props> {
    constructor(props){
      super(props)

      sectioning = [];
      for(x = 0; x < this.props.records.data_records.length; x++){
        sectioning.push({
          title: this.props.records.data_records[x].date,
          data: this.props.records.data_records[x].items,
        })
      }

      this.state = {
        history: sectioning
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

    renderListItem = (item) =>{
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
<<<<<<< HEAD
          <View  style={[styles.background,{flex:9}]}>
            <View style={[styles.container, {flex:1}]}>
              <Text style={styles.welcome}>{this.props.records.data_records[0].date} </Text>
            </View>
          </View>
=======
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
>>>>>>> af93744dbe52159139fd862c6ca8a21e6de07ff5
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