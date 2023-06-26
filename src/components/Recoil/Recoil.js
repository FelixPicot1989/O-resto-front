import { atom } from 'recoil';

export const isUserLogged = atom({
  key: 'logged',
  default: false,
});

export const userInfo = atom({
  key: 'user',
  default: null,
});

export const reviews = atom({
  key: 'reviews',
  default: [],
});
