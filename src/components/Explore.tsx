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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

export class Explore extends Component<IProps, IState> {

  getColor = () => (this.props.lightTheme ? 'black' : 'white')

  render() {
    const {lightTheme, data} = this.props;
    const {getColor} = this;
    return (
      <View
      testID='checkBackground'
        style={[
          styles.container,
          {backgroundColor: lightTheme ? 'white' : '#131313'},
        ]}>
        <ScrollView>
          <View>
            <View style={styles.options}>
              <Image
                style={{width: wp(46), borderRadius: 5, height: hp(5.2)}}
                source={require('../assets/Trending.png')}
              />
              <Image
                style={{width: wp(46), borderRadius: 5, height: hp(5.2)}}
                source={require('../assets/Music.png')}
              />
            </View>
            <View style={styles.options}>
              <Image
                style={{width: wp(46), borderRadius: 5, height: hp(5.2)}}
                source={require('../assets/Gaming.png')}
              />
              <Image
                style={{width: wp(46), borderRadius: 5, height: hp(5.2)}}
                source={require('../assets/News.png')}
              />
            </View>
            <View style={styles.options}>
              <Image
                style={{width: wp(46), borderRadius: 5, height: hp(5.2)}}
                source={require('../assets/Films.png')}
              />
              <Image
                style={{width: wp(46), borderRadius: 5, height: hp(5.2)}}
                source={require('../assets/Fashion.png')}
              />
            </View>
            <View style={styles.options}>
              <Image
                style={{width: wp(46), borderRadius: 5, height: hp(5.2)}}
                source={require('../assets/Learning.png')}
              />
              <Image
                style={{width: wp(46), borderRadius: 5, height: hp(5.2)}}
                source={require('../assets/Live.png')}
              />
            </View>
            <View>
              <Image
                source={require('../assets/Sport.png')}
                style={{width: wp(46), borderRadius: 5, height: hp(5.2)}}
              />
            </View>
          </View>
          <Text
          testID='checkColor'
            style={[
              styles.tendingText,
              {color: getColor()},
            ]}>
            Trending videos
          </Text>
            <View style={{paddingBottom:hp(12)}}>
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
                            style={[
                              styles.videoTitleText,
                              {color: getColor()},
                            ]}>
                            {ele.title}
                          </Text>
                          <Text
                            style={[{color: getColor()}]}>
                            Figma . 24k views . 8 months ago
                          </Text>
                        </View>
                      </View>
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        size={hp('3')}
                        color={getColor()}
                      />
                    </View>
                  </View>
                );
              })}
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Explore);

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
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
  },
  container: {
    flex: 1,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp(1),
  },
  tendingText: {
    fontSize: wp(5),
    marginTop: hp(2),
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
