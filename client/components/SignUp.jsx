import { Text, StyleSheet, View,TouchableOpacity,Platform,Image} from 'react-native'
import {useDispatch} from 'react-redux'
import {setUsername,setUid} from '../redux/actions'
import React,{useEffect, useState} from 'react'
import SignForm from './SignForm'
import CustomInputText from './smallComp/CustomInputText'
import { useSelector } from 'react-redux'
import PhotoRequest from './PhotoRequest'
import Loader from './Loader'
import {getStorage,ref,uploadBytes} from 'firebase/storage'
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth'
import {Colors} from 'react-native-paper'

export default function SignUp ({navigation}){
    const [data,setData] = useState({ email:'', password:"", userName:"",photoURL:"" })
    const [Loading,SetLoading] = useState(false);
    const dispatch = useDispatch()

    const storage = getStorage()
    const auth = getAuth()

    const {userName,id,ip} = useSelector(state=>state.userReducer)
    const handleChange = (value,field) => 
            (setData({...data,[field]:value}))
    


    const handleSubmitClick = () =>{
        const sendData = {email:data.email,password:data.password,displayName:data.userName}
        fetch("http://"+ip+":5000/users",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(sendData)
        })
        .then((res) => {
            const status = res.status
            res.json().then(async(resJson) => {
                    if(status==200){
                        SetLoading(true)
                        await signInWithEmailAndPassword(auth, data.email, data.password)
                        .then((userCredential) => {   
                                dispatch(setUid(userCredential.user.uid))
                                dispatch(setUsername(userCredential._tokenResponse.displayName))
                        })  
                        if(data.photoURL!=''){
                            const img = await fetch(data.photoURL)
                            const bytes = await img.blob();
                            const reference = ref(storage,'users/'+ resJson.uid +'/profile.jpg')
                            await uploadBytes(reference,bytes)
                        }
                        SetLoading(false)
                        setData({ email:'', password:"", userName:"",photoURL:"" })
                        navigation.navigate("Homepage")
                    }
                    else{
                        alert(resJson.message)
                    }
                })
        })
        .catch((err)=> {   
            console.log(err)
        })
    }
    
    if(Loading)
        return <Loader/>
    else 
    return (
        <View style={styles.container}>
         <View style={styles.header}>
                <Image style={{display:'flex',resizeMode: 'cover',height:150,top:30,width:'100%'}} source={require('../assets/OptiDriveLogo.png')}></Image>
            </View>
                <View style={styles.footer}>
                    <CustomInputText name='userName' value={data.userName} handleChange={handleChange}></CustomInputText>
                    <SignForm handleChange={handleChange} email={data.email} password={data.password}/>
                    <PhotoRequest handleChange={handleChange}/>
                    <TouchableOpacity 
                        onPress={handleSubmitClick}
                        style = {[styles.signUp],{
                            borderColor:'#fff',
                            backgroundColor:Colors.blue400,
                            borderWidth:1,
                            marginTop:30,
                            borderHeight:1,
                            padding:10,
                            marginTop:15
                        }}
                    >
                        <Text style={[styles.textSign,{
                            color:'#fff'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=>{
                            setData({ email:'', password:"", userName:"",photoURL:"" })
                            navigation.navigate('SignIn')
                        }}
                        style = {[styles.signUp,{
                            borderColor:Colors.blue400,
                            backgroundColor:'#fff',
                            borderWidth:1,
                            borderHeight:1,
                            padding:10,
                            marginTop:15
                        }]}
                    >
                        <Text style={[styles.textSign,{
                            color:Colors.blue400,
                        }]}>Already a Member</Text>
                    </TouchableOpacity>
                </View> 
      </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.blue200
    },
    header:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'white',
        borderBottomRightRadius:70,
        borderBottomLeftRadius:20,
        marginBottom:30,
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
        fontSize:34
    },
    footer:{
        flex:3,
        backgroundColor:"#fff",
        borderTopLeftRadius:100,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30,
        borderBottomLeftRadius:0,
        borderBottomRightRadius:150,
        marginTop:20
    
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
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold'
    },
    text_footer:{
        color:Colors.blue400,
        fontWeight:'bold',
        fontSize:15,
        margin:10
    },
    textInput:{
        flex:1,
        marginTop:Platform.OS === 'ios' ? 0:-12,
        paddingLeft:10,
        color:Colors.blue400,
    }
});



