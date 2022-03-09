import { View} from 'react-native';
import { useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {useDispatch} from 'react-redux'
import {setUsername,setUid} from '../redux/actions'
import {getAuth,signOut} from "firebase/auth";
import MenuItem from './smallComp/MenuItem';
import {useSelector} from 'react-redux'
import { Avatar,Divider } from 'react-native-paper';
import { getStorage,getDownloadURL,ref } from 'firebase/storage';
import { Text } from 'react-native';
import { Colors } from 'react-native-paper';

export default function Menu(props){
    const [isLoading,setIsLoading] = useState(true)
    const auth = getAuth();
    const storage = getStorage()
    const {userName,id,ip} = useSelector(state=>state.userReducer)
    const [profileImage,setProfileImage] = useState(userName.charAt(0))
    const navigation = useNavigation()
    const MenuItems = [
        {label:'Homepage', icon:'home'},
        {label:'Students', icon:'account-group'},
        {label:'Calendar', icon:'calendar'},
        {label:"Logout", icon:'logout'}
    ]
    const dispatch = useDispatch()

    useEffect(async()=>{
        setIsLoading(true)
        await getDownloadURL(ref(storage,'users/'+id+'/profile.jpg'))
            .then((url)=>{
                setProfileImage(url)
                setIsLoading(false)
            })
            .catch(error=>{
                setIsLoading(false)
            })
        
        return ()=>{setProfileImage(userName.charAt(0)) }
    },[])

    const handlePress=(label)=>{
        props.setActive(label)
        if(label !== "Logout"){
            navigation.navigate(label)
            props.setMenuActive(false);
        }
        else {
            signOut(auth).then(() => {
                dispatch(setUsername(''))
                dispatch(setUid(''))
                props.setMenuActive(false)
                navigation.navigate('SignIn')
            }).catch((error) => {
                console.log(error)
            });
        }
    }

    return (
        <View>
            {(!isLoading&&profileImage.length>1)?
                <Avatar.Image style={{alignSelf: 'center',marginBottom:20}} size={70} source={{uri:profileImage}}/>
                :
                <Avatar.Text style={{color:'black',alignSelf: 'center',marginBottom:20,backgroundColor:Colors.blue100}} size={70} label={profileImage}/>
            }
             <Text style={{alignSelf:'center', fontSize:20,fontWeight:'bold',margin:30,marginTop:0, marginBottom:0}}>{userName}</Text>
             <Divider style={{margin:30}}></Divider>
            {MenuItems.map(item=> <MenuItem key={item.label} icon={item.icon} label={item.label} handlePress={handlePress}/>)}
        </View>
)}
