import { TouchableOpacity,Text} from 'react-native';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MenuItem(props){
    const label=props.label
    return (
        <TouchableOpacity onPress={()=>props.handlePress(label)} style={{paddingVertical:5,flexDirection:'row',borderBottomRightRadius:50,color:'black',backgroundColor:Colors.blue200, borderTopRightRadius:50,marginLeft:0,marginRight:20,marginVertical:5}}>
                <Icon style={{fontSize:26,marginHorizontal:10}} name={props.icon}></Icon>
                <Text style={{fontSize:20,fontWeight:'bold'}}>{label}</Text>
        </TouchableOpacity>

)
}
