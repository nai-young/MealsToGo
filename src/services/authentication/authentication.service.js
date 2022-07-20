import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export const loginRequest = (auth, email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerRequest = (auth, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logOutRequest = (auth) => {
  return signOut(auth);
};
