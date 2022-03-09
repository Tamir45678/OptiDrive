import {View,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function MenuButton(props) {
	return(
    <View>
		<TouchableOpacity onPress={props.handleClick} >
            <Icon name="bars" style={{color: 'black', padding: 10, marginLeft:10, fontSize: 20}}/>
		</TouchableOpacity>
	</View>
  )
};