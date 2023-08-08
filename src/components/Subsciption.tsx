import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';

interface IProps {
  lightTheme: boolean;
  navigation?: any;
  data: any;
}
interface IState {}

export class Subsciption extends Component<IProps, IState> {
  getColor = () => (this.props.lightTheme ? 'black' : 'white');
  render() {
    const {lightTheme, data} = this.props;
    const {getColor} = this;
    return (
      <View
        testID='backgroundColorCheck'
        style={[
          styles.container,
          {backgroundColor: lightTheme ? 'white' : '#131313'},
        ]}>
        <View style={[styles.status]}>
          <View style={[styles.eachStatus]}>
            <Image
              style={[styles.statusImage]}
              source={require('../assets/status1.png')}
            />
            <Text testID='colorCheck' style={[{color: getColor()}]}>Technical</Text>
          </View>
          <View style={[styles.eachStatus]}>
            <Image
              style={[styles.statusImage]}
              source={require('../assets/status2.png')}
            />
            <Text style={[{color: getColor()}]}>Netflix</Text>
          </View>
          <View style={[styles.eachStatus]}>
            <Image
              style={[styles.statusImage]}
              source={require('../assets/status3.png')}
            />
            <Text style={[{color: getColor()}]}>Marvel Stu.</Text>
          </View>
          <View style={[styles.eachStatus]}>
            <Image
              style={[styles.statusImage]}
              source={require('../assets/status4.png')}
            />
            <Text style={[{color: getColor()}]}>CharliMarie</Text>
          </View>
          <View>
            <Text
            testID='container'
              style={[
                styles.statusAll,
                {
                  backgroundColor: lightTheme ? '#C4C4C444' : '#c4c4c411',
                  color: '#076AFE',
                },
              ]}>
              All
            </Text>
          </View>
        </View>
        <View style={styles.flatlist}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text
              style={[
                styles.shorts,
                {color: 'white', backgroundColor: 'black'},
              ]}>
              All
            </Text>
            <Text style={[styles.shorts, {color: getColor()}]}>Today</Text>
            <Text style={[styles.shorts, {color: getColor()}]}>
              Continue watching
            </Text>
            <Text style={[styles.shorts, {color: getColor()}]}>React</Text>
            <Text style={[styles.shorts, {color: getColor()}]}>Unwatched</Text>
            <Text style={[styles.shorts, {color: getColor()}]}>UX Design</Text>
          </ScrollView>
        </View>
        <View style={{paddingBottom: hp(30)}}>
          <ScrollView>
            {data.map((ele: any, ind: number) => {
              return (
                <View style={styles.eachVideo} key={ind}>
                  <TouchableOpacity>
                    <ImageBackground
                      source={{
                        uri: ele.thumbnailUrl,
                      }}
                      style={styles.backgroundImage}>
                      <Text style={styles.videoTime}>{ele.duration}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                  <View style={styles.videoTitleLine}>
                    <View style={styles.videoTitleLeft}>
                      <Image
                        source={require('../assets/figmaIcon.png')}
                        style={{
                          bottom: 2,
                          position: 'relative',
                          marginRight: wp(1),
                        }}
                      />
                      <View>
                        <Text
                          style={[styles.videoTitleText, {color: getColor()}]}>
                          {ele.title}
                        </Text>
                        <Text style={[{color: getColor()}]}>
                          Figma . 24k views . 8 months ago
                        </Text>
                      </View>
                    </View>
                    <MCIcons
                      name="dots-vertical"
                      size={hp('3')}
                      color={getColor()}
                    />
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    lightTheme: state.lightTheme,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Subsciption);

const styles = StyleSheet.create({
  videoTime: {
    backgroundColor: 'black',
    color: 'white',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: 10,
  },
  backgroundImage: {
    height: hp(25),
    width: wp(98),
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
  },
  container: {
    flex: 1,
  },
  statusImage: {
    width: wp(20),
    height: hp(9.8),
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eachStatus: {
    alignItems: 'center',
  },
  statusAll: {
    height: hp(11),
    width: wp(10),
    flex: 1,
    textAlign: 'center',
    paddingVertical: hp(4.5),
  },
  shorts: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2'),
    backgroundColor: '#c4c4c444',
    paddingVertical: hp('0.8'),
    paddingHorizontal: wp('3'),
    borderRadius: 10,
    marginRight: wp('4'),
  },
  flatlist: {
    flexDirection: 'row',
    marginTop: hp(1.5),
  },
  video: {
    borderRadius: 20,
  },
  videoTitleText: {
    color: 'black',
    fontWeight: '600',
    marginBottom: hp('0.5'),
  },
  videoTitleLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: wp('75%'),
  },
  videoTitleLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: hp('1.5'),
    justifyContent: 'space-between',
  },
  eachVideo: {
    paddingVertical: hp('1'),
  },
});
