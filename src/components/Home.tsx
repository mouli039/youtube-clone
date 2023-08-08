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
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {playVideo} from '../redux';

interface IProps {
  lightTheme: boolean;
  navigation: any;
  data: any;
  playVideo: (id: string | number) => {};
}
interface IState {}

export class Home extends Component<IProps, IState> {
  toVideoPlay = async (id: string | number) => {
    await this.props.playVideo(id);
    this.props.navigation.navigate('VideoPlay');
  };

  toGetTheme= () => this.props.lightTheme ? 'black' : 'white'

  render() {
    const {lightTheme, data} = this.props;
    const {toVideoPlay,toGetTheme} = this;
    return (
      <View
        style={{backgroundColor: lightTheme ? 'white' : '#131313', flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topics}>
            <View style={styles.shorts}>
              <Image
                source={require('../assets/shortsIcon.png')}
                style={styles.shortImage}
              />
              <Text style={[styles.shortText]}>
                Shorts
              </Text>
            </View>
            <View style={styles.flatlist}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Text style={styles.shortsB}>
                  All
                </Text>
                <Text style={styles.shorts}>
                  UX Design
                </Text>
                <Text style={styles.shorts}>
                  UX Design
                </Text>
                <Text style={styles.shorts}>
                  All
                </Text>
                <Text style={styles.shorts}>
                  UX Design
                </Text>
                <Text style={styles.shorts}>
                  UX Design
                </Text>
              </ScrollView>
            </View>
          </View>
          <View style={{paddingBottom: hp(12)}}>
            {data.map((ele: any, ind: number) => {
              return (
                <View style={styles.eachVideo} key={ind}>
                  <TouchableOpacity
                    testID={`video${ele.id}`}
                    onPress={() => toVideoPlay(ele.id)}>
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
                        testID={`staticText${ele.id}`}
                        // testID={`checkTheme${ele.id}`}
                          style={[
                            styles.videoTitleText,
                            {color: toGetTheme()},
                          ]}>
                          {ele.title}
                        </Text>
                        <Text style={[{color: toGetTheme()}]}>
                          Figma . 24k views . 8 months ago
                        </Text>
                      </View>
                    </View>
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={hp('3')}
                      color={toGetTheme()}
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
  return {
    playVideo: (id: string | number) => dispatch(playVideo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
  flatlist: {
    flexDirection: 'row',
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
  topics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3'),
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
  shortsB: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2'),
    backgroundColor: 'black',
    paddingVertical: hp('0.8'),
    paddingHorizontal: wp('3'),
    borderRadius: 10,
    marginRight: wp('4'),
  },
  shortImage: {
    width: wp('5'),
  },
  shortText: {},
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerIcon: {
    height: hp('3'),
    width: wp('9'),
  },
});
