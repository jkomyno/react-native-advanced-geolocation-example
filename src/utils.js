import { Platform } from 'react-native';

export const IS_ANDROID = Platform.OS === 'android';
export const NEEDS_RUNTIME_PERMISSIONS = Platform.Version >= 23;
