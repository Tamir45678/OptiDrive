import React from 'react';
import {
  SafeAreaView,
  View,
  Animated,
  Easing
} from 'react-native';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotateValueHolder: new Animated.Value(0)
    };
  }
  componentDidMount = () => {
    this.startImageRotateFunction();
  }
  startImageRotateFunction = () => {
    Animated.loop(Animated.timing(this.state.rotateValueHolder, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    })).start();
  };

  render(){
    return(
      <SafeAreaView>
        <View style={{flexDirection:'column',alignItems:'center'}}>
          <Animated.Image
            style={{
              width: 200,
              height: 200,
              marginVertical:200,
              transform:
                [
                  {
                    rotate: this.state.rotateValueHolder.interpolate(
                        {
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg'],
                        }
                      )
                  }
                ],
            }}
              source={require('../assets/loader.png')}
          />
        </View>
      </SafeAreaView>
    );
  }
}