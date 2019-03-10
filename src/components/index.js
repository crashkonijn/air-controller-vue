import AirAxis from './Axis';
import AirButton from './Button';
import AirController from './Controller';
import AirGyroscope from './Gyroscope';
import AirJoystick from './Joystick';
import AirPage from './Page';
import AirPan from './Pan';
import AirPosition from './Position';
import AirProfileImage from './ProfileImage';
import AirSwipe from './Swipe';

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