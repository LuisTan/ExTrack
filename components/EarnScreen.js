import React, {Component} from 'react';
import { Button, Container, Content, Form, Item, Input, Label, Text as NBText  } from 'native-base';
import {
    View
} from 'react-native';

import styles from './Style.js'
import AppHeader from './AppHeader.js';


export default class StatusScreen extends Component<Props> {
    constructor(props){
      super(props)
      this.state = {
        text: '',
        username: ''
      };
    }
    
    _confirm = () => {
      this.props.navigation.goBack();
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
                <Form>
                  <Item floatingLabel>
                    <Label>Username</Label>
                    <Input onChangeText={(username) => this.setState({username})} />
                  </Item>
                  <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input />
                  </Item>
                </Form>
                <Button onPress={ ()=>
                  this._confirm()
                }><NBText>Confirm</NBText></Button>
              </Content>
            </Container>
          </View>
        </View>
      );
    }
}
