import React , { useState,useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet,Platform, ScrollView} from 'react-native'
import { Title } from 'react-native-paper';
import CustomInputText from './smallComp/CustomInputText';
import PickerContainer from './smallComp/PickerContainer';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useValidation } from 'react-native-form-validator';
import CustomBtn from './smallComp/CustomBtn';

export default function AddStudent({navigation}) {
    const [student,setStudent] = useState({})
    const {userName,id,ip} = useSelector(state=>state.userReducer)
    const [date,setDate] = useState(new Date(Date.now()))
    const [show, setShow] = useState(false);
    const [Loading,setLoading] = useState(false);
    const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: student
  });

  useEffect(()=>{
    setStudent({name:'',id:'',birthDate:null,phone:'',address:'',licenseType:'',carType:''})
    return () => {
      setStudent({})
    }
  },[])

    const handleSubmit =async()=>{
      const result = await validate({
        name: { minlength: 2, required: true },
        id: {number:true,minlength:8,maxlength:9,required:true},
        phone:{number:true,minlength:10,maxlength:10,required:true},
        birthDate: { date: 'YYYY-MM-DD',required:true },
        address:{required:true},
        licenseType:{required:true},
        carType:{required:true}
      })

      if(!result){
        const errors = Object.keys(student).map(field=>{
          if((getErrorsInField(field).length>0))
            return getErrorsInField(field)[0]
        }).filter(error=>error!==undefined)
        alert(errors[0])
      }

      else{
        setLoading(true)
        await fetch("http://"+ip+":5000/students?"+new URLSearchParams({uId: id}),{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(student)
        })
        .then(res => {
          setLoading(false)
          alert(student.name + "added Successfully")
          navigation.navigate("Students")
        })
        .catch((err)=> console.log(err))   
      }      
    }
    

    const handleChange = (value,field) => {
        setStudent({...student,[field]:value})
    }

    const onChangeDate = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      const currentArray = currentDate.toISOString().split('T')[0];
      setStudent({...student,birthDate:currentArray})
    };
    

  return (  
      <SafeAreaView style={styles.container}>
        <ScrollView>
      <Title style={{alignSelf:'center',marginVertical:10}}>Add Student</Title>
      <CustomInputText name='name'  value={student.name} handleChange={handleChange}/>
      <CustomInputText name='id' value={student.id} keyboardType='numeric' handleChange={handleChange}/>
      <CustomInputText name='phone' value={student.phone} keyboardType='numeric' handleChange={handleChange} />
      <CustomInputText name='address' value={student.address} handleChange={handleChange}/>
      <View style={styles.datePickerContainer}>
          <Icon name="calendar" style={{color: 'black', padding: 10, marginLeft:10, fontSize: 20}}/>
          <Text style={{color: 'black', padding: 10, marginLeft:10, fontSize: 20}}>Select Birthdate</Text>
          <DateTimePicker style={styles.datePicker} value={date} mode={'date'}  display="default" onChange={onChangeDate}/>
      </View>
      <View style={styles.row}>
        <PickerContainer title='License Type' defaultValue={student.licenseType} options={['A','B','C']} handleChange={handleChange} field='licenseType'></PickerContainer>
        <PickerContainer title='Engine Type' defaultValue={student.carType} options={['Manual', 'Auto']} handleChange={handleChange} field='carType'></PickerContainer>
      </View>
      <CustomBtn handlePress={handleSubmit} title='Submit'></CustomBtn>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 50,
  },
  datePickerContainer: {
    marginVertical:20,
    alignItems:'center',
    flexDirection:'row'
  },
  row:{
    display: 'flex',
    flexDirection:'row',
  },
  datePicker: {
    width: 150,
    margin:10,
    alignItems: 'center'
  },
  });
  