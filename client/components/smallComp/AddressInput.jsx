import {StyleSheet } from 'react-native'
import React  from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function AddressInput (props) {
    return (
    <GooglePlacesAutocomplete
        placeholder={props.placeHolder}
        onPress={(data, details = null) => 
            props.handleChange(data.description,props.request)
      }
        query={{
          key: 'AIzaSyAXYE1mVk8vzezCV5s3BfDPM-qJZDcIgw8',
          language: 'en',
       }}
      />
    )
}

const styles = StyleSheet.create({})