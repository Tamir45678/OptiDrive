import { Rating} from 'react-native-elements';
import { Title,Chip,Card } from 'react-native-paper'
import {View} from 'react-native' 
import { useState } from 'react';

export function TaskRatingView(){
    const [editMode,setEditMode] = useState(false)
    const taskOptions = ['Parking','Highway','Dead_end']
    return (
      <Card>
      <View style={{flexDirection: 'row', alignItems: 'center', display:'flex',justifyContent: 'center',paddingVertical:10}}>
        <Title style={{textAlign:'center',marginVertical:10,fontWeight:'bold', fontSize:25,marginHorizontal:50}}>Rating</Title>
        <Chip icon='pencil' style={{borderRadius:50,alignSelf:'flex-end'}} selected={editMode} selectedColor={'black'} onPress={()=>setEditMode(!editMode)}></Chip>
      </View>
      {taskOptions.map((task)=>(
      <Card.Content>
        <TaskRating key={task} task={task} editMode={editMode}></TaskRating> 
      </Card.Content>)
      )}
      </Card>
    )
    }
    

  export function TaskRating(props){ 
        return (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
            flexDirection:'row',
            paddingHorizontal:10
          }}>
            <Title style={{marginHorizontal:20}}>{props.task}</Title>
           <Rating
           //showRating
            type="star"
            fractions={1}
            startingValue={3.6}
            imageSize={40}
            style={{ paddingVertical: 10}}
            readonly={!props.editMode}
          />
            </View>
        )
      }
      
      