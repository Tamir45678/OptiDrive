import {ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import { LogBox,Checkbox,Button } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

  
export default function CreateRoute () {

    const {userName,id,ip} = useSelector(state=>state.userReducer);
    const navigation = useNavigation()
    const [direction,setDirection] = useState({
        'origin': '',
        'destination': ''
    })
    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
      }, [])


    const handleClick = async () =>{

        
        
        // await fetch("http://"+ip+":5000/routes",{
        //     method:'POST',
        //     headers:{'Content-Type':'application/json'},
        //     body:JSON.stringify(route)
        // }).then(res=>console.log(res.status))
        // .catch(err=>console.log(err))
    }
    return (
    <ScrollView keyboardShouldPersistTaps={'handled'} >
      <GooglePlacesAutocomplete	
        placeholder={"start here"}
        fetchDetails={true}
        onPress={(data, details) => 
            setDirection({...direction,origin:{'latitude':details.geometry.location.lat,'longitude':details.geometry.location.lng}})
        }
        query={{
          key:'AIzaSyAXYE1mVk8vzezCV5s3BfDPM-qJZDcIgw8',
          language:['en','he'],
          types:'geocode'
        }}
      />
      
    <GooglePlacesAutocomplete
        placeholder={"end here"}
        fetchDetails={true}
        onPress={(data, details) => 
            setDirection({...direction,destination:{'latitude':details.geometry.location.lat,'longitude':details.geometry.location.lng}})
            // setRoute({...route,destinations:data.place_id})
        }
        query={{
          key:'AIzaSyAXYE1mVk8vzezCV5s3BfDPM-qJZDcIgw8',
          language:['en','he'],
          types:'geocode'
        }}

      />
      <Button title="send request" onPress = {()=>{
          if(direction.origin=='' || direction.destination =='')
            alert("enter valid locations")
          else 
          navigation.navigate('Map',{direction:direction})
          }}/>
      </ScrollView>
    )
}

const styles = StyleSheet.create({})