
import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
  
    background: {
      backgroundColor: '#FFFFFF'
    },
    buttons:{
      color: 'white',
      flex: 1,
      alignItems: 'center',
      height: 40, 
      margin: 20
    },
    borders: {
      borderColor : '#0FA',
      borderWidth: 10,
      backgroundColor : '#CFC',
      borderRadius : 100
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      margin: 10,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    fab: {
      position: 'absolute',
      margin: 0,
      right: -5,
      bottom: 45
    },
    sub_fab:{
      position: 'absolute',
      zIndex:0,
      margin: 0,
      right: 0,
      bottom: -20,
    },
    moneyDisplay:{
        textAlign: 'center',
        fontSize: 30,
        margin: 10,
    },
    moneyList:{
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
    },
    moneySpent:{
        color:'red',
    },
    moneyEarned:{
        color:'green',
    },
    listItems:{
        textAlign: 'left',
        fontSize: 20,
        margin: 5
    },
    homeContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      margin: 0,
    },
});

