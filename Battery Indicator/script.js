const batteryIndicator = document.querySelector(".current-battery");
const batteryStateMessage = document.querySelector(".state");
const batteryPercentageIndicator = document.querySelector(
  ".battery-percentage"
);

let batteryIsCharging = false;
const veryLowBattery = 10;
const lowBattery = 25;
const middleBattery = 50;
const highBattery = 75;

const percentage = 100;

// Helper functions
const handleBatteryColor = (battery) => {
  const batteryLevel = battery.level * percentage;
  if (batteryLevel <= veryLowBattery) {
    batteryIndicator.style.backgroundColor = "#EE1A25";
  } else if (batteryLevel <= lowBattery) {
    batteryIndicator.style.backgroundColor = "#F7941D";
  } else if (batteryLevel <= middleBattery) {
    batteryIndicator.style.backgroundColor = "#E8E71D";
  } else if (batteryLevel <= highBattery) {
    batteryIndicator.style.backgroundColor = "#AFD235";
  } else {
    batteryIndicator.style.backgroundColor = "#6ABD43";
  }
};

const handleBatteryLevel = (battery) => {
  batteryIndicator.style.height = `${Math.floor(battery.level * percentage)}%`;
};

const handleBatteryStatus = (battery) => {
  batteryPercentageIndicator.textContent = `${Math.floor(
    battery.level * percentage
  )}%`;
};

const handleBatteryChargingState = (battery) => {
  batteryIsCharging = battery.charging;
  if (batteryIsCharging) {
    batteryStateMessage.textContent = "Charging...";
  } else {
    batteryStateMessage.textContent = "";
  }
};

// Main function
async function monitorBattery() {
  try {
    const battery = await navigator.getBattery();
    handleBatteryChargingState(battery);

    // On page load states
    handleBatteryLevel(battery);
    handleBatteryColor(battery);
    handleBatteryStatus(battery);

    // On charging status change
    battery.addEventListener("chargingchange", () =>
      handleBatteryChargingState(battery)
    );

    // On battery level change states
    battery.addEventListener("levelchange", () => {
      handleBatteryLevel(battery);
      handleBatteryColor(battery);
      handleBatteryStatus(battery);
    });
  } catch (error) {
    console.error("Error accessing battery information:", error);
  }
}
monitorBattery();
