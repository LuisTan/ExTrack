
import {
    StyleSheet,
    Dimensions
} from 'react-native';

import RF from 'react-native-responsive-fontsize';

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
      fontSize: RF(2.5),
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
        fontSize: RF(4),
        margin: 10,
    },
    moneyList:{
        textAlign: 'center',
        fontSize: RF(2.5),
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
        fontSize: RF(2.5),
        margin: 5
    },
    homeContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      margin: 0,
    },
    enterButton: {
      justifyContent: 'center',
      alignSelf: 'flex-end',
      alignItems: 'center',
      height: 40,
      margin: 20
    },
    datepicker: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#093A3E',
    },
    historyItemRow: {
      flexDirection:'row',
      flexBasis:'100%',
      justifyContent:'space-between'
    },
    historyItemCategory: {
      fontStyle: 'italic',
      color: 'black',
      fontSize: RF(2.5),
    },
    historyItemDetail: {
      color: 'black',
      fontSize: RF(3),
    },
    historyItemTime: {
      color: 'black',
      fontSize: RF(2.5),
    },
    historyItemCost: {
      fontSize: RF(3),
    },
    spentItem:{
      color: 'black',
      fontSize: RF(2.75)
    }
});
