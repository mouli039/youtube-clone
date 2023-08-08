import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Data} from '../redux/Data';
import HeaderUnit from '../components/HeaderUnit';
import { SearchBar } from 'react-native-screens';
import { heightPercentageToDP } from 'react-native-responsive-screen';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => () => (
  <></>
));
jest.mock('react-native-vector-icons/MaterialIcons', () => () => <></>);

jest.mock('react-native-vector-icons/AntDesign', () => () => <></>);
jest.mock('react-native-vector-icons/Ionicons', () => () => <></>);
jest.mock('react-native-vector-icons/Octicons', () => () => <></>);
jest.mock('react-native-vector-icons/SimpleLineIcons', () => () => <></>);
jest.mock('react-native-vector-icons/Foundation', () => () => <></>);

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: jest.fn(),
  }),
}));

describe('HeaderUnit testing', () => {
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

  const HeaderUnitScreenProps = {
    lightTheme: true,
    navigation: {
      navigate: jest.fn(),
      pop: jest.fn(),
    },
  };
  describe('HeaderUnit testing', () => {
    test('checking color scheme',async () => {
      render(
        <Provider store={myStore}>
          <HeaderUnit {...HeaderUnitScreenProps} />
        </Provider>,
      );

      // for text and Icons
      const color = screen.getByTestId('colorCheck');
      expect(color.props.style[1].color).toEqual('black');

      // for background color
      const backgroundColorCheck = screen.getByTestId('backgroundColor');
      expect(backgroundColorCheck.props.style.backgroundColor).toBe('white');
      const navBtn = screen.getByTestId('ProfileNavBtn');
      fireEvent.press(navBtn);
      expect(HeaderUnitScreenProps.navigation.navigate).toBeCalledWith(
        'Profile',
      );

      // for search button toggle

      const defaultHeader = screen.getByTestId('defaultHeader');
      expect(defaultHeader).toBeTruthy();
      const searchBtn = screen.getByTestId('searchBtn');
      fireEvent.press(searchBtn);
      const searchBar = screen.getByTestId('searchBar');
      const flatlist = screen.getByTestId('flatlist')
      const inputField = screen.getByTestId('inputField');
      expect(searchBar).toBeTruthy();
      expect(flatlist).toBeTruthy();
      expect(inputField.props.value).toBe('')
      await fireEvent.changeText(inputField, 'T');
      expect(inputField.props.value).toBe('T');
      const option = screen.getByTestId('option8');
      expect(option).toBeTruthy()
      await fireEvent.press(option)
      expect(inputField.props.value).toBe('The first Blender Open Movie from 2006')
      await fireEvent.changeText(inputField,'mou')
      const nodata = screen.getByTestId('Nodata');
      expect(nodata).toBeTruthy()
      const navigateBtn = screen.getByTestId('navigateBtn')
      await fireEvent.press(navigateBtn)
      expect(HeaderUnitScreenProps.navigation.navigate).toBeCalledWith('VideoPlay')
    });

    test('checking color scheme', () => {
      render(
        <Provider store={myStore1}>
          <HeaderUnit {...HeaderUnitScreenProps} />
        </Provider>,
      );

      const color = screen.getByTestId('colorCheck');
      expect(color.props.style[1].color).toEqual('white');

      // for background color
      const backgroundColorCheck = screen.getByTestId('backgroundColor');
      expect(backgroundColorCheck.props.style.backgroundColor).toBe('#131313');
    });
  });
});
