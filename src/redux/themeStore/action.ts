import { themSlice } from './reducers';
import { Dispatch } from 'redux';
import { APP_CONST } from '../../Config/Colors';
import { appStorageMMKV } from '../../App';

export const checkTheme = () => async (dispatch?: Dispatch) => {
  const appThem = appStorageMMKV.getString(APP_CONST.CHECK_THEME)
  if (!appThem) {
    dispatch && dispatch({
      type: APP_CONST.CHECK_THEME,
      payload: false,
    });
    return;
  }

  const jsonValue = JSON.parse(appThem);
  dispatch && dispatch(themSlice.actions.checkThemAction(jsonValue.isDarkTheme));
};

