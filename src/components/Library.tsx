import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDIcons from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface IProps {
  lightTheme: boolean;
  navigation?: any;
}
interface IState {}
export class Library extends Component<IProps, IState> {
  getColor = () => this.props.lightTheme ? 'black' : 'white'
  getBackgroundColor = () => this.props.lightTheme ? '#c4c4c444' : '#c4c4c411'
 
  render() {
    const {lightTheme} = this.props;
    const {getColor,getBackgroundColor} = this;
    return (
      <View
      testID='container'
        style={[
          styles.container,
          {backgroundColor: lightTheme ? 'white' : '#131313'},
        ]}>
        <Text
        testID='colorCheck'
          style={[
            styles.optionText,
            {
              color: getColor(),
              fontWeight: '500',
              marginBottom: hp(2),
            },
          ]}>
          Recent
        </Text>
        <View>
          <View style={[styles.options]}>
            <View
            testID='backgroundColorCheck'
              style={[
                styles.option,
                {backgroundColor: getBackgroundColor()},
              ]}>
              <MCIcons
                name="history"
                color={getColor()}
                size={wp(6)}
                style={styles.icons}
              />
              <Text
                style={[
                  styles.optionText,
                  {color: getColor()},
                ]}>
                History
              </Text>
            </View>
            <View
              style={[
                styles.option,
                {backgroundColor: getBackgroundColor()},
              ]}>
              <Octicons
                name="video"
                color={getColor()}
                size={wp(6)}
                style={styles.icons}
              />
              <Text
                style={[
                  styles.optionText,
                  {color: getColor()},
                ]}>
                Your videos
              </Text>
            </View>
          </View>

          <View style={[styles.options]}>
            <View
              style={[
                styles.option,
                {backgroundColor: getBackgroundColor()},
              ]}>
              <MCIcons
                name="arrow-collapse-down"
                color={getColor()}
                size={wp(6)}
                style={styles.icons}
              />
              <View>
                <Text
                  style={[
                    styles.optionText,
                    {color: getColor()},
                  ]}>
                  Downloads
                </Text>
                <Text
                  style={[
                    styles.optionSubText,
                    {color: getColor()},
                  ]}>
                  20 recommendations
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.option,
                {backgroundColor: getBackgroundColor()},
              ]}>
              <MCIcons
                name="movie-open-outline"
                color={getColor()}
                size={wp(6)}
                style={styles.icons}
              />
              <Text
                style={[
                  styles.optionText,
                  {color: getColor()},
                ]}>
                Your movies
              </Text>
            </View>
          </View>

          <View style={[styles.options]}>
            <View
              style={[
                styles.option,
                {backgroundColor: getBackgroundColor()},
              ]}>
              <MCIcons
                name="clock-time-four-outline"
                color={getColor()}
                size={wp(6)}
                style={styles.icons}
              />
              <View>
                <Text
                  style={[
                    styles.optionText,
                    {color: getColor()},
                  ]}>
                  Watch later
                </Text>
                <Text
                  style={[
                    styles.optionSubText,
                    {color: getColor()},
                  ]}>
                  videos you save for later
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.option,
                {backgroundColor: getBackgroundColor()},
              ]}>
              <AntDIcons
                name="like2"
                color={getColor()}
                size={wp(6)}
                style={styles.icons}
              />
              <View>
                <Text
                  style={[
                    styles.optionText,
                    {color: getColor()},
                  ]}>
                  Liked videos
                </Text>
                <Text
                  style={[
                    styles.optionSubText,
                    {color: getColor()},
                  ]}>
                  No videos
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.playListTitle]}>
          <Text
            style={[
              styles.optionText,
              {color: getColor(), fontWeight: '500'},
            ]}>
            Playlists
          </Text>
          <Text
            style={[
              styles.optionText,
              {color: getColor()},
            ]}>
            A-Z {'  '}
          </Text>
        </View>
        <View
          style={[
            styles.newList,
            {backgroundColor: getBackgroundColor()},
          ]}>
          <Text style={styles.plus}>+</Text>
          <Text style={[styles.newListText]}>New playlist</Text>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Library);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playListTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1),
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    flexDirection: 'row',
    width: wp(47.3),
    paddingVertical: hp(1),
    borderRadius: 5,
    marginBottom: hp(0.4),
    alignItems: 'center',
  },
  icons: {
    paddingHorizontal: wp(2),
    marginRight: wp(3),
  },
  optionText: {
    fontSize: wp(4.2),
  },
  optionSubText: {
    fontSize: wp(2.8),
  },
  newList: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  plus: {
    textAlign: 'center',
    width: wp(15),
    fontSize: wp(7),
    color: '#076AFE',
  },
  newListText: {
    fontSize: wp(4.4),
    color: '#076AFE',
  },
});
