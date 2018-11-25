import React, {Component} from 'react';

import {
    Text,
    View,
} from 'react-native';
import styles from './Style.js';
import { pesoString } from './ExTrackParsers.js';

export default class HistoryItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            details: this.props.item.details,
            time:   this.props.item.time,
            category: this.props.item.category,
            cost:   this.props.item.cost,
            inout: this.props.item.inout,
        };
    }

    render(){
        return(
            <View style={[styles.background,{flex:1}]}>
                <View style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}/>
                <View style={[styles.homeContainer,{flexDirection:'row',flex:1,marginTop:1}]}>
                    <View style={{alignItems:'flex-start', width:'70%'}}>
                        <Text style={[styles.listItems,{flex:1}]}>
                            {this.state.details}
                        </Text>
                    </View>
                    <View style={{alignItems:'flex-end', width:'30%'}}>
                        <Text style={[styles.listItems,{flex:1}]}>
                            {this.state.time}
                        </Text>
                    </View>
                </View>
                <View style={[styles.homeContainer,{flexDirection:'row',flex:2}]}>
                    <View style={{alignItems:'flex-start', width:'70%'}}>
                        <Text style={[styles.listItems,{flex:1}]}>
                            {this.state.category}
                        </Text>
                    </View>
                    <View style={{alignItems:'flex-end', width:'30%'}}>
                        <Text
                            style={
                                [
                                    styles.listItems,
                                    this.state.inout === 'Spend' ? styles.moneySpent:styles.moneyEarned,
                                    {flex:1}
                                ]
                                }>
                            {pesoString(this.state.cost,this.state.inout)}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
