import React, { useEffect, useState } from 'react'
import { Avatar, Headline, Title, } from 'react-native-paper'
import {View} from 'react-native' 
import { SafeAreaView } from 'react-native-safe-area-context'
import IconText from './smallComp/IconText'
import { Colors } from 'react-native-paper'
import { TaskRatingView } from './smallComp/Rating'

    export default function StudentDetails({route,navigation}) {
      const [student,setStudent] = useState('')
      useEffect(() => {
        if(route.params!==undefined){
          setStudent(route.params.student)
        }
      else navigation.goBack()
      }, [])

      return (
          <SafeAreaView>
            <View style={{flexDirection:'row', paddingHorizontal:20,marginBottom:20}}>
            <Avatar.Icon style={{backgroundColor:Colors.blue200}} size={80} icon="account" />
            <View style={{flexDirection:'column',padding:20}}>
              <Headline style={{fontWeight:'bold', fontSize:35}}>{student.name}</Headline>
              <Title>{student.carType}  | {student.licenseType} </Title>
              <IconText icon='phone' text={student !== ' ' ? student.phone : ' ' }></IconText>
              <IconText icon='birthday-cake' text={student !== ' ' ? student.birthDate : ' '}></IconText>
            </View>
            </View>
          <TaskRatingView/>
          </SafeAreaView>

      )
    }
    


