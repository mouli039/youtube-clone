import {Data} from '../Data';
import {CHANGE_THEME, PLAY_VIDEO} from './types';

export const initialState: {
  lightTheme: boolean;
  data: any;
  activeVideo: number | string;
  history: any;
} = {
  lightTheme: true,
  data: Data,
  activeVideo: 1,
  history: [],
};

const reducer = (
  state = initialState,
  action: {type: string; payload: {theme: string; id: number | string}},
) => {
  const {type, payload} = action;
  switch (type) {
    case CHANGE_THEME:
      return {
        ...state,
        lightTheme: payload.theme === 'light',
      };
    case PLAY_VIDEO:
      state = {...state, activeVideo: payload.id};
      return {
        ...state,
      };
    default: {
      return state;
    }
  }
};

export default reducer;
