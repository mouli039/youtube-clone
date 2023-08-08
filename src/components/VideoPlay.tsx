import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component, createRef} from 'react';
import {connect} from 'react-redux';
import Video from 'react-native-video';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import {playVideo} from '../redux';

interface IProps {
  lightTheme: boolean;
  navigation?: any;
  activeVideo: string | number;
  data: any;
  playVideo: (id: string | number) => {};
}
interface IState {
  pause: boolean;
  controlls: boolean;
  duration: any;
  videoTime: number;
  video: any;
  volume: number;
  playableTime: number;
  sound: boolean;
  info: boolean;
}

export class VideoPlay extends Component<IProps, IState> {
  interval: any = null;

  videoTimer: any = createRef();

  state: IState = {
    pause: false,
    controlls: false,
    duration: 0,
    videoTime: 0,
    video: null,
    playableTime: 0,
    volume: 1,
    sound: false,
    info: false,
  };

  async componentDidMount() {
    const curr = this.props.data.filter(
      (ele: {id: string | number}) => ele.id === this.props.activeVideo,
    )[0];
    await this.setState(() => ({video: curr}));

    const durationSplit: number =
      this.state.video?.duration?.split(':')?.parseInt([0]) * 60 +
      parseInt([1]);

    this.setState({videoTime: durationSplit});

    this.enableControlls();
    this.timerOn();
  }

  timerOn = () => {
    this.interval = setInterval(() => {
      this.setState({duration: this.state.duration + 1});
    }, 1000);
  };

  startVideo = () => {
    this.setState(() => ({pause: false}));
    this.timerOn();
  };

  stopVideo = () => {
    this.setState(() => ({pause: true}));
    clearInterval(this.interval);
  };

  enableControlls = () => {
    this.setState(() => ({controlls: true}));
    setTimeout(() => {
      this.setState(() => ({controlls: false}));
    }, 4000);
  };

  goBack = () => {
    clearInterval(this.interval);
    this.setState({
      pause: false,
      controlls: false,
      duration: 0,
      videoTime: 0,
    });
    this.props.navigation.pop();
  };

  toVideoPlay = async (id: string | number) => {
    await this.stopVideo();
    await this.props.playVideo(id);
    const curr = await this.props.data.filter(
      (ele: {id: string | number}) => ele.id === this.props.activeVideo,
    )[0];
    this.setState(() => ({
      video: curr,
      pause: false,
      controlls: false,
      duration: 0,
      videoTime: 0,
    }));
    this.timerOn();
  };

  sliderTime = (value: string | number) => {
    this.videoTimer.seek(value);
    this.setState({duration: value});
  };

  volumeChange = (value: number) => {
    this.setState({volume: value});
    // setTimeout(() => {
    //   this.setState({sound: false});
    // }, 2000);
  };

  showSound = () => {
    this.setState(prev =>  ({sound: !prev.sound}));
    this.state.sound &&
      setTimeout(() => {
        this.setState({sound: false});
      }, 2000);
  };

  nextVideo = async (id: number | string) => {
    await clearInterval(this.videoTimer);
    const len = this.props.data.length;

    const num: number = Number(id);
    if (id === `${len}`) {
      this.toVideoPlay('1');
    } else {
      this.toVideoPlay(`${num + 1}`);
    }
  };

  prevVideo = async (id: number | string) => {
    await clearInterval(this.videoTimer);
    if (this.state.duration < 5) {
      const len = this.props.data.length;
      const num: number = Number(id);
      if (num === 1) {
        this.toVideoPlay(`${len}`);
      } else {
        this.toVideoPlay(`${num - 1}`);
      }
    } else {
      this.videoTimer.seek(0);
      this.setState({duration: 0});
    }
  };

  infoHandler = () => {
    this.setState(prev => ({info: !prev.info}));
  };

  getColor = () => (this.props.lightTheme ? 'black' : 'white');

  getBackgroundColor = () => (this.props.lightTheme ? 'white' : 'black');

  getSpecialBackgroundColor = () =>
    this.props.lightTheme ? '#C4C4C444' : '#c4c4c411';

