import { appStorageMMKV } from '../../App';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APP_CONST } from '../../Config/Colors';

interface AUTH_TYPE {
  isLoading: boolean;
  userLoggedIn: boolean;
  userName: string | null;
  email?: string | null;
  token?: string | null;
}

const INITIAL_STATE: AUTH_TYPE = {
  isLoading: true,
  userLoggedIn: false,
  userName: null,
  email: null,
  token: null,
};


export const authSlice = createSlice({
  name: 'authSlice',
  initialState: INITIAL_STATE,
  reducers: {
    userLoginAction: (state, action: PayloadAction<AUTH_TYPE>) => {
      const jsonValue = JSON.stringify(action.payload);
      appStorageMMKV.set(APP_CONST.USER_LOGIN, jsonValue);
      return { ...state, ...action.payload };
    },
    checkUserLoginAction: (state, action: PayloadAction<AUTH_TYPE | null>) => {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    },
    userLoginLogOutAction: (state) => {
      appStorageMMKV.remove(APP_CONST.USER_LOGIN);
      return {
        ...state,
        isLoading: false,
        userLoggedIn: false,
        userName: null,
        email: null,
      };
    },
  },
});


export default authSlice.reducer;
