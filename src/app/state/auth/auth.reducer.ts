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
  teacherRegisterSuccess,
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
    jmbg: '',
    ime: '',
    prezime: '',
    username: '',
    pol: '',
    email: '',
  },
  token: '',
  role: localStorage.getItem('role') || '',
  verified: false,
  loggedIn: !!localStorage.getItem('token'),
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
    localStorage.setItem('role', data.role);
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
  on(teacherRegisterSuccess, (state, { data }) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
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
    localStorage.setItem('role', data.role);
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
    localStorage.removeItem('role');
    return {
      ...state,
      loading: false,
      osoba: {
        jmbg: '',
        ime: '',
        prezime: '',
        pol: '',
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
