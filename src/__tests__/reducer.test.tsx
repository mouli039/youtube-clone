import {initialState} from '../redux/youtube/reducer';
import reducer from '../redux/youtube/reducer';
import {CHANGE_THEME, PLAY_VIDEO} from '../redux/youtube/types';

describe('reducer ', () => {
    
    it('should return the initial state', () => {
    const type = CHANGE_THEME;
    const payload = {theme: 'light', id: '2'};
    const action = {type: type, payload: payload};
    expect(reducer(undefined,action)).toEqual({});
  });


  test('light theme test', () => {
    const type = CHANGE_THEME;
    const payload = {theme: 'light', id: '2'};
    const action = {type: type, payload: payload};

    expect(reducer(initialState,action)).toBeTruthy()
    const checkState = reducer(initialState, action);
    expect(checkState.lightTheme).toBe(true);
  });

  test('dark theme test', () => {
    const type = CHANGE_THEME;
    const payload = {theme: 'dark', id: '2'};
    const action = {type: type, payload: payload};

    const currState = reducer(initialState, action);
    expect(currState.lightTheme).toBe(false);
  });

  test('play video test', () => {
    const type = PLAY_VIDEO;
    const action = {type: type, payload: {theme: 'light', id: '3'}};
    const checkState = reducer(initialState, action);
    expect(checkState.activeVideo).toBe('3');
  });

  test('default test ', () => {
    const action = {type: '', payload: {theme: 'light', id: '3'}};
    const checkState = reducer(initialState, action);
    expect(checkState).toBe(initialState);
  });
});
