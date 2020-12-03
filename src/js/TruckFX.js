class TruckFX {
    constructor() {
        this.connected = false;
        this.color = new Array(4);

        for (var r = 0;r < 4;r++) {
            this.color[r] = new Array(5);

            for (var c = 0;c < 5;c++) {
                this.color[r][c] = 0;
            }
        }
    }

    trailerAxle() {

    }

    headlights() {

    }

    highBeams() {

    }

    truckAxle() {

    }

    blinkerLeft() {

    }

    hazards() {

    }

    blinkerRight() {

    }

    engine() {
        this.color[3][0] = 0x0000FF;

        chromaSDK.createEffect("CHROMA_CUSTOM", this.color);

        sleep(1000);

        chromaSDK.createEffect("CHROMA_NONE");
    }

    electric() {
        console.log(telemetry.isConnected());
        if (telemetry.isConnected()) {
            console.log(telemetry.getData("truck", "electricOn"));
            if (telemetry.getData("truck", "electricOn") == true) {
                this.color[3][1] = 0x00DD00;
            } else {
                this.color[3][1] = 0x0077DD;
            }
        } else {
            this.color[3][1] = 0xFFFFFFFF;
        }

        chromaSDK.createEffect("CHROMA_CUSTOM", this.color);
    }

    parkingBrake() {

    }

    beacon() {
        
    }

    test() {
        this.engine();
        this.electric();
    }

    free() {

    }
}