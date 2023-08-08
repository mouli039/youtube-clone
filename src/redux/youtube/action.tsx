import {CHANGE_THEME, PLAY_VIDEO} from './types';

export const changeTheme = (theme: string) => {
  return {
    type: CHANGE_THEME,
    payload: {
      theme: theme,
    },
  };
};

export const playVideo = (id: string | number) => {
  return {
    type: PLAY_VIDEO,
    payload: {
      id: id,
    },
  };
};
