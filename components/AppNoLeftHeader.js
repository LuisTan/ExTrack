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
import { Container, Header, Left, Body, Right, Title, Subtitle } from 'native-base';

class AppNoLeftHeader extends Component<Props>{
    render(){
        return(
            <Container>
                <Header noLeft>
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

export default AppNoLeftHeader;