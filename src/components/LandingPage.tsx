import {Image, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';

interface IProps {
  lightTheme: boolean;
  navigation: any;
}
interface IState {}

class LandingPage extends Component<IProps, IState> {
  componentDidMount(): void {
    setTimeout(() => {
      this.props.navigation.push('HeaderUnit');
    }, 3000);
  }

  render() {
    const {lightTheme} = this.props;
    return (
      // <View testID='containerColor' style={lightTheme ? styles.container : styles.Dcontainer}>
      <View
        testID="containerColor"
        style={[
          styles.container,
          {backgroundColor: lightTheme ? 'white' : '#282828'},
        ]}>
        <Image source={require('../assets/icon.png')} style={styles.icon} />
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Dcontainer: {
    backgroundColor: '#282828',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 120,
    height: 80,
  },
});
