import React, { useEffect, useState } from 'react';
import { View,Text, Platform,TouchableOpacity,StyleSheet} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ModalSelector from 'react-native-modal-selector'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from 'react-native-paper';
export default function PhotoRequest (props) {
    const [image, setImage] = useState("Insert Profile Picture");
    const [cameraPermission, setCameraPermission] = useState(null);
    const [galleryPermission, setGalleryPermission] = useState(null);
    const [visible,setVisible] = useState(false)
  
    const selectors = [
      {key:1,label:"Take a photo"},
      {key:2,label:"Choose from library"}
    ]

    const initButton = (
      <View style={{flexDirection: 'row',justifyContent:'center',padding:10,marginHorizontal:20}}>
      <Icon name="camera" style={{color:Colors.blue400, padding: 10, marginLeft:10, fontSize: 20}}/>
      <Text style={{color:Colors.blue400, fontWeight:'bold',padding: 10, marginLeft:10, fontSize: 20}}>{image}</Text>
      </View>
    )

    const permissionFunction = async () =>{
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(cameraPermission.status == 'granted');

      const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
      setGalleryPermission(imagePermission.status == 'granted');

      if (
        imagePermission.status != 'granted' &&
        cameraPermission.status != 'granted'
      ) {
        alert('Permission for media access needed.');
      }
    }

    useEffect(async ()=>{
      permissionFunction();
    },[])


    const showModal = () =>{setVisible()}

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          props.handleChange(result.uri,"photoURL")
          setImage("Photo Added Successfully")
        }
        else
          console.log("Pick Cancelled")
      
      
    };
    
    const takePhoto = async () => {
          let result = await ImagePicker.launchCameraAsync()
          console.log(result)
          if(!result.cancelled){
            props.handleChange(result.uri,"photoURL")
            setImage("Photo Added Successfully")
          }
          else
            console.log("Pick cancelled")
     }

   
  
    return (
      <TouchableOpacity 
            onPress={showModal}
            style = {{
             borderColor:Colors.blue400,
             backgroundColor:'#fff',
             borderWidth:1,
             borderHeight:1,
             padding:10,
             marginTop:15,
             display:'flex',
            }}
      >
      <ModalSelector
        visible={visible}
        data={selectors}
        initValue={initButton}
        onChange={(option)=>{
          if(option.key===1 && Platform.OS === 'ios')
            takePhoto()
        }}
        onModalClose={(option)=>{
          if(option.key === 2)
              pickImage()
        }}
        cancelButtonAccessibilityLabel={'Cancel Button'}
      />    
      </TouchableOpacity>
    );
}




const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'#009387'
  },
  header:{
      flex:1,
      justifyContent:'flex-end',
      paddingHorizontal:20,
      paddingBottom:50
  },
  action:{
      flexDirection:'row',
      marginTop:10,
      borderBottomWidth:1,
      borderBottomColor:'#f2f2f2',
      paddingBottom:5
  },
  text_header:{
      color:'#fff',
      fontWeight:'bold',
      fontSize:18
  },
  footer:{
      flex:3,
      backgroundColor:"#fff",
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
      paddingHorizontal:20,
      paddingVertical:30
  },
  signUp:{
      width:'100%',
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      textAlign:'center'
  },
  textSign:{
      fontSize:18,
      textAlign:'center',
  },
  text_footer:{
      color:'#05375a',
      fontWeight:'bold',
      fontSize:15,
      margin:10
  },
  textInput:{
      flex:1,
      marginTop:Platform.OS === 'ios' ? 0:-12,
      paddingLeft:10,
      color:'#05375a'
  }
});



