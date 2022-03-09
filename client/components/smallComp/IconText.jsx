import Icon from 'react-native-vector-icons/FontAwesome5';
import {View,StyleSheet} from 'react-native'
import { Title } from 'react-native-paper';

export default function IconText(props){

    return (
      <View style={{flexDirection:'row'}}>
      <Icon name={props.icon} style={styles.smallIcon} ></Icon>
      <Title>{props.text}</Title>
      </View>
    )
  }

  const styles= StyleSheet.create({
    smallIcon:{
      color: 'black', 
      padding: 5, 
      fontSize: 20}
  })