export interface UserState {
  email: string;
  password: string;
  phoneNumber: string;
  fullName: string;
  mode: string;
  //add a total earnings field here?
}

export const UPDATE_USER = 'UPDATE_USER';

interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: UserState;
}

export type UserActionTypes = UpdateUserAction;
