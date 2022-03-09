import { View, Text, StyleSheet,Platform } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react'
import CustomInputText from './smallComp/CustomInputText';
import {useSelector} from 'react-redux'
import { useValidation } from 'react-native-form-validator';
import CustomBtn from './smallComp/CustomBtn';
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddLesson({route,navigation}) {
    const [lesson,setLesson] = useState({studentName:'', hour:'',date:'',startPoint:'', endPoint:''})
    const [show, setShow] = useState(false);
    const [date,setDate] = useState(new Date(Date.now()))
    const {userName,id,ip} = useSelector(state=>state.userReducer)
    const [Loading,setLoading] = useState(false);
    const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: lesson
  });

    useEffect(() => {
      if(route.params!==undefined)
        setLesson({...lesson,studentName:route.params.student})
        return () => {
          setLesson({studentName:'', hour:'',date:'',startPoint:'', endPoint:''})
        }
    }, [])
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        const currentArray = currentDate.toISOString().split('T');
        const selectedTime = currentArray[1].split('.')[0];
        setLesson({...lesson,hour:selectedTime,date:currentArray[0]})
      };
      
      const handleSubmit= async ()=>{
        const result = validate({
          startPoint:{minlength:3, required:true},
          endPoint:{minlength:3, required:true},
          date: { date: 'YYYY-MM-DD',required:true },
          hour: {required:true}
        })
        if(!result){
          const errors = Object.keys(lesson).map(field=>{
            if((getErrorsInField(field).length>0))
              return getErrorsInField(field)[0]
          }).filter(error=>error!==undefined)
          console.log(errors)
        }
        else{
          setLoading(true)
          await fetch("http://"+ip+":5000/lessons?"+new URLSearchParams({uId: id}),{
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify(lesson)
          })
          .then(res => {
            if(res.status==200){
              setLoading(false)
              alert("Lesson added Successfully")
              navigation.navigate("Calendar",{date:lesson.date})
            }})
          .catch((err)=> console.log(err))
        }
      }

    const handleChange = (value,field) => {
        setLesson({...lesson,[field]:value})
    }

  return (  
    <SafeAreaView>
      <View styles={styles.container}>
      <Title style={{alignSelf:'center',marginVertical:10}}>Add Lesson</Title>
      <CustomInputText name='studentName' value={lesson.studentName} placeholder={lesson.studentName} editable = {false} />
      <CustomInputText name='startPoint' value={lesson.startPoint}  handleChange={handleChange}/>
      <CustomInputText name='endPoint' value={lesson.endPoint} handleChange={handleChange} />
      <View style={{flexDirection:'row',display:'flex'}}>
        <View style={styles.datePickerContainer}>
         <Text style={{fontSize:18,textAlign:'center'}}>Select Date </Text>
         <DateTimePicker style={styles.datePicker} value={date} mode={'date'} minimumDate={new Date(Date.now())} display='default' onChange={onChange}></DateTimePicker>
        </View>
       <View style={styles.datePickerContainer}>
        <Text style={{fontSize:18,textAlign:'center'}}> Select Hour </Text>
        <DateTimePicker style={styles.datePicker} value={date} minuteInterval={30} mode={'time'} is24Hour={false} display="default" onChange={onChange}/>
        </View>
    </View>
    </View>
    <CustomBtn title='Submit' handlePress={handleSubmit}></CustomBtn>
    </SafeAreaView>
  )
}


  const styles = StyleSheet.create({
    pickerView: {
        padding:10,
        height:80,
        marginBottom:50
      },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: 50,
    },
    datePickerContainer: {
      width:'50%',
      marginVertical:20,
      flexDirection:'column',
    
    },

    // This only works on iOS
    datePicker: {
      width: 150,
      margin:10,
      alignItems: 'center'
    },
    });
    