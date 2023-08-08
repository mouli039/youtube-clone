import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import myStore from '../redux/store';
import Profile from '../components/Profile';
import {createStore} from 'redux';
import {Data} from '../redux/Data';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => () => (
  <></>
));

jest.mock('react-native-vector-icons/AntDesign', () => () => <></>);

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

describe('Profile testing', () => {
  const myStore = createStore(() => {
    const initialState = {
      lightTheme: true,
      data: Data,
      activeVideo: 1,
      history: [],
    };
    return {...initialState};
  });

  const myStore1 = createStore(() => {
    const initialState = {
      lightTheme: false,
      data: Data,
      activeVideo: 1,
      history: [],
    };
    return {...initialState};
  });

  const profilesProps = {
    lightTheme: true,
    navigation: {
      navigate: jest.fn(),
      pop: jest.fn(),
    },
  };

  test('checking color scheme', () => {
    render(
      <Provider store={myStore}>
        <Profile {...profilesProps} />
      </Provider>,
    );

    // for text and Icons
    const color = screen.getByTestId('colorCheck');
    expect(color.props.style[1].color).toEqual('black');

    //for background
    const backgroundColor = screen.getByTestId('backgroundColorCheck');
    expect(backgroundColor.props.style[1].backgroundColor).toEqual('#c4c4c477');

    //for container
    const containerColorCheck = screen.getByTestId('container');
    expect(containerColorCheck.props.style[1].backgroundColor).toEqual('white');

    //for navigation
    const navigationBtn = screen.getByTestId('backButton');
    fireEvent.press(navigationBtn);
    expect(profilesProps.navigation.pop).toBeCalled();
  });

  test('checking color scheme', () => {
    render(
      <Provider store={myStore1}>
        <Profile {...profilesProps} />
      </Provider>,
    );

    const color = screen.getByTestId('colorCheck');
    expect(color.props.style[1].color).toEqual('white');

    //for background
    const backgroundColor = screen.getByTestId('backgroundColorCheck');
    expect(backgroundColor.props.style[1].backgroundColor).toEqual('#313131');

    //for container
    const containerColorCheck = screen.getByTestId('container');
    expect(containerColorCheck.props.style[1].backgroundColor).toEqual('black');
  });
});
