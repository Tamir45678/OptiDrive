import { Text, StyleSheet, View,TouchableOpacity} from 'react-native'
import React,{useEffect, useState} from 'react'
import SignForm from './SignForm'
import {useDispatch} from 'react-redux'
import {setUid, setUsername} from '../redux/actions'
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { Divider,Image } from 'react-native-elements'
import {Colors} from 'react-native-paper'

export default function SignIn({navigation}) {

    const [data,setData] = useState({})
    const dispatch = useDispatch()

    //setup and cleanup
    useEffect(()=>{
        setData({email:'tamir45@gmail.com',password:'manutd'})
    },[])

    const handleChange = (value,field) => {
        setData({...data,[field]:value})
    }
    
    const auth = getAuth();
  
    // //Only for us
    // useEffect(()=>{
    //     signInWithEmailAndPassword(auth, data.email, data.password)
    //     .then((userCredential) => {   
    //             dispatch(setUid(userCredential.user.uid))
    //             dispatch(setUsername(userCredential._tokenResponse.displayName))
    //             navigation.navigate("Homepage")
    //         })  
    //     .catch(err=>alert("Invalid Email or Password. Try again!"))
    // },[])

    const handleSubmitClick = () =>{
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {   
                dispatch(setUid(userCredential.user.uid))
                dispatch(setUsername(userCredential._tokenResponse.displayName))
                setData({email:'',password:''})
                navigation.navigate("Homepage")
            })  
        .catch(err=>alert("Invalid Email or Password. Try again!"))
    }



    return (
      <View style={styles.container}>
            <View style={styles.header}>
                <Image style={{display:'flex',resizeMode: 'cover',height:150,top:30,width:'100%'}} source={require('../assets/OptiDriveLogo.png')}></Image>
            </View>

            <View style={styles.footer}>
               <SignForm handleChange={handleChange} email={data.email} password={data.password}></SignForm>
                <TouchableOpacity 
                    onPress={handleSubmitClick} 
                    style = {[styles.signIn],{
                        backgroundColor:Colors.blue400,
                        borderColor:"#fff",
                        marginTop:30,
                        borderWidth:1,
                        borderHeight:1,
                        padding:10
                    }} 
                    >
                <Text style={[styles.textSign,{color:'#fff'}]}>Sign In</Text>
                 </TouchableOpacity>
                <Divider width={2} style={{marginTop:15, marginHorizontal:15}}/>
                <TouchableOpacity  
                    onPress={() => navigation.navigate('SignUp')}
                    style = {[styles.signIn],{
                        borderColor:Colors.blue400,
                        borderWidth:1,
                        borderHeight:1,
                        padding:10,
                        marginTop:15
                    }}
                >
                    <Text style={[styles.textSign,{
                        color:Colors.blue400,
                        
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
      </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.blue200,
    },
    header:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'white',
        borderBottomRightRadius:0,
        borderBottomLeftRadius:100,
        marginBottom:30
    },
    text_header:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:34,
        
    },
    footer:{
        flex:3,
        backgroundColor:"#fff",
        borderTopLeftRadius:10,
        borderTopRightRadius:100,
        paddingHorizontal:20,
        paddingVertical:20,
        borderBottomLeftRadius:50,
        borderBottomRightRadius:120,
        marginVertical:10   
    },
    signIn:{
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
    }
});