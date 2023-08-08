import React, {Component} from 'react';
import {Appearance, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './Profile';
import {connect} from 'react-redux';
import {changeTheme} from '../redux';
import HeaderUnit from './HeaderUnit';
import VideoPlay from './VideoPlay';
import LandingPage from './LandingPage';

const Stack = createNativeStackNavigator();

interface IProps {
  changeTheme: (theme: any) => {};
  lightTheme: boolean;
}
interface IState {
}

class Navigations extends Component<IProps, IState> {
  state:IState = {
  }
  componentDidMount(): void {
    const theme = Appearance.getColorScheme();
   
    this.props.changeTheme(theme);
  }
  componentDidUpdate(): void {
    Appearance.addChangeListener(theme => {
      this.props.changeTheme(theme.colorScheme);
    });
  }

  render() {
    const {lightTheme} = this.props;
    return (
      <NavigationContainer>
        <StatusBar
          barStyle={lightTheme ? 'dark-content' : 'light-content'}
          backgroundColor={lightTheme ? 'white' : 'black'}
        />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="HeaderUnit" component={HeaderUnit} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="VideoPlay" component={VideoPlay} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    lightTheme: state.lightTheme,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeTheme: (theme: string) => dispatch(changeTheme(theme)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigations);
