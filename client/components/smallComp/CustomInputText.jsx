import { View,Text,TextInput, StyleSheet,ScrollView } from "react-native";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import {Colors} from 'react-native-paper'

export default function CustomInputText(props){
    let field = props.name;
    let value=props.value;
    return (
      <FloatingLabelInput
        label={field}
        value={value}
        isFocused={false}
        mask={props.mask}
        onChangeText={(text) => props.handleChange(text,field)}
        keyboardType={props.keyboardType}
        editable = {props.editable !== undefined ? props.editable: true}
        containerStyles={styles.input}
        customLabelStyles={{
          colorFocused: Colors.blueGrey700,
          fontSizeFocused:14,
          fontSize: 12
        }}
        labelStyles={{
          paddingHorizontal: 5,
        }}
        inputStyles={{
          color: 'black',
          paddingHorizontal: 10,
          fontSize:18
        }}
      {...props}
      />

    )
  }

  const styles = StyleSheet.create({
    input: {
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor:'transparent',
      borderBottomColor:'grey',
      borderColor:'transparent',
    },
    
})