import { StyleSheet} from 'react-native'
import {FAB} from 'react-native-paper'
import {Colors} from 'react-native-paper'

export default function CustomBtn(props) {
    return (
        <FAB style={styles.button} label={props.title} onPress={props.handlePress}></FAB>
    )
  }
   
  const styles=StyleSheet.create({
    button:{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
      alignSelf:'center',
      marginVertical: 50,
      backgroundColor: Colors.blue200,
      color:'black',
    }
  })