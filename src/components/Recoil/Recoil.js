import { atom } from 'recoil';

export const isUserLogged = atom({
  key: 'logged',
  default: false,
});
