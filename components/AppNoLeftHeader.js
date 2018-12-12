import React, { Component } from 'react';

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
import { Container, Header, Left, Body, Right, Title, Subtitle, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import extrackTheme from './native-base-theme/variables/extrackTheme'

class AppNoLeftHeader extends Component<Props>{
    render() {
        return (
            <StyleProvider style={getTheme(extrackTheme)}>
                <Container>
                    <Header noLeft>
                        <Left />
                        <Body>
                            <Title>{this.props.route}</Title>
                        </Body>
                        <Right />
                    </Header>
                </Container>
            </StyleProvider>
        );
    }
}

export default AppNoLeftHeader;