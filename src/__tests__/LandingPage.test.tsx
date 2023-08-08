import {render, screen} from '@testing-library/react-native';
import React from 'react';
import {Provider, shallowEqual} from 'react-redux';
import {act} from 'react-test-renderer';
import {createStore} from 'redux';
import LandingPage from '../components/LandingPage';
// import Explore from '../components/Explore';
import {Data} from '../redux/Data';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => () => (
  <></>
));

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  const actualNavigation = jest.requireActual('@react-navigation/native');
  const {View: MockView} = require('react-native');
  return {
    ...actualNavigation,
    NavigationContainer: () => <MockView />,
  };
});

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('Explore Page', () => {
  const myStore1 = createStore(() => {
    const initialState = {
      lightTheme: false,
      data: Data,
      activeVideo: 1,
      history: [],
    };
    return {...initialState};
  });

  const myStore = createStore(() => {
    const initialState = {
      lightTheme: true,
      data: Data,
      activeVideo: 1,
      history: [],
    };
    return {...initialState};
  });

  const landingPageScreenProps = {
    changeTheme: jest.fn(),
    navigation: {
      push: jest.fn(),
    },
  };

  it('Screen visibility Time', () => {
    render(
      <Provider store={myStore}>
        <LandingPage {...landingPageScreenProps} />
      </Provider>,
    );
    expect(setTimeout).toHaveBeenCalled;
    act(() => {
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
      jest.advanceTimersByTime(3000);
      expect(landingPageScreenProps.navigation.push).toHaveBeenCalledWith(
        'HeaderUnit',
      );
    });
  });

  it('test - cases ', () => {
    render(
      <Provider store={myStore}>
        <LandingPage {...landingPageScreenProps} />
      </Provider>,
    );
    const checkBackground = screen.getByTestId('containerColor');
    expect(checkBackground.props.style[1].backgroundColor).toEqual('white');
  });

  it('test - cases ', () => {
    render(
      <Provider store={myStore1}>
        <LandingPage {...landingPageScreenProps} />
      </Provider>,
    );

    const checkBackground = screen.getByTestId('containerColor');
    expect(checkBackground.props.style[1].backgroundColor).toEqual('#282828');
  });
});
