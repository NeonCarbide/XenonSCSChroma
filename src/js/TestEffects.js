var timerId;
var blink = 0;

function TestEffects() {
    this.damageFrames = false;
    this.damageOn;
    this.damageOff;

    this.test = false;
}

TestEffects.prototype = {
    testEffect: function() {
        if (this.test == false) {
            this.test = true;
        }

        chromaSDK.setEffect(chromaSDK.preCreateEffect("CHROMA_STATIC", 0x2070A0));

        sleep(500);

        chromaSDK.setEffect(chromaSDK.preCreateEffect("CHROMA_NONE"));
    },
    free: function() {
        if (this.test == true) {
            chromaSDK.deleteEffect(this.testEffect);

            this.test = false;
        }
    }
}