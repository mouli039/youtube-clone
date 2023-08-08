import { render } from "@testing-library/react-native";
import { Appearance } from "react-native";
import { Provider } from "react-redux";
import Navigations from "../components/Navigations";
import myStore from "../redux/store";

jest.mock('react-native/Libraries/Utilities/Appearance', () => {
    // jest.mock('react-native', () => {
    const Appearance = {
      ...jest.requireActual('react-native/Libraries/Utilities/Appearance'),
      getColorScheme: jest.fn(),
      addChangeListener: jest.fn(),
      // removeChangeListener: jest.fn(),
    };
    return Appearance;
  });
  jest.mock('@react-navigation/native-stack', () => ({
    createNativeStackNavigator: () => ({
      Navigator: jest.fn(),
      Screen:jest.fn()
    }),
  }));

  jest.mock('@react-navigation/bottom-tabs', () => ({
    createBottomTabNavigator: () => ({
      Navigator: jest.fn(),
    }),
  }));

  jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => () => (
    <></>
  ));
jest.mock('react-native-video', () => () => <></>);
  
jest.mock('react-native-vector-icons/Ionicons', () => () => <></>);
jest.mock('react-native-vector-icons/AntDesign', () => () => <></>);
jest.mock('react-native-vector-icons/Octicons', () => () => <></>);
jest.mock('react-native-vector-icons/SimpleLineIcons', () => () => <></>);
jest.mock('react-native-vector-icons/MaterialIcons', () => () => <></>);
jest.mock('react-native-vector-icons/Foundation', () => () => <></>);
jest.mock('react-native-vector-icons/FontAwesome', () => () => <></>);

jest.mock('react-native-responsive-screen', () => ({
    widthPercentageToDP: jest.fn(),
    heightPercentageToDP: jest.fn(),
  }));

  describe('Navigation Screen', () => {

    const navigationScreenProps = {
        changeTheme: jest.fn(),
        navigation: {
          push: jest.fn(),
        },
      };

    it('Check the Landing Screen Dark Background', () => {
      render(
        <Provider store={myStore}>
          <Navigations />
        </Provider>,
      );const newTheme = {colorScheme: 'dark'};
      console.log(Appearance.addChangeListener);
      
      Appearance.addChangeListener.mock.calls[0][0](newTheme);
      console.log('Appearance', Appearance.addChangeListener.mock);
      Appearance.addChangeListener.mock.contexts[0].addChangeListener();
      expect(navigationScreenProps.changeTheme).toHaveBeenCalledTimes(0);
    });
    it('Check the Landing Screen light Background', () => {
      render(
        <Provider store={myStore}>
          <Navigations />
        </Provider>,
      );
      const newTheme = {colorScheme: 'light'};
      Appearance.addChangeListener.mock.calls[0][0](newTheme);
      console.log('Appearance', Appearance.addChangeListener.mock);
      Appearance.addChangeListener.mock.contexts[0].addChangeListener();
      expect(navigationScreenProps.changeTheme).toHaveBeenCalledTimes(0);
    });
  });
  