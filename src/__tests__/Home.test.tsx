import React from 'react';
import Home from '../components/Home';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import myStore from '../redux/store';
import {createStore} from 'redux';
import {Data} from '../redux/Data';

// jest.mock('@react-navigation/native', () => {
//   const actualNavigation = jest.requireActual('@react-navigation/native');
//   const {View: MockView} = require('react-native');
//   return {
//     ...actualNavigation,
//     NavigationContainer: () => <MockView />,
//   };
// });

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => () => (
  <></>
));

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

describe('Home testing', () => {
  const myStore = createStore(() => {
    const initialState = {
      lightTheme: true,
      data: Data,
      activeVideo: 1,
      history: [],
    };
    return {
      ...initialState,
    };
  });

  const myStore1 = createStore(() => {
    const initialState = {
      lightTheme: false,
      data: Data,
      activeVideo: 1,
      history: [],
    };
    return {
      ...initialState,
    };
  });

  const homeProps = {
    navigation: {
      navigate: jest.fn(),
    },
  };

  test('Testing navigation through button', async () => {
    render(
      <Provider store={myStore}>
        <Home {...homeProps} />
      </Provider>,
    );
    //tesst cases for text color 
    const msg = screen.getByTestId('staticText1');
    expect(msg.props.style[1].color).toEqual('black');

    // navigation to VideoPlay Page
    const goToVideoPlayer = screen.getByTestId('video1');
    await fireEvent.press(goToVideoPlayer);
    expect(homeProps.navigation.navigate).toHaveBeenCalledWith('VideoPlay');
  });

  test('testing the text', () => {
    const {getByTestId} = render(
      <Provider store={myStore1}>
        <Home {...homeProps} />
      </Provider>,
    );
    const msg = getByTestId('staticText1');
    expect(msg.props.style[1].color).toEqual('white');
  });

});
