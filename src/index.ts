import { Puffer } from "./puffer.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log('Loading ready');
    const p = new Puffer(40, 200, 60, 62, 51, 28, 77);

    p.logTemp();
    p.logQ();
    p.logLvl();
    p.setTemp(66, 70, 66);
    p.logLvl();
});

// function updateWaterTemperature() {
//     const input = document.getElementById('temperatureInput');
//     const water = document.getElementById('water');
//     let temp = parseInt(input.value, 10);

//     // Clamp the temperature value between 0 and 100
//     if (temp < 0) temp = 0;
//     if (temp > 100) temp = 100;

//     // Adjust the gradient based on the temperature
//     if (temp < 25) {
//       // Cold (blue-green gradient)
//       water.style.background = 'linear-gradient(to top, #00aaff, #00ff00)';
//     } else if (temp < 50) {
//       // Cool to Warm (green-yellow gradient)
//       water.style.background = 'linear-gradient(to top, #00ff00, #ffff00)';
//     } else if (temp < 75) {
//       // Warm to Hot (yellow-orange gradient)
//       water.style.background = 'linear-gradient(to top, #ffff00, #ff8800)';
//     } else {
//       // Hot (orange-red gradient)
//       water.style.background = 'linear-gradient(to top, #ff8800, #ff0000)';
//     }
//   }