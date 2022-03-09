import React, { useEffect,useState } from 'react'
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native'
import {Headline,Title,Chip,Card, Colors } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useSelector} from 'react-redux'
import Loader from './Loader';

export default function Homepage({navigation}) {

  const {userName,id,ip} = useSelector(state=>state.userReducer)
  const [Loading,setLoading] = useState(true)
  const [lessons,setLessons] = useState(null);
 
  var newItems = []

  useEffect(async ()=>{
     await fetch("http://"+ip+":5000/lessons/today?"+(new URLSearchParams({uId:id})))
    .then(res=>{
      if(res.status==200)
        res.json().then(res=>{
          setItems(res)
          console.log(newItems)
          setLoading(false)
          setLessons(newItems)
        })
      })
    .catch((err)=> {
      setLoading(false)
      alert(err)
    })
  },[])

  const setItems = async (items) => {
      let arr = []
      if (Object.keys(items).length>0){
        Object.values(items).forEach((item)=>
          arr.push(item)
        )
      }
      newItems = arr
  }

  if(Loading)
    return <Loader/>
  else
  return (
    <SafeAreaView>
      <View style={{flexDirection:'column', paddingHorizontal:20,marginBottom:20},styles.shadow}>
        <View style={{flexDirection:'row',padding:20,alignSelf:'center'}}>
          <Headline style={{fontWeight:'bold', fontSize:35,color:Colors.blue400}}>{"Hello, "} </Headline>
          <Title style={{fontWeight:'bold', fontSize:30}}>{userName}</Title>
        </View>

        {lessons&&(
        <TouchableOpacity style={{ marginTop: 17,marginHorizontal:20,alignContent:'center',justifyContent:'center'}}>
          <Card style={styles.shadow,styles.card}>
            <Card.Title title='Next Lesson' titleStyle={{fontSize:25,fontWeight:'bold',alignSelf:'center'}} ></Card.Title>
            <Card.Content>
              <View style={{flexDirection: 'column'  }}>
                <Text style={styles.text}>{lessons[0].date+ '   ' + lessons[0].hour.substring(0,5)}</Text>
                <Text style={styles.text}>{'Pick ' + lessons[0].studentName + ' from ' + lessons[0].startPoint}</Text>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
    )}
      </View>
    </SafeAreaView>

  )
}

const styles=StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  card: {
    backgroundColor:Colors.blue100,
    borderRadius:25,
    alignContent:'center',
    alignItems:'center',
    padding:15,
  },
  text:{
    fontSize:20,
    marginVertical:5,
    textAlign:'center'
  }
})
