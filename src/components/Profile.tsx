import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';

interface IProps {
  lightTheme: boolean;
  navigation?: any;
}
interface IState {}

class Profile extends Component<IProps, IState> {
  toBack = () => {
    this.props.navigation.pop();
  };

  getColorTheme = () => (this.props.lightTheme ? 'black' : 'white');

  getBackgroundColor = () => (this.props.lightTheme ? '#c4c4c477' : '#313131');

  getBackground = () => (this.props.lightTheme ? 'white' : 'black');

  render() {
    const {lightTheme} = this.props;
    const {getColorTheme, toBack, getBackgroundColor, getBackground} = this;
    return (
      <View
      testID='container' style={[styles.container, {backgroundColor: getBackground()}]}>
        <View style={styles.options}>
          <View style={[styles.option, {backgroundColor: getBackground()}]}>
            <TouchableOpacity onPress={toBack} testID="backButton">
              <AntDesign
                color={getColorTheme()}
                name="left"
                size={hp(3)}
                style={styles.titleIcon}
              />
            </TouchableOpacity>
            <Text style={[styles.Title]} testID={'text'}>
              Account
            </Text>
          </View>
          <View
          testID='backgroundColorCheck'
            style={[styles.option, {backgroundColor: getBackgroundColor()}]}>
            <MaterialCommunityIcons
              color={getColorTheme()}
              name="contacts-outline"
              style={styles.optionIcon}
              size={hp('4')}
            />
            <View>
              <Text
                testID="colorCheck"
                style={[styles.optionText, {color: getColorTheme()}]}>
                Leslie Alexander
              </Text>
              <Text style={[styles.optionText, {color: getColorTheme()}]}>
                leslie123@gmail.com
              </Text>
              <Text style={[styles.optionText, {color: '#076AFE'}]}>
                Manage your Google Accoount
              </Text>
            </View>
          </View>
          <View
            style={[styles.option, {backgroundColor: getBackgroundColor()}]}>
            <MaterialCommunityIcons
              color={getColorTheme()}
              name="contacts-outline"
              style={styles.optionIcon}
              size={hp('4')}
            />

            <Text style={[styles.optionText, {color: getColorTheme()}]}>
              Your Channel
            </Text>
          </View>
          <View
            style={[styles.option, {backgroundColor: getBackgroundColor()}]}>
            <MaterialCommunityIcons
              color={getColorTheme()}
              name="incognito"
              style={styles.optionIcon}
              size={hp('4')}
            />

            <Text style={[styles.optionText, {color: getColorTheme()}]}>
              YouTube Studio
            </Text>
          </View>
          <View
            style={[styles.option, {backgroundColor: getBackgroundColor()}]}>
            <MaterialCommunityIcons
              color={getColorTheme()}
              name="incognito"
              style={styles.optionIcon}
              size={hp('4')}
            />

            <Text style={[styles.optionText, {color: getColorTheme()}]}>
              Time watched
            </Text>
          </View>
          <View
            style={[styles.option, {backgroundColor: getBackgroundColor()}]}>
            <MaterialCommunityIcons
              color={getColorTheme()}
              name="incognito"
              style={styles.optionIcon}
              size={hp('4')}
            />

            <Text style={[styles.optionText, {color: getColorTheme()}]}>
              Get YouTube Premium
            </Text>
          </View>
          <View
            style={[styles.option, {backgroundColor: getBackgroundColor()}]}>
            <MaterialCommunityIcons
              color={getColorTheme()}
              name="incognito"
              style={styles.optionIcon}
              size={hp('4')}
            />

            <Text style={[styles.optionText, {color: getColorTheme()}]}>
              Purchases and memberships
            </Text>
          </View>
          <View
            style={[styles.option, {backgroundColor: getBackgroundColor()}]}>
            <MaterialCommunityIcons
              color={getColorTheme()}
              name="incognito"
              style={styles.optionIcon}
              size={hp('4')}
            />

            <Text style={[styles.optionText, {color: getColorTheme()}]}>
              Switch account
            </Text>
          </View>
          <View
            style={[styles.option, {backgroundColor: getBackgroundColor()}]}>
            <MaterialCommunityIcons
              color={getColorTheme()}
              name="incognito"
              style={styles.optionIcon}
              size={hp('4')}
            />

            <Text style={[styles.optionText, {color: getColorTheme()}]}>
              Turn on Incognito
            </Text>
          </View>
          <View
            style={[styles.option, {backgroundColor: getBackgroundColor()}]}>
            <MaterialCommunityIcons
              color={getColorTheme()}
              name="incognito"
              style={styles.optionIcon}
              size={hp('4')}
            />

            <Text style={[styles.optionText, {color: getColorTheme()}]}>
              Your data in YouTube
            </Text>
          </View>
          <View
            style={[styles.option, {backgroundColor: getBackgroundColor()}]}>
            <AntDesign
              color={getColorTheme()}
              name="setting"
              style={styles.optionIcon}
              size={hp('4')}
            />

            <Text style={[styles.optionText, {color: getColorTheme()}]}>
              Settings
            </Text>
          </View>
          <View
            style={[styles.option, {backgroundColor: getBackgroundColor()}]}>
            <MaterialCommunityIcons
              color={getColorTheme()}
              name="incognito"
              style={styles.optionIcon}
              size={hp('4')}
            />

            <Text style={[styles.optionText, {color: getColorTheme()}]}>
              Help and feedback
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={[styles.footerText, {color: getColorTheme()}]}>
            Privacy Policy Terms of Services
          </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp('1'),
  },
  options: {
    height: hp(94),
    justifyContent: 'space-between',
  },
  footer: {
    height: hp(5),
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  footerText: {
    textAlign: 'center',
  },
  option: {
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: hp(1.4),
    alignItems: 'center',
    marginHorizontal: wp('2'),
  },
  optionIcon: {
    paddingHorizontal: wp(5),
  },
  optionText: {
    fontSize: wp(4),
  },
  Title: {
    width: wp(80),
    textAlign: 'center',
    color: '#076AFE',
    fontSize: wp(6),
  },
  titleIcon: {
    alignSelf: 'center',
    paddingLeft: wp(2),
  },
});
