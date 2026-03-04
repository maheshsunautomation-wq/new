/* ============================ */
/* 🚨 EMERGENCY → GOOGLE SCRIPT */
/* ============================ */

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycby4USAcXNRDoK4iFzIiWDaaQ1ACrBz3ISErPstUA1z54f1tKvLk8FCQQIIKmVyx7zp5/exec";

let callTriggered = false;

function checkEmergencyAndCall(parsedData, sensors, thresholds) {

    if (!parsedData || parsedData.length === 0) return;

    let emergency = false;

    sensors.forEach((sensor, i) => {
        const maxValue = Math.max(...parsedData.map(d => d.values[i]));
        if (maxValue > thresholds[sensor]) {
            emergency = true;
        }
    });

    if (emergency && !callTriggered) {

        callTriggered = true;

        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify({
                message: "Emergency Alert! Sensor threshold exceeded."
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log("📞 Call Triggered:", data);
        })
        .catch(err => {
            console.error("Error:", err);
        });
    }

    if (!emergency) {
        callTriggered = false;
    }
}