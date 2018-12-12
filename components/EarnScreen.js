import React, { Component } from 'react';
import { Button, Container, Content, Form, Item, Input, Label, Text as NBText } from 'native-base';
import {
  TextInput, 
  Alert,
  View,
  Platform,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addRecord, addCategory } from './RecordsReducer.js';
import styles from './Style.js';
import AppHeader from './AppHeader.js';
import DropdownMenu from 'react-native-dropdown-menu';
import AppBottomNav from './AppBottomNav.js';


class EarnScreen extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
      text: '',
      details: '',
      category: '',
      query: '',
      earn: 0,
      isModalVisible: false,
      screen_width: Dimensions.get('window').width,
      screen_height: Dimensions.get('window').height,
    };
  }

  _InpValidation = () => {
    if (this.state.category == "" || this.state.category == "Choose Category" || this.state.details == '' || isNaN(this.state.earn)) {
      Alert.alert("Valid Input Please","Please fill up all fields with valid input");
    }
    else {
      this.setState({disabled: true})
      this.props.addRecord('Earn', this.state.details, this.state.category, parseFloat(this.state.earn))
      this.props.navigation.goBack();
    }
  }

  _confirm = () => {
    this.props.navigation.goBack();
  }

  render() {
    var data = [['Choose Category']]
    this.props.records.categories.forEach((categ) => {
      if (categ[1] == "Earn") {
        data[0].push(categ[0])
      }
    })
    // console.log("test")
    return (
      <View style={{ flex: 1 }}>
        {/*Header*/}
        <View style={{ flex: 1 }}>
          <AppHeader route={this.props.navigation.state.routeName} />
        </View>
        {/*Content*/}
        <View style={[styles.background, { flex: 9 }]}>
          <View style={{ flex: 1 }}>
            <View style={{ height: 0 }} />
            <DropdownMenu
              style={{flex:1}}
              bgColor={'white'}
              // tintColor={'#666666'}
              activityTintColor={'green'}
              // arrowImg={}
              // checkImage={}  
              optionTextStyle={{ color: '#333333' }}
              // titleStyle={{color: '#333333'}}
              maxHeight={300}
              handler={(selection, row) => this.setState({ category: data[selection][row] })}
              data={data}
            >
              <TouchableOpacity style={{
                borderRadius: 3,
                zIndex: 1,
                marginTop: -40,
                marginLeft: this.state.screen_width/1.37,
                height: 33,
                width: 47,
                backgroundColor: '#4050B5',
                padding: 10,
                paddingTop: 7
              }}
                  onPress={() => {
                      this.setState({ isModalVisible: true });
                  }}
              >
                <Text style={{ color: '#ffffff' }}>Add</Text>
              </TouchableOpacity>
              <Container>
                <Content padder >
                  {/*Form*/}
                  <Form>
                    <Item floatingLabel>
                      <Label>Details</Label>
                      <Input onChangeText={(details) => this.setState({ details })} />
                    </Item>
                    <Item floatingLabel>
                      <Label>Earnings (Number only)</Label>
                      <Input onChangeText={(earn) => this.setState({ earn })} />
                    </Item>
                  </Form>
                  <View style={[styles.enterButton, Platform.select({
                    ios: styles.enterButtonIOS,
                    android: styles.enterButtonAndroid,
                  }), { flex: 1 }]}>
                    <Button 
                      disabled={this.state.disabled}
                      onPress={() =>
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
          
          <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isModalVisible: false })} >
                <View style={[styles.modalContent]}>
                    <Text style={{ fontSize: 15 }}>Add a New Category</Text>
                    <TextInput
                      style={{height: 40, marginBottom: 15}}
                      placeholder="e.g. Found, Allowance, Salary"
                      onChangeText={(text) => this.setState({text})}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginRight: 10, backgroundColor: 'green', padding: 10 }}
                            onPress={() => {
                                this.setState({ isModalVisible: false });
                                this.props.addCategory(this.state.text,"Earn")
                            }}
                        >
                            <Text style={{ color: '#ffffff' }}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 10, backgroundColor: '#DADADA', padding: 10 }} onPress={() => this.setState({ isModalVisible: false })}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </Modal>
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
    addCategory
  }, dispatch)
);

export default connect(mapStatetoProps, mapDispatchToProps)(EarnScreen)
