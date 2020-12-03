class Telemetry {
    constructor() {}

    getJSON() {
        var req = new XMLHttpRequest();

        req.open("GET", "http://10.0.0.117:25555/api/ets2/telemetry", false);
        req.send(null);

        return req.responseText;
    }

    getDataGroup(type) {
        var json = this.getJSON();
        var data = JSON.stringify(JSON.parse(json)[type])

        return data;
    }

    getData(group, type) {
        var json = this.getDataGroup(group)
        var data = JSON.stringify(JSON.parse(json)[type])

        return data;
    }

    isConnected() {
        var state = JSON.parse(this.getDataGroup("game"))["connected"];
        
        return state;
    }
}

