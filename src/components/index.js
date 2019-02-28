import AirAxis from './AirAxis';
import AirButton from './AirButton';
import AirController from './AirController';
import AirGyroscope from './AirGyroscope';
import AirJoystick from './AirJoystick';
import AirPage from './AirPage';
import AirPan from './AirPan';
import AirPosition from './AirPosition';
import AirProfileImage from './AirProfileImage';
import AirSwipe from './AirSwipe';

export default {
    install(Vue) {
        Vue.component('air-axis', AirAxis);
        Vue.component('air-button', AirButton);
        Vue.component('air-controller', AirController);
        Vue.component('air-gyroscope', AirGyroscope);
        Vue.component('air-joystick', AirJoystick);
        Vue.component('air-page', AirPage);
        Vue.component('air-pan', AirPan);
        Vue.component('air-position', AirPosition);
        Vue.component('air-profile-image', AirProfileImage);
        Vue.component('air-swipe', AirSwipe);
    }
}