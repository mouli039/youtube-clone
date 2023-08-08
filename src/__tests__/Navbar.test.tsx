import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Data} from '../redux/Data';
import Navbar from '../components/Navbar';
import {act} from 'react-test-renderer';

jest.mock('react-native-vector-icons/MaterialIcons', () => () => <></>);

jest.mock('react-native-vector-icons/AntDesign', () => () => <></>);
jest.mock('react-native-vector-icons/SimpleLineIcons', () => () => <></>);
jest.mock('react-native-vector-icons/Foundation', () => () => <></>);
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => () => (
  <></>
));

jest.mock('react-native-vector-icons/Octicons', () => () => <></>);

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: jest.fn(),
  }),
}));

describe('Navbar testing', () => {
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

  const navbarScreenProps = {
    lightTheme: true,
    navigation: {
      navigate: jest.fn(),
      pop: jest.fn(),
    },
  };

  test('checking color scheme', () => {
    render(
      <Provider store={myStore}>
        <Navbar {...navbarScreenProps} />
      </Provider>,
    );

    const bottomTab = screen.getByTestId('bottomTab');
    const TabBarIcon = bottomTab.props.children.props.children;
    for (let i = 0; i < TabBarIcon.length; i++) {
      act(() => {
        TabBarIcon[i].props.options.tabBarIcon({color: '#000', focused: true});
      });
      act(() => {
        TabBarIcon[i].props.options.tabBarIcon({color: '#000', focused: false});
      });
    }
  });
});
