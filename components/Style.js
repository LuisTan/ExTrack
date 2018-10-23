
import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
  
    background: {
      backgroundColor: '#C0C0C0'
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
      zIndex:0,
      margin: 0,
      right: 0,
      bottom: 60,
    },
    sub_fab:{
      position: 'absolute',
      zIndex:0,
      margin: 0,
      right: 0,
      bottom: -20,
    }
});

