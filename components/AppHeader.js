import React, {Component} from 'react';

import {
    Alert, 
    Platform, 
    StyleSheet, 
    Text, 
    TextInput, 
    View, 
    KeyboardAvoidingView, 
    Button 
} from 'react-native';
import { Container, Header, Left, Body, Right, Title } from 'native-base';

class AppHeader extends Component<Props>{
    render(){
        return(
            <Container>
                <Header>
                <Left/>
                <Body>
                    <Title>{this.props.route}</Title>
                </Body>
                <Right/>
                </Header>
            </Container>
        );
    }
}

export default AppHeader;