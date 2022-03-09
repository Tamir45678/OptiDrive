import { Text, StyleSheet, View,Dimensions} from 'react-native'
import MapView from 'react-native-maps';
import React, { Component, useEffect, useState } from 'react'
import MapViewDirections from 'react-native-maps-directions'
export default function Map ({route,navigation}) {

    const coordinates = [
      {
        latitude:route.params.direction.origin.latitude,
        longitude:route.params.direction.origin.longitude
      },
      {
        latitude:route.params.direction.destination.latitude,
        longitude:route.params.direction.destination.longitude
      }
    ]
    const [finalRoute,setfinalRoute] = useState({'origin':'','destination':''})
    useEffect(()=>{
      console.log("the directions is: "+ JSON.stringify(route.params.direction.origin))
      if(route.params !== undefined)
        setfinalRoute({'origin':JSON.stringify(route.params.direction.origin),'destination':JSON.stringify(route.params.direction.destination)})
    },[])

    return (
    <View style={styles.container}>
        <MapView 
        maxZoomLevel={8}
        initialRegion={{
          latitude:coordinates[0].latitude,
          longitude:coordinates[0].longitude,
          latitudeDelta:0.1,
          longitudeDelta:0.1
        }}
        style={styles.map}>

          <MapView.Marker coordinate={coordinates[0]}/>
          <MapView.Marker coordinate={coordinates[1]}/>
          <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates[1]}
            apikey={'AIzaSyAXYE1mVk8vzezCV5s3BfDPM-qJZDcIgw8'}
            strokeWidth={3}
            strokeColor='hotpink'
            onReady={result=>{
              console.log(result.duration)
            }}
          />
          </MapView>
    </View>
    )
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });