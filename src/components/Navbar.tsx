import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Explore from './Explore';
import Library from './Library';
import Subsciption from './Subsciption';
import AntDIcons from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Image, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';

const Tab = createBottomTabNavigator();

interface IProps {
  lightTheme: boolean;
  navigation?: any;
}
interface IState {}

export class Navbar extends Component<IProps, IState> {
  getColor = () => (this.props.lightTheme ? 'black' : 'white');

  render() {
    const {lightTheme} = this.props;
    const {getColor} = this;
    return (
      <View testID='bottomTab' style={{flex: 1}}>
        <Tab.Navigator
          screenOptions={{
            tabBarTestID: 'colorCheck',
            headerShown: false,
            tabBarStyle: {
              height: responsiveHeight(9),
              backgroundColor: lightTheme ? 'white' : '#131313',
              position: 'absolute',
              elevation: 0,
              borderRadius: 10,
            },
            tabBarActiveTintColor: getColor(),
            tabBarInactiveTintColor: getColor(),
            tabBarLabelStyle: {
              fontSize: responsiveFontSize(1.5),
              color: getColor(),
            },
            tabBarItemStyle: {
              marginBottom: 10,
              marginTop: 10,
            },
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({focused}) =>
                focused ? (
                  <Foundation
                    name="home"
                    size={responsiveWidth(7)}
                    // color={color}
                    color={getColor()}
                  />
                ) : (
                  <SimpleLineIcons
                    name="home"
                    size={responsiveWidth(5.5)}
                    color={getColor()}
                  />
                ),
            }}
          />
          <Tab.Screen
            name="Explore"
            component={Explore}
            options={{
              tabBarIcon: ({focused, color}) =>
                focused ? (
                  <View testID="exploreIcon">
                    <MaterialIcons
                      name="explore"
                      size={responsiveWidth(7)}
                      color={getColor()}
                    />
                  </View>
                ) : (
                  <View testID="image">
                    <Image
                      source={require('../assets/explore.png')}
                      resizeMode="contain"
                      style={[styles.bottomtabImage]}
                      tintColor={getColor()}
                    />
                  </View>
                ),
            }}
          />
          <Tab.Screen
            name="Upload"
            component={Explore}
            options={{
              tabBarLabel: '',
              tabBarIcon: ({color}) => (
                <AntDIcons
                  name="pluscircleo"
                  size={responsiveWidth(10)}
                  color={color}
                />
              ),

              tabBarIconStyle: {
                position: 'absolute',
                top: responsiveHeight(0),
                bottom: 0,
                left: 0,
                right: 0,
              },
            }}
          />
          <Tab.Screen
            name="Subscription"
            component={Subsciption}
            options={{
              tabBarIcon: ({focused, color}) =>
                !focused ? (
                  <Image
                    source={require('../assets/subscriptions2.png')}
                    resizeMode="contain"
                    style={styles.bottomtabImageSub}
                    tintColor={getColor()}
                  />
                ) : (
                  <Image
                    source={require('../assets/subscriptions.png')}
                    resizeMode="contain"
                    style={styles.bottomtabImage}
                    tintColor={getColor()}
                  />
                ),
            }}
          />
          <Tab.Screen
            name="Library"
            component={Library}
            options={{
              tabBarIcon: ({focused, color}) =>
                focused ? (
                  <MaterialIcons
                    name="video-library"
                    size={responsiveWidth(7)}
                    color={color}
                  />
                ) : (
                  <Image
                    source={require('../assets/library.png')}
                    resizeMode="contain"
                    style={styles.bottomtabImage}
                    tintColor={getColor()}
                  />
                ),
            }}
          />
        </Tab.Navigator>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    lightTheme: state.lightTheme,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

const styles = StyleSheet.create({
  bottomtabImage: {
    width: responsiveWidth(10),
    height: responsiveHeight(3),
  },
  bottomtabImageSub: {
    width: responsiveWidth(7),
  },
});
