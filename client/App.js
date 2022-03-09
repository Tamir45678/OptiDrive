import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider,Modal } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import StudentDetails from './components/StudentDetails';
import AddStudent from './components/AddStudent';
import MenuButton from './components/smallComp/MenuButton';
import Menu from './components/Menu';
import Calendar from './components/Calendar'
import Homepage from './components/Homepage';
import Students from './components/Students';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Map from './components/Map'
import AddLesson from './components/AddLesson';
import { initializeApp } from "firebase/app";
import {Provider,useSelector} from 'react-redux'
import store from './redux/store'
import * as SplashScreen from 'expo-splash-screen';

const firebaseConfig = {
  apiKey: "AIzaSyCeW57DYp4jhng-fNCVimU5iqWQpHN0-hk",
  authDomain: "optidrive-expo.firebaseapp.com",
  databaseURL: "https://optidrive-expo-default-rtdb.firebaseio.com",
  projectId: "optidrive-expo",
  storageBucket: "optidrive-expo.appspot.com",
  messagingSenderId: "28959220453",
  appId: "1:28959220453:web:7eb7647eee1ea25e01ea0c"
};

const Stack = createNativeStackNavigator();

const AppWrapper = () => (
<Provider store={store}>
  <App/>
</Provider>)

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [active, setActive] = useState('');
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  const containerStyle = {backgroundColor: 'white', height:'100%',width:'60%',left:0};
  const {userName,uId} = useSelector(state=>state.userReducer)

  useEffect(async() => {
        initializeApp(firebaseConfig);
        await SplashScreen.preventAutoHideAsync();
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }, []);

  if (!appIsReady) {
    return null;
  }

   else return (
        <SafeAreaProvider>
          <PaperProvider>   
          <NavigationContainer>
            <Stack.Navigator headerMode="float" screenOptions={{headerRight:()=>(<MenuButton handleClick={showModal}></MenuButton>)}}>
              <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/>
              <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
              <Stack.Screen name="Homepage" component={Homepage}/>
              <Stack.Screen name="Students" component={Students} />
              <Stack.Screen name="StudentDetails" component={StudentDetails} />
              <Stack.Screen name="AddStudent" component={AddStudent} />
              <Stack.Screen name="Calendar" component={Calendar}/>
              <Stack.Screen name="AddLesson" component={AddLesson}/>
            </Stack.Navigator>
            {visible &&  userName!=""  ?  
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >
              <Menu active={active} setActive={setActive} style={{padding:'0px', marginLeft:'0px'}} setMenuActive={setVisible}></Menu>
            </Modal> : null}
          </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
  );
}

export default AppWrapper


