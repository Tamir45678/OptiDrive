import {View,Text,Picker,StyleSheet} from 'react-native'

export default function PickerContainer(props){
    return (
      <View style={styles.pickerView}>
      <Text style={styles.title}>{props.title}</Text>
          <Picker style={{width: 200, height: 40}} itemStyle={{height: 120}} selectedValue={props.defaultValue} onValueChange={type=> props.handleChange(type,props.field)}>
            {props.options.map(opt => <Picker.Item key={opt} label={opt} value={opt}/>)}
          </Picker>
    </View>
    )
  }
  
  const styles = StyleSheet.create({
        pickerView: {
          padding:0,
          width:"50%",
          marginBottom:40,
          alignSelf:'center'
        },
        title:{
          fontSize:18,
          textAlign:'center'
        }
    });
  