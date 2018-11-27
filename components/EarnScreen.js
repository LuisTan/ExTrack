import React, {Component} from 'react';
import { Button, Container, Content, Form, Item, Input, Label, Text as NBText  } from 'native-base';
import {StyleSheet, TextInput, Alert} from 'react-native';
import {
    View,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {  addRecord } from './RecordsReducer.js';
import styles from './Style.js';
import AppHeader from './AppHeader.js';
import DropdownMenu from 'react-native-dropdown-menu';
import AppBottomNav from './AppBottomNav.js';


class EarnScreen extends Component<Props> {
    constructor(props){
      super(props)
      this.state = {
        details: '',
        category: '',
        earn: 0,
      };
    }

    _InpValidation = () => {
      if(this.state.category == "" || this.state.details == '' || isNaN(this.state.earn)){
        Alert.alert("Please fill up all fields with valid input");
      } else {
        this.props.addRecord('Earn',this.state.details,this.state.category, parseFloat(this.state.earn))
        this.props.navigation.goBack();
      }
    }

    _confirm = () => {
      this.props.navigation.goBack();
    }

    render() {
      var data = [["Choose Category", "Salary", "Allowance", "Found", "Others"]]
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
              <Container>
                <Content padder >
                  {/*Form*/}
                  <Form>
                    <Item floatingLabel>
                      <Label>Details</Label>
                      <Input onChangeText={(details) => this.setState({details})} />
                    </Item>
                    <Item floatingLabel>
                      <Label>Earnings (Number only)</Label>
                      <Input onChangeText={(earn) => this.setState({earn})}/>
                    </Item>
                  </Form>
                  <View style={[styles.enterButton,{flex:1}]}>
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
                  </View>
                </Content>
              </Container>
            </DropdownMenu>
          </View>

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

export default connect(mapStatetoProps, mapDispatchToProps)(EarnScreen)
