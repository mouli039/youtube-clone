import {render, screen} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Explore from '../components/Explore';
import {Data} from '../redux/Data';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => () => (
  <></>
));

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

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

  const exploreScreenProps = {
    navigation: {
      navigate: jest.fn(),
    },
  };

  it('test - cases ', () => {
    render(
      <Provider store={myStore}>
        <Explore {...exploreScreenProps} />
      </Provider>,
    );

    // for text
    const checkColor = screen.getByTestId('checkColor');
    expect(checkColor.props.style[1].color).toBe('black');
    // for backgroundColor
    const checkBackground = screen.getByTestId('checkBackground')
    expect(checkBackground.props.style[1].backgroundColor).toEqual('white')
  });

  it('test - cases ', () => {
    render(
      <Provider store={myStore1}>
        <Explore {...exploreScreenProps} />
      </Provider>,
    );

    // for text
    const checkColor = screen.getByTestId('checkColor');
    expect(checkColor.props.style[1].color).toBe('white');
     // for backgroundColor
     const checkBackground = screen.getByTestId('checkBackground')
     expect(checkBackground.props.style[1].backgroundColor).toEqual('#131313')
  });
});
