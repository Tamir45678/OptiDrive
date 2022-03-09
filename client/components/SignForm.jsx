import { View} from 'react-native'
import React from 'react'
import CustomInputText from './smallComp/CustomInputText';
import {IconButton} from 'react-native-paper'

export default function SignForm (props) {
    return (
    <View>
            <CustomInputText
            label={'Enter your email'}
            value={props.email}
            onChangeText={(text)=>props.handleChange(text,'email')}
            />
            <CustomInputText
            label={'Enter your password'}
            isPassword
            value={props.password}
            customShowPasswordComponent={<IconButton icon='eye'></IconButton>}
            customHidePasswordComponent={<IconButton icon='eye-off'></IconButton>}
            onChangeText={(text)=>props.handleChange(text,'password')}
            />
    </View>
    )
  }

