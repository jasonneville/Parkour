import { UserState, UPDATE_USER } from './types';

export const logInUser = (newUser: UserState) => {
  return {
    type: UPDATE_USER,
    payload: newUser
  };
};
