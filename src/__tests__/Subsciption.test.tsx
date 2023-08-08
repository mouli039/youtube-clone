import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import Profile from '../components/Profile';
import {createStore} from 'redux';
import {Data} from '../redux/Data';
import Subsciption from '../components/Subsciption';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => () => (
  <></>
));

jest.mock('react-native-vector-icons/AntDesign', () => () => <></>);

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

describe('subscription testing', () => {
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

  const subsciptionScreenProps = {
    lightTheme: true,
    navigation: {
      navigate: jest.fn(),    },
  };

  test('checking color scheme', () => {
    render(
      <Provider store={myStore}>
        <Subsciption {...subsciptionScreenProps} />
      </Provider>,
    );

    // for text and Icons
    const color = screen.getByTestId('colorCheck');
    expect(color.props.style[0].color).toEqual('black');

    //for background
    const backgroundColor = screen.getByTestId('backgroundColorCheck');
    expect(backgroundColor.props.style[1].backgroundColor).toEqual('white');

    //for container
    const containerColorCheck = screen.getByTestId('container');
    expect(containerColorCheck.props.style[1].backgroundColor).toEqual('#C4C4C444');

  });

  test('checking color scheme', () => {
    render(
      <Provider store={myStore1}>
        <Subsciption {...subsciptionScreenProps} />
      </Provider>,
    );

    const color = screen.getByTestId('colorCheck');
    expect(color.props.style[0].color).toEqual('white');

    //for background
    const backgroundColor = screen.getByTestId('backgroundColorCheck');
    expect(backgroundColor.props.style[1].backgroundColor).toEqual('#131313');

    //for container
    const containerColorCheck = screen.getByTestId('container');
    expect(containerColorCheck.props.style[1].backgroundColor).toEqual('#c4c4c411');
  });
});
