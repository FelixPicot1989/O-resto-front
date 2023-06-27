// Import the atom function from the Recoil library
import { atom } from 'recoil';

// Definition of the isUserLogged atom.
// This is a Boolean atom that indicates whether the user is logged in or not. The default value is false.
export const isUserLogged = atom({
  key: 'logged', // A unique identifier for the atom
  default: false, // The atom's default value
});

// UserInfo atom definition.
// This atom contains information about the connected user (id, last name, first name, email, roles and reservations). By default, its value is null.
export const userInfo = atom({
  key: 'user', // A unique identifier for the atom
  default: null, // The atom's default value
});

// Review atom definition.
// This is an atom that will contain a list of all reviews. By default, it's an empty array.
export const reviews = atom({
  key: 'reviews', // A unique identifier for the atom
  default: [], // The atom's default value
});
