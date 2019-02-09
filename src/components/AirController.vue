<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    import {AirConsole} from "../airconsole-1.7.0";

    export default {
        name: 'AirController',
        mounted() {
            this.initAirConsole();
        },
        data:() => ({
            airConsole: null
        }),
        methods: {
            initAirConsole() {
                this.airconsole = new AirConsole({orientation: AirConsole.ORIENTATION_LANDSCAPE, device_motion: 120});

                this.airconsole.onDeviceStateChange = function (deviceId, data) {
                    alert(deviceId);
                }
            }
        }
    }
</script>