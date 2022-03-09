import { Text, StyleSheet, View, TouchableOpacity,Button } from 'react-native'
import {Agenda} from 'react-native-calendars';
import React,{useState, useEffect} from 'react'
import {Card,Title} from 'react-native-paper'
import {useSelector} from 'react-redux'
import Loader from './Loader';

export default function TeacherCalendar ({navigation}) {
  const {userName,id,ip} = useSelector(state=>state.userReducer)
  const [items,setItems] = useState({})
  const [lessons,setLessons] = useState([])
  const [Loading,setLoading] = useState(false)

    useEffect(async ()=>{
    setLoading(true)
    await fetch("http://"+ip+":5000/lessons?"+(new URLSearchParams({uId:id})))
      .then(res=>{
        if(res.status==200)
          res.json().then(res=>{
            console.log(res)
            setLessons(res)
          })})
      .catch((err)=> alert(err))
    setLoading(false)

    return () =>{
      setLessons([])
    }
  },[])

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const loadItems = (day) => {
      
      for (let i = 0; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
      
        if (lessons[strTime]===undefined) {
          items[strTime] = [];
          items[strTime].push({
            studentName:'', hour:'',date:'',duration:'',startPoint:'', endPoint:''
          });
        }
        else items[strTime] = lessons[strTime];
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
        const arr=[]
        if (Object.keys(newItems[key]).length>0){
          Object.values(newItems[key]).forEach((item)=>{
            arr.push(item)
          })
          newItems[key]=arr;
        }
      });
      setItems(newItems)
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Card>
          {item.studentName ? <><Title style={{marginLeft:10}}>{item.hour.substring(0,5)}  | {item.studentName}  </Title>
          <Card.Content>
            <View style={{flexDirection: 'column',alignItems: 'start',}}>
              <Text style={{fontSize:18}}>Start Point:  {item.startPoint}</Text>
              <Text style={{fontSize:18}}>End Point:  {item.endPoint}</Text>
            </View>
          </Card.Content></> : <Card.Content style={{height:80}}></Card.Content>}
        </Card>
      </TouchableOpacity>
    );
  };

  if(Loading)
    return <Loader/>
  else
  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={timeToString(new Date(Date.now()))}
        renderItem={renderItem}
      />
      <Button title="Add" onPress={()=>navigation.navigate('AddLesson')}/>
    </View>
  );
}

const styles = StyleSheet.create({})
