"use strict";
let statusText;
let webgldetected;
let mag;
function dotTwo(n) {
    if ('number' === typeof (n)) {
        return n.toFixed(2);
    }
    else {
        return "";
    }
}
function magnetometerReading() {
    if (statusText) {
        statusText.textContent = `Magnetometer: X=${dotTwo(mag.x)} Y=${dotTwo(mag.y)} Z=${dotTwo(mag.z)}`;
    }
}
function magnetometerError(e) {
    if (statusText) {
        statusText.textContent = `Error: ${e.error.message}`;
    }
}
function contentLoaded() {
    statusText = document.getElementById('statusText');
    webgldetected = document.getElementById('webgldetected');
    if (statusText) {
        if ('undefined' !== typeof (Magnetometer)) {
            try {
                mag = new Magnetometer({ frequency: 10 });
                statusText.textContent = `Created`;
                mag.onerror = magnetometerError;
                mag.onreading = magnetometerReading;
                mag.start();
                statusText.textContent = `Started`;
            }
            catch (e) {
                if (e && typeof (e) === 'object' && 'message' in e) {
                    statusText.textContent = `Exception: ${e.message}`;
                }
                else {
                    statusText.textContent = 'Exception raised with no diagnostic message';
                }
            }
        }
        else {
            statusText.textContent = `API not available.`;
        }
    }
    if (webgldetected) {
        let testCanvas = document.createElement('canvas');
        if (testCanvas.getContext("webgl")) {
            webgldetected.textContent = 'Supported by this browser';
        }
        else {
            webgldetected.textContent = 'Not supported by this browser';
        }
    }

    let sensor = new Magnetometer();
    sensor.start();
    let heading = Math.atan2(sensor.y, sensor.x) * (180 / Math.PI);
    console.log('Heading in degrees: ' + heading);
}
document.addEventListener('DOMContentLoaded', contentLoaded, false);
