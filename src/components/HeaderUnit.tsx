import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Navbar from './Navbar';
import {playVideo} from '../redux';

interface IProps {
  lightTheme: boolean;
  data: any;
  navigation?: any;
  playVideo: (id: string | number) => {};
}

interface IState {
  inputField: boolean;
  input: string;
  list: any;
  id: number | string;
}

export class HeaderUnit extends Component<IProps, IState> {
  state: IState = {
    input: '',
    inputField: false,
    list: [],
    id: -1,
  };
  componentDidMount(): void {
    const list = this.props.data.map((ele: {title: string; id: any}) => ({
      id: ele.id,
      title: ele.title,
    }));
    this.setState({list: list});
  }

  navigateToProfile = () => {
    this.props.navigation.navigate('Profile');
  };

  inputHandler = async (e: string) => {
    // const filteredData = await this.props.data.reduce(
    //   (acc: any[], ele: {title: string}) =>
    //     !acc.includes(ele.title) ? [...acc, ele] : acc,
    //   [],
    // );
    // console.log(filteredData);
    const searchedData = await this.props.data.filter(
      (ele: {title: string}) => ele.title.includes(e),
      // ele.title.toLowerCase().includes(e),
    );
    this.setState(() => ({input: e, list: searchedData}));
  };

  search = () => {
    this.setState({inputField: !this.state.inputField});
  };

  toInput = (item: string, id: string | number) => {
    this.setState({input: item, id: id});
  };

  playThis = async () => {
    const {id} = this.state;
    await this.props.playVideo(id);
    this.props.navigation.navigate('VideoPlay');
    this.setState({input: '', inputField: false, id: -1});
  };

  getColor = () => (this.props.lightTheme ? 'black' : 'white');

  render() {
    const {lightTheme} = this.props;
    const {navigateToProfile, toInput, playThis, getColor} = this;
    const {input, inputField, list} = this.state;
    return (
      <View
        testID="backgroundColor"
        style={{
          backgroundColor: lightTheme ? 'white' : '#131313',
          flex: 1,
          paddingHorizontal: wp(2),
          paddingVertical: hp(1),
          justifyContent: 'space-between',
        }}>
        {!inputField ? (
          <View style={styles.header} testID="defaultHeader">
            <View style={styles.headerLeft}>
              <Image
                source={require('../assets/headingIcon.png')}
                style={styles.headerIcon}
              />
              <Text
                testID="colorCheck"
                style={[styles.headerText, {color: getColor()}]}>
                YouTube
              </Text>
            </View>
            <View style={[styles.headerRight, {backgroundColor: '#c4c4c411'}]}>
              <MaterialCommunityIcons
                name="cast"
                color={getColor()}
                size={30}
              />
              {
                <MaterialCommunityIcons
                  name="bell-badge-outline"
                  color={getColor()}
                  size={30}
                />
              }
              <TouchableOpacity testID="searchBtn" onPress={this.search}>
                <AntDesign name="search1" color={getColor()} size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                testID="ProfileNavBtn"
                onPress={navigateToProfile}>
                <Ionicons
                  name="person-circle-outline"
                  color={getColor()}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View testID="searchBar">
            <View style={[styles.inputContainer]}>
              <AntDesign
                name="arrowleft"
                size={wp(8)}
                color={getColor()}
                onPress={this.search}
              />
              <View
                style={{
                  backgroundColor: '#c4c4c411',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 20,
                  paddingHorizontal: wp(5),
                }}>
                <TextInput
                  testID="inputField"
                  style={[styles.input]}
                  onChangeText={this.inputHandler}
                  placeholder="Search YouTube"
                  placeholderTextColor={getColor()}
                  value={input}
                />
                <TouchableOpacity testID='navigateBtn' onPress={() => this.playThis()}>
                  <AntDesign name="search1" color={getColor()} size={30} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <FlatList
                testID="flatlist"
                data={list}
                renderItem={({item}) => (
                  <TouchableOpacity
                    testID={`option${item.id}`}
                    onPress={() => toInput(item.title, item.id)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: hp(1),
                      }}>
                      <MaterialCommunityIcons
                        name="arrow-top-left-thin"
                        size={hp(3)}
                        color={getColor()}
                      />
                      <Text
                        testID={`${item.title}`}
                        style={{
                          color: getColor(),
                          marginLeft: wp(3),
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
              />
              {list.length === 0 && (
                <Text
                  testID="Nodata"
                  style={{
                    textAlign: 'center',
                    color: getColor(),
                  }}>
                  No search data found
                </Text>
              )}
            </View>
          </View>
        )}

        {!inputField && <Navbar />}
      </View>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    data: state.data,
    lightTheme: state.lightTheme,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    playVideo: (id: string | number) => dispatch(playVideo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUnit);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: hp(1),
  },
  input: {
    borderRadius: 20,
    width: wp(70),
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: hp(1),
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
    borderRadius: 10,
    paddingHorizontal: hp('1'),
    paddingVertical: hp('1'),
  },
  headerIcon: {
    width: wp('7'),
  },
  headerText: {
    paddingHorizontal: wp('1'),
    fontSize: hp('3'),
    color: 'black',
    fontWeight: '800',
  },
});
