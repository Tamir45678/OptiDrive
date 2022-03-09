import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import ModalSelector from 'react-native-modal-selector'

export default function ModalPhotoSelector (props) {
    const selectors = [
        {key:1,label:"Take a photo"},
        {key:2,label:"Choose from library"}
    ]

    return (
      <View style={{flex:1, justifyContent:'space-around', padding:50}}>
        <ModalSelector
            visible={props.visible}
            data={selectors}
            initValue="Select Option"
            onChange={(option)=>{props.setSelector(option.key)}}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            />
      </View>
    )
  }

