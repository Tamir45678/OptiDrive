import {StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Card,Colors} from 'react-native-paper';

export default function StudentRecord(props){
    
    const navigation=useNavigation()
    const student=props.data;
    const LeftContent = props => <Avatar.Icon color={Colors.black} style={{backgroundColor:Colors.blue200}} {...props} size={50} icon="account" />
    
    return(
    <Card style={styles.item}>
    <Card.Title title={student.name} left={LeftContent} 
      titleStyle={styles.title} subtitleStyle={styles.subtitle} subtitle={student.carType + ' | ' + student.licenseType}>
    </Card.Title>
    <Card.Actions>
      <Button color='black' onPress={()=>navigation.navigate('AddLesson',{student:student.name})}>Add Lesson </Button>
      <Button  color='black' onPress={()=>navigation.navigate('StudentDetails',{student:student})}>See more</Button>
    </Card.Actions>
  </Card>
    )
  }

  const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor:'grey',
        flexDirection:'row',
      },
    title:{
      fontSize:24,
      marginHorizontal:20,
      marginVertical:5
    },
    subtitle:{
      fontSize:18,
      marginHorizontal:20,
      marginVertical:5
    }
  })
  