function ChromaSDK() {
    var uri;
    var timerID;
}

function onTimer() {
    var req = new XMLHttpRequest();

    req.open("PUT", uri + "/heartbeat", true);
    req.setRequestHeader("content-type", "application/json");
    req.send(null);
}

ChromaSDK.prototype = {
    init: function () {
        var data = JSON.stringify({
            "title": "XenonSCSChroma",
            "description": "Custom ATS/ETS2 Razer Chroma App",
            "author": {
                "name": "NeonCarbide",
                "contact": "www.google.ca"
            },
            "device_supported": ["keypad"],
            "category": "application"
        });

        var req = new XMLHttpRequest();

        req.open("POST", "http://localhost:54235/razer/chromasdk", true);
        req.setRequestHeader("content-type", "application/json");
        req.send(data);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                uri = JSON.parse(req.responseText)["uri"];

                console.log(uri);

                timerId = setInterval(onTimer, 1000);
            }
        }
    },
    uninit: function () {
        var req = new XMLHttpRequest();

        req.open("DELETE", uri, true);
        req.setRequestHeader("content-type", "application/json");
        req.send(null);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                console.log(req.responseText);
            }
        }
    },
    createEffect: function(effect, data) {
        var obj;

        if (effect == "CHROMA_NONE") {
            obj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            obj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            obj = JSON.stringify({ "effect": effect, "param": color });
        }

        var req = new XMLHttpRequest();

        console.log(obj);
        req.open("PUT", uri + "/keypad", false);
        req.setRequestHeader("content-type", "application/json");
        req.send(obj);
        console.log("createEffect(" + effect + ", " + data + ") returns " + JSON.parse(req.responseText)["result"]);
    },
    preCreateEffect: function(effect, data) {
        var obj;

        if (effect == "CHROMA_NONE") {
            obj = JSON.stringify({ "effect": effect });
        } else if (effect == "CHROMA_CUSTOM") {
            obj = JSON.stringify({ "effect": effect, "param": data });
        } else if (effect == "CHROMA_STATIC") {
            var color = { "color": data };
            obj = JSON.stringify({ "effect": effect, "param": color });
        }

        var req = new XMLHttpRequest();

        console.log(obj);
        req.open("POST", uri + "/keypad", false);
        req.setRequestHeader("content-type", "application/json");
        req.send(obj);
        console.log("preCreateEffect(" + effect + ", " + data + ") returns " + JSON.parse(req.responseText)["result"]);

        return JSON.parse(req.responseText)["id"];
    },
    setEffect: function(id) {
        var obj = JSON.stringify({ "id": id });
        var req = new XMLHttpRequest();

        console.log(obj);
        req.open("PUT", uri + "/effect", false);
        req.setRequestHeader("content-type", "application/json");
        req.send(obj);
        console.log("setEffect(" + id + ") returns " + JSON.parse(req.responseText)["result"]);
    },
    deleteEffect: function(id) {
        var obj = JSON.stringify({ "id": id });
        var req = new XMLHttpRequest();

        console.log(obj);
        req.open("DELETE", uri + "/effect", false);
        req.setRequestHeader("content-type", "application/json");
        req.send(obj);
        console.log("deleteEffect(" + id + ") returns " + JSON.parse(req.responseText)["result"]);
    },
    deleteEffects: function(ids) {
        var obj = ids;
        var req = new XMLHttpRequest();

        console.log(obj);
        req.open("DELETE", uri + "/effect", false);
        req.setRequestHeader("content-type", "application/json");
        req.send(obj);
        console.log("deleteEffects() returns " + JSON.parse(req.responseText));
    },
}