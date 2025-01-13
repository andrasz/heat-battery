import { Puffer } from "./puffer.js";

const p = new Puffer(40, 200, 28, 28, 28, 28, 77);


function updateWaterTemp() {
    queryTemps();
    const div = document.querySelector('.percent') as HTMLDivElement;
    div.textContent = p.getBatteryLvl().toFixed(1) + '%';
};

function queryTemps() {
    const inp1 = document.getElementById('temperatureInput1') as HTMLInputElement;
    const inp2 = document.getElementById('temperatureInput2') as HTMLInputElement;
    const inp3 = document.getElementById('temperatureInput3') as HTMLInputElement;

    p.setTemp(+inp1.value, +inp2.value, +inp3.value);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Loading ready');

    queryTemps();

    // p.logTemp();
    // p.logQ();
    // p.logLvl();
    updateWaterTemp();
    document.querySelectorAll('.temp-inp').forEach((inp) => {
        inp.addEventListener('input', updateWaterTemp);
    })
});

(window as any).updateWaterTemperature = updateWaterTemp;


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