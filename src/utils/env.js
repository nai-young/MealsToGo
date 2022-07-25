import { Platform } from 'react-native';

const liveHost = `https://us-central1-mealstogo-f0e63.cloudfunctions.net`;
const localHost = `http://localhost:5001/mealstogo-f0e63/us-central1`;

export const isDevelopment = process.env.NODE_ENV === 'development';

const isAndroid = Platform.OS === 'android';

export const host = isAndroid ? liveHost : isDevelopment ? localHost : liveHost;
//export const host = !isDevelopment || !isAndroid ? liveHost : localHost

export const isMock = false
