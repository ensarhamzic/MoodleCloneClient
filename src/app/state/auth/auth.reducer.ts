import { IUser } from 'src/app/models/user.model';
import { createReducer, on } from '@ngrx/store';
import {
  checkToken,
  checkTokenSuccess,
  loginFailure,
  loginSuccess,
  logout,
  register,
  registerFailure,
  registerSuccess,
} from './auth.actions';

export interface AuthState {
  loading: boolean;
  osoba: IUser;
  token: string;
  role: string;
  verified: boolean;
  loggedIn: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  loading: false,
  error: null,
  osoba: {
    JMBG: '',
    ime: '',
    prezime: '',
    username: '',
    email: '',
  },
  token: '',
  role: '',
  verified: false,
  loggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(register, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(registerSuccess, (state, { data }) => {
    localStorage.setItem('token', data.token);
    return {
      ...state,
      loading: false,
      osoba: data.osoba,
      token: data.token,
      role: data.role,
      verified: data.verified,
      loggedIn: true,
      error: null,
    };
  }),
  on(registerFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
    };
  }),
  on(loginSuccess, (state, { data }) => {
    localStorage.setItem('token', data.token);
    return {
      ...state,
      loading: false,
      osoba: data.osoba,
      token: data.token,
      role: data.role,
      verified: data.verified,
      loggedIn: true,
      error: null,
    };
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error: error,
    };
  }),
  on(checkToken, (state, { token }) => {
    return {
      ...state,
      loading: true,
      token,
    };
  }),
  on(checkTokenSuccess, (state, { data }) => {
    return {
      ...state,
      loading: false,
      osoba: data.osoba,
      token: data.token,
      role: data.role,
      verified: data.verified,
      loggedIn: true,
      error: null,
    };
  }),
  on(logout, (state) => {
    localStorage.removeItem('token');
    return {
      ...state,
      loading: false,
      osoba: {
        JMBG: '',
        ime: '',
        prezime: '',
        username: '',
        email: '',
      },
      token: '',
      role: '',
      verified: false,
      loggedIn: false,
      error: null,
    };
  })
);
