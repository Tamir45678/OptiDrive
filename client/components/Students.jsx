import React,{useState,useEffect} from 'react'
import {View, FlatList,ScrollView} from 'react-native'
import {useSelector} from 'react-redux'
import StudentRecord from './smallComp/StudentRecord';
import Loader from './Loader';
import {Colors,Button} from 'react-native-paper'

export default function Students({navigation}) {
  const [students,setStudents] = useState([]);
  const {userName,id,ip} = useSelector(state=>state.userReducer)
  const [Loading,setLoading] = useState(true)

  useEffect(async()=>{
    await fetch("http://"+ip+":5000/students?"+new URLSearchParams({
        uId: id,
      }))
      .then(res=>{
        if(res.status==200)
          res.json().then(res=>{
            setStudents(res)
          })
        }
      )
      .catch((err)=> alert(err))
    setLoading(false)

    return () => {
      setStudents([])
    }
  },[])

  if(Loading)
    return <Loader/>
  else
  return (
    <ScrollView  stickyHeaderIndices={[0]}>
      <View style={{backgroundColor:Colors.blue100,position: 'absolute',padding:0,zIndex:3,marginHorizontal:10, top: 0}}>
        <Button color='black' labelStyle={{fontSize:20,fontWeight:'bold'}} onPress={()=>navigation.navigate('AddStudent')}>add Student</Button>
      </View>
      {(Object.values(students).length!==0) ? 
          Object.values(students).map(item=><StudentRecord key={item.id} data={item}></StudentRecord>)
        : <View></View>}
    </ScrollView>
  )}


