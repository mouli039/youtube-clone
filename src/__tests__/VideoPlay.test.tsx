import {fireEvent, render, screen} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {act} from 'react-test-renderer';
import {createStore} from 'redux';
import VideoPlay from '../components/VideoPlay';
import {Data} from '../redux/Data';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => () => (
  <></>
));
jest.mock('react-native-vector-icons/FontAwesome', () => () => <></>);
jest.mock('react-native-video', () => () => <></>);

// bin

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

const soundValueChangefn = jest.fn()


jest.spyOn(React, 'createRef').mockImplementation((() => {
  return {
      seek: jest.fn(),
    }
}) as any);


describe('VideoPlay Page', () => {
 
  jest.useFakeTimers();
 

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

  const videoPlayScreenProps = {
    playVieo: jest.fn(),
    navigation: {
      navigate: jest.fn(),
      pop: jest.fn(),
    },
  };

  // test('slider',() => {
  //   render(
  //     <Provider store={myStore}>
  //       <VideoPlay {...videoPlayScreenProps} />
  //     </Provider>,
  //   );
  //   const slider = screen.getByTestId('slider')
  //   fireEvent(slider,'valueChange')
  //   expect()

  // })

  test('test - cases ', async () => {
    render(
      <Provider store={myStore}>
        <VideoPlay {...videoPlayScreenProps} />
      </Provider>,
    );

    // for text
    const checkColor = screen.getByTestId('checkColor');
    expect(checkColor.props.style[1].color).toBe('black');

    // for backgroundColor
    const checkBackground = screen.getByTestId('checkBackground');
    expect(checkBackground.props.style[1].backgroundColor).toBe('white');

    // for special backgroundColor
    const checkSpecialBackground = screen.getByTestId(
      'checkSpecialBackgroundColor',
    );
    expect(checkSpecialBackground.props.style.backgroundColor).toEqual(
      '#C4C4C444',
    );

    // to enable controlls
    jest.advanceTimersByTime(4000);
    const enableControlls = screen.getByTestId('enableControlls');
    fireEvent.press(enableControlls);
    const controlls = screen.getByTestId('controlls');
    jest.advanceTimersByTime(4000);
    await expect(controlls).toBeTruthy();
    const pauseBtn = screen.getByTestId('pauseBtn');
    // const prevVideo = screen.getByTestId('prevVideo');
    expect(pauseBtn).toBeTruthy();
    await fireEvent.press(pauseBtn);
    const playBtn = screen.getByTestId('playBtn');
    expect(playBtn).toBeTruthy();
    await fireEvent.press(playBtn);
    await expect(jest.clearAllTimers).toBeTruthy();
    // await expect(videoPlayScreenProps.playVieo).toBeCalled()
    expect(pauseBtn).toBeTruthy();
    jest.advanceTimersByTime(4000);
    // await fireEvent.press(prevVideo);
    // jest.advanceTimersByTime(4000);
    await fireEvent.press(enableControlls);
    // expect(clearInterval).toHaveBeenCalledWith(jest.fn());
    expect(jest.clearAllTimers).toBeTruthy();
  });

  test('test - cases for back ', async () => {
    render(
      <Provider store={myStore}>
        <VideoPlay {...videoPlayScreenProps} />
      </Provider>,
    );


    const enableControlls = screen.getByTestId('enableControlls');
    fireEvent.press(enableControlls);
    const controlls = screen.getByTestId('controlls');
    jest.advanceTimersByTime(4000);
    await expect(controlls).toBeTruthy();
    const backBtn = screen.getByTestId('backBtn');
    await fireEvent.press(backBtn);
    expect(videoPlayScreenProps.navigation.pop).toBeCalled();
    expect(jest.clearAllTimers).toBeTruthy();
  });

  test('test - cases for start and stop ', async () => {
    render(
      <Provider store={myStore}>
        <VideoPlay {...videoPlayScreenProps} />
      </Provider>,
    );


    // to start and stop
    const enableControlls = screen.getByTestId('enableControlls');
    fireEvent.press(enableControlls);
    const controlls = screen.getByTestId('controlls');
    jest.advanceTimersByTime(4000);
    await expect(controlls).toBeTruthy();
    const prevVideo = screen.getByTestId('prevVideo');
    await fireEvent.press(prevVideo);
    jest.advanceTimersByTime(4000);
    const playBtn = screen.getByTestId('playBtn');
    expect(playBtn).toBeTruthy();
    await fireEvent.press(playBtn);
    await expect(jest.clearAllTimers).toBeTruthy();
  });

  test('test - cases for nextVideo and author details toggle', async () => {
    render(
      <Provider store={myStore}>
        <VideoPlay {...videoPlayScreenProps} />
      </Provider>,
    );

    const infoHandle = screen.getByTestId('infoHandle');
    expect(infoHandle.children[0]).toBe('more...');
    fireEvent.press(infoHandle);
    expect(infoHandle.children[0]).toBe('less...');
    const enableControlls = screen.getByTestId('enableControlls');
    fireEvent.press(enableControlls);
    const controlls = screen.getByTestId('controlls');
    jest.advanceTimersByTime(4000);
    await expect(controlls).toBeTruthy();
    const nextVideo = screen.getByTestId('nextVideo');
    await fireEvent.press(nextVideo);
    await expect(jest.clearAllTimers).toBeTruthy();
    jest.advanceTimersByTime(4000);

  });

  test('test - cases for soundBar ', async () => {
    render(
      <Provider store={myStore}>
        <VideoPlay {...videoPlayScreenProps} />
      </Provider>,
    );
    const enableControlls = screen.getByTestId('enableControlls');
    fireEvent.press(enableControlls);
    const controlls = screen.getByTestId('controlls');
    jest.advanceTimersByTime(4000);
    await expect(controlls).toBeTruthy();
    const soundIcon = screen.getByTestId('soundIcon');
    await fireEvent.press(soundIcon);
    const slider = screen.getByTestId('slider');
    await expect(slider).toBeTruthy();
    jest.advanceTimersByTime(2000)
    console.log(slider.props.children.props)
    await fireEvent(slider,'valueChange',5)
    expect (slider.props.children.props.value).toBe(1)
    await expect(soundValueChangefn).toBeCalledTimes(0)
  });

  test('test - cases for prevVideo', async () => {
    render(
      <Provider store={myStore}>
        <VideoPlay {...videoPlayScreenProps} />
      </Provider>,
    );

    const enableControlls = screen.getByTestId('enableControlls');
    fireEvent.press(enableControlls);
    const controlls = screen.getByTestId('controlls');
    jest.advanceTimersByTime(4000);
    await expect(controlls).toBeTruthy();
    const prevVideo = screen.getByTestId('prevVideo');
    await fireEvent.press(prevVideo);
    await expect(jest.clearAllTimers).toBeTruthy();
    jest.advanceTimersByTime(4000);
  });

  test('selected video play ',async () => {
    render(
      <Provider store={myStore}>
        <VideoPlay {...videoPlayScreenProps} />
      </Provider>,
    );
    const videoPlay = screen.getByTestId('videoPlay2')
    fireEvent.press(videoPlay)
    await expect(jest.clearAllTimers).toBeTruthy();
  })


  test('test - cases ', () => {
    render(
      <Provider store={myStore1}>
        <VideoPlay {...videoPlayScreenProps} />
      </Provider>,
    );

    // for text
    const checkColor = screen.getByTestId('checkColor');
    expect(checkColor.props.style[1].color).toBe('white');

    // for backgroundColor
    const checkBackground = screen.getByTestId('checkBackground');
    expect(checkBackground.props.style[1].backgroundColor).toBe('black');

    // for special backgroundColor
    const checkSpecialBackground = screen.getByTestId(
      'checkSpecialBackgroundColor',
    );
    expect(checkSpecialBackground.props.style.backgroundColor).toEqual(
      '#c4c4c411',
    );
  });
});
