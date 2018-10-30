import React, {Component} from 'react';
import { Button, Container, Content, Form, Item, Input, Label, Text as NBText  } from 'native-base';
import {StyleSheet, TextInput, Alert} from 'react-native';
import {
    View
} from 'react-native';

import styles from './Style.js'
import AppHeader from './AppHeader.js';
import DropdownMenu from 'react-native-dropdown-menu';


export default class StatusScreen extends Component<Props> {
    constructor(props){
      super(props)
      this.state = {
        category: '',
        others: '',
        earn: ''
      };
    }

    _InpValidation = () => {
      if((this.state.category == "Choose Category" || this.state.others == '') || isNaN(this.state.earn)){
        Alert.alert("Please enter all valid categories");
      } else {
        this.props.navigation.goBack();
      }
    }

    _confirm = () => {
      this.props.navigation.goBack();
    }
    render() {
      var data = [["Choose Category", "Food & Drinks", "Bills", "Transportation", "Grocery", "Shopping/Entertainment", "Maintenance/Repair", "Health/Medication", " "]]
      // console.log("test")
      return (
        <View style={{flex:1}}>
          {/*Header*/}
          <View style={{flex:1}}>
            <AppHeader route={this.props.navigation.state.routeName} />
          </View>
          {/*Content*/}
          <View  style={[styles.background,{flex:9}]}>
          <View style={{flex: 1}}>
            <View style={{height: 0}} />
            <DropdownMenu
              style={{flex: 1}}
              bgColor={'white'}
              // tintColor={'#666666'}
              activityTintColor={'green'}
              // arrowImg={}
              // checkImage={}
              optionTextStyle={{color: '#333333'}}
              // titleStyle={{color: '#333333'}}
              maxHeight={300}
              handler={(selection, row) => this.setState({category: data[selection][row]})}
              data={data}
            >
            </DropdownMenu>
          </View>

            <Container>
              <Content padder >
                <Form>
                  <Item floatingLabel>
                    <Label>Enter Other Category</Label>
                    <Input onChangeText={(others) => this.setState({others})} />
                  </Item>
                  <Item floatingLabel>
                    <Label>Earnings (Number only)</Label>
                    <Input onChangeText={(earn) => this.setState({earn})}/>
                  </Item>
                </Form>
                <Button onPress={ ()=>
                  // this._confirm()
                  // this.EmptyInp
                  this._InpValidation()
                  // if (this.state.category.trim() == ""){
                  //   this.setState(() => ({ nameError: "First name required."}));
                  // } else {
                  //   this.setState(() => ({ nameError: null}));
                  // }
                }><NBText>Confirm</NBText></Button>
              </Content>
            </Container>
          </View>
        </View>
      );
    }
}