  render() {
    const {data} = this.props;
    const {
      pause,
      controlls,
      duration,
      videoTime,
      video,
      playableTime,
      volume,
      sound,
      info,
    } = this.state;
    const {
      startVideo,
      stopVideo,
      enableControlls,
      goBack,
      toVideoPlay,
      sliderTime,
      volumeChange,
      showSound,
      nextVideo,
      infoHandler,
      getColor,
      getBackgroundColor,
      getSpecialBackgroundColor,
    } = this;
    if (duration - 1 === playableTime) {
      clearInterval(this.interval);
    }
    if (video === null) {
      return <Text></Text>;
    }
    return (
      <View
        testID="checkBackground"
        style={[styles.container, {backgroundColor: getBackgroundColor()}]}>
        <TouchableOpacity testID="enableControlls" onPress={enableControlls}>
          <Video
            source={{
              uri: video?.videoUrl,
            }}
            style={[styles.backgroundVideo]}
            paused={pause}
            resizeMode="stretch"
            ref={ref => {
              this.videoTimer = ref;
            }}
            onProgress={ele =>
              this.setState(() => ({playableTime: ele.seekableDuration}))
            }
            volume={volume}
          />
        </TouchableOpacity>
        <View style={[styles.videoContainer]}>
          {(controlls || pause || sound) && (
            <View testID="controlls">
              <View>
                <TouchableOpacity onPress={goBack} testID="backBtn">
                  <MCIcons
                    name="keyboard-backspace"
                    size={hp(4)}
                    style={{padding: hp(1)}}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              <View style={[styles.controls]}>
                <TouchableOpacity
                  testID="prevVideo"
                  onPress={() => this.prevVideo(video?.id)}>
                  <MCIcons name="skip-previous" size={hp('4')} color="white" />
                </TouchableOpacity>
                {pause ? (
                  <TouchableOpacity testID="playBtn" onPress={startVideo}>
                    <FontAwesome name="play" size={hp(4)} color="white" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity testID="pauseBtn" onPress={stopVideo}>
                    <MCIcons name="pause" size={hp(5)} color="white" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  testID="nextVideo"
                  onPress={() => nextVideo(video?.id)}>
                  <MCIcons name="skip-next" size={hp('4')} color="white" />
                </TouchableOpacity>
              </View>
              <View>
                <View style={styles.volumeLine}>
                  <Text style={styles.timer}>
                    0{Math.floor(duration / 60)}: {Math.floor(duration % 60)}/{' '}
                    {video?.duration}{' '}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity testID="soundIcon" onPress={showSound}>
                      <MCIcons
                        name="volume-high"
                        size={hp(3)}
                        color={'white'}
                      />
                    </TouchableOpacity>
                    {sound && (
                      <View testID="slider">
                        <Slider
                          style={{width: wp(20), height: 10}}
                          minimumValue={0}
                          value={volume}
                          maximumValue={10}
                          // maximumValue={playableTime}
                          minimumTrackTintColor="#FFFFFF"
                          maximumTrackTintColor="#000000"
                          thumbTintColor="#fff"
                          onValueChange={value => volumeChange(value)}
                        />
                      </View>
                    )}
                  </View>
                </View>
                <Slider
                testID='slider'
                  style={{width: wp(100), height: 20}}
                  minimumValue={0}
                  maximumValue={videoTime}
                  minimumTrackTintColor="red"
                  maximumTrackTintColor="white"
                  thumbTintColor="red"
                  value={duration}
                  onValueChange={value => sliderTime(value)}
                  />
              </View>
            </View>
          )}
        </View>
        <View>
          <View style={styles.videoTitleLine}>
            <View
              style={[
                styles.videoTitleLeft,
                {
                  justifyContent: 'space-between',
                  width: wp(100),
                  paddingHorizontal: wp(4),
                  paddingVertical: hp(0),
                },
              ]}>
              <View>
                <Text
                  testID="checkColor"
                  style={[
                    styles.videoTitleText,
                    {color: getColor(), fontSize: wp(4)},
                  ]}>
                  {video?.title}
                </Text>
                <View style={{flexDirection: 'row', marginBottom: hp(0.5)}}>
                  <Text style={[{color: getColor()}]}>
                    {video?.author} . {video?.views} views . {video?.uploadTime}{' '}
                    {'   '}
                  </Text>
                  <Text testID="infoHandle" onPress={infoHandler}>
                    {info ? 'less...' : 'more...'}
                  </Text>
                </View>
                {info && <Text>{video?.description}</Text>}
              </View>
              <MCIcons name="dots-vertical" size={hp('3')} color={getColor()} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: wp(3),
              }}>
              <Text
                testID="checkSpecialBackgroundColor"
                style={{
                  backgroundColor: getSpecialBackgroundColor(),
                  color: getColor(),
                  paddingHorizontal: wp(4),
                  paddingVertical: hp(1.5),
                  marginRight: wp(4),
                  borderRadius: 30,
                }}>
                {video?.author[0]}
              </Text>
              <Text style={{color: getColor()}}>
                {video?.author}
                {'   '}
              </Text>
              <Text style={{fontSize: wp(3)}}>{video?.subscriber}</Text>
            </View>
            <Text
              style={{
                backgroundColor: getColor(),
                color: getBackgroundColor(),
                paddingHorizontal: wp(3),
                paddingVertical: hp(0.8),
                marginRight: wp(4),
                borderRadius: 30,
              }}>
              Subscribe
            </Text>
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <View style={styles.eachVideo}>
                <TouchableOpacity
                testID={`videoPlay${item.id}`}
                onPress={() => toVideoPlay(item.id)}>
                  <ImageBackground
                    source={{
                      uri: item.thumbnailUrl,
                    }}
                    style={styles.backgroundImage}>
                    <Text style={styles.videoTime}>{item.duration}</Text>
                  </ImageBackground>
                </TouchableOpacity>
                <View style={styles.videoTitleLine}>
                  <View style={styles.videoTitleLeft}>
                    <Text
                      // testID='checkSpecialBackgroundColor'
                      style={{
                        backgroundColor: getSpecialBackgroundColor(),
                        color: getColor(),
                        paddingHorizontal: wp(4),
                        paddingVertical: hp(1.5),
                        marginRight: wp(4),
                        borderRadius: 30,
                      }}>
                      {item.author[0]}
                    </Text>
                    <View>
                      <Text
                        style={[styles.videoTitleText, {color: getColor()}]}>
                        {item.title}
                      </Text>
                      <Text style={[{color: getColor()}]}>
                        {item.author} . {item.views} views . {item.uploadTime}
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
          }}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    lightTheme: state.lightTheme,
    activeVideo: state.activeVideo,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    playVideo: (id: string | number) => dispatch(playVideo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlay);

const styles = StyleSheet.create({
  videoTitleLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: hp('1.5'),
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
  },
  eachVideo: {
    paddingVertical: hp('1'),
  },
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
  volumeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  timer: {
    color: 'white',
  },
  videoContainer: {
    height: hp(25),
    // alignItems:'center',
    // justifyContent: 'center',
    justifyContent: 'space-between',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
  },
  backgroundVideo: {
    height: hp(25),
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  videoTitleText: {
    fontWeight: '600',
    marginBottom: hp('0.5'),
  },
  videoTitleLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: wp('75%'),
  },
});
