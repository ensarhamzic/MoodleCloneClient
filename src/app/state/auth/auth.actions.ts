import { createAction, props } from '@ngrx/store';
import { IAuth } from 'src/app/models/auth.model';

export const register = createAction(
  '[Auth] Register',
  props<{ user: any; regType: string }>()
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ data: IAuth }>()
);
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ data: IAuth }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const checkToken = createAction(
  '[Auth] Check Token',
  props<{ token: string }>()
);
export const checkTokenSuccess = createAction(
  '[Auth] Check Token Success',
  props<{ data: IAuth }>()
);

export const logout = createAction('[Auth] Logout');
