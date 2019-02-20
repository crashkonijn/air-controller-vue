<template>
    <div id="app">
        <air-controller page="loading">
            <air-page name="loading">
                <h1>Loading..</h1>
            </air-page>
            <air-page name="claim">
                <air-tap-button name="claim" anchor="center-center"></air-tap-button>
            </air-page>
            <air-page name="full">
                <h1>All players are claimed</h1>
            </air-page>
            <air-page name="menu">
                <air-tap-button id="buttons" name="menu" value="0"></air-tap-button>
                <air-tap-button id="swipe" name="menu" value="1"></air-tap-button>
                <air-tap-button id="pan" name="menu" value="2"></air-tap-button>
                <air-tap-button id="motion" name="menu" value="3"></air-tap-button>
                <air-tap-button id="profile" name="menu" value="6"></air-tap-button>
                <air-tap-button id="back" name="unclaim"></air-tap-button>
            </air-page>
            <air-page name="buttons">
                <air-tap-button name="tap"></air-tap-button>
                <air-hold-button name="hold"></air-hold-button>
                <div class="number-parent">
                    <air-tap-button name="number" value="1">Number: 1</air-tap-button>
                    <air-tap-button name="number" value="2">Number: 2</air-tap-button>
                    <air-tap-button name="number" value="3">Number: 3</air-tap-button>
                </div>
                <air-tap-button name="hero" premium-only></air-tap-button>
                <air-tap-button name="back"></air-tap-button>
            </air-page>
            <air-page name="swipe">
                <air-swipe name="swipe">
                    <h1>Swipe on the screen</h1>
                </air-swipe>
                <air-tap-button name="back"></air-tap-button>
            </air-page>
            <air-page name="pan">
                <air-pan name="pan">
                    <h1>Drag on the screen</h1>
                </air-pan>
                <air-tap-button name="back"></air-tap-button>
            </air-page>
            <air-page name="motion">
                <air-gyroscope name="motion">
                    <h1>Rotate the phone</h1>
                </air-gyroscope>
                <air-tap-button name="back"></air-tap-button>
            </air-page>
            <air-page name="profile">
                <air-profile-image name="profile" anchor="center-center"></air-profile-image>
                <air-tap-button name="back"></air-tap-button>
            </air-page>
        </air-controller>
    </div>
</template>

<script>
    import AirController from "./components/AirController";
    import AirPage from "./components/AirPage";
    import AirTapButton from "./components/AirTapButton";
    import AirHoldButton from "./components/AirHoldButton";
    import AirSwipe from "./components/AirSwipe";
    import AirPan from "./components/AirPan";
    import AirGyroscope from "./components/AirGyroscope";
    import AirProfileImage from "./components/AirProfileImage";

    export default {
        name: 'app',
        components: {
            AirProfileImage,
            AirGyroscope, AirPan, AirSwipe, AirHoldButton, AirTapButton, AirPage, AirController},
    }
</script>