import { PermissionsAndroid } from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {
  IS_ANDROID,
  NEEDS_RUNTIME_PERMISSIONS,
} from './utils';

const checkIsLocation = async () => {
  let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
    message: 'Allow location permission.',
    ok: 'Great',
    cancel: 'Not now'
  });
  return check.status === 'enabled';
} 

const defaults = {
  enableHighAccuracy: false,
  timeout: 15000,
  maximumAge: 1000,
};

const PromisedLocation = (options = defaults) =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
  
const requestPositionPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Allow location permission',
        'message': 'We need get your current position, please',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}

export const getCurrentPosition = async () => {
  const granted = await requestPositionPermissionAndroid();
  const checked = await checkIsLocation();

  console.log('granted', granted);

  try {
    if (IS_ANDROID) {
      if (NEEDS_RUNTIME_PERMISSIONS) {
        if (!granted) {
          throw new Error(`Runtime permission denied`);
        }
      }
      if (!checked) {
        throw new Error(`User didn't want to activate GPS`);
      }
    }

    const position = await PromisedLocation();
    return position;
  } catch (e) {
    console.warn('error@getCurrentPosition', e.message);
    return null;
  }
};
