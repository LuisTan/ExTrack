import React, {Component} from 'react';
import { Button, Container, Content, Form, Item, Input, Label, Text as NBText  } from 'native-base';
import {
    View,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux'

import styles from './Style.js'
import AppHeader from './AppHeader.js';
import AppBottomNav from './AppBottomNav.js';


class StatusScreen extends Component<Props> {
    constructor(props){
      super(props)
      this.state = {
        text: '',
        username: ''
      };
    }
    

    saveData = () => {
      let obj = {
        username: this.state.username
      }
      AsyncStorage.setItem('user', JSON.stringify(obj))
      this.props.navigation.goBack()
    }

    displayData = async () => {
      try{
        let user = await AsyncStorage.getItem('user')
        user = JSON.parse(user).username
        alert(user)
      } catch (error){
        alert(error)
      }
    }

    render() {

      return (
        <View style={{flex:1}}>
          {/*Header*/}
          <View style={{flex:1}}>
            <AppHeader route={this.props.navigation.state.routeName} />
          </View>
          {/*Content*/}
          <View  style={[styles.background,{flex:9}]}>
            <Container>
              <Content padder >
                {/*Form*/}
                <Form>
                  <Item floatingLabel>
                    <Label>Username</Label>
                    <Input onChangeText={(username) => this.setState({username})} />
                  </Item>
                </Form>

                <Button onPress={ ()=>
                  this.saveData()
                }><NBText>Confirm</NBText></Button>

                <Button onPress={ ()=>
                  this.displayData()
                }><NBText>Display</NBText></Button>

              </Content>
            </Container>
          </View>
        </View>
      );
    }
}

const mapStatetoProps = (state) => {
  const { records } = state
  return { records }
}

export default connect(mapStatetoProps)(StatusScreen)
