export class Puffer {
  public R: number;
  public H: number;
  protected T1: number;
  protected T2: number;
  protected T3: number;
  protected N = 200;
  protected Q0: number;
  protected QMax: number;

  constructor(
    r: number,
    h: number,
    t1 = 25,
    t2 = 25,
    t3 = 25,
    t0 = 25,
    tMax = 80
  ) {
    this.R = r;
    this.H = h;
    this.setTemp(t1, t2, t3);
    this.Q0 = this.calcHeat(t0, t0, t0);
    this.QMax = this.calcHeat(tMax, tMax, tMax);
  }

  setTemp(t1, t2, t3) {
    this.T1 = t1;
    this.T2 = t2;
    this.T3 = t3;
  }

  getBatteryLvl() {
    const Q = this.calcHeat();
    const p = ((Q - this.Q0) / (this.QMax - this.Q0)) * 100;
    return p;
  }

  getCurrentQ() {
    return this.calcHeat();
  }

  logQ() {
    console.log(`Puffer Q: ${(this.calcHeat() / 1000).toFixed(2)} kJ`);
  }

  logLvl() {
    console.log(`Puffer lvl: ${this.getBatteryLvl().toFixed(1)}%`);
  }

  logTemp() {
    console.group('Temperature')
    console.log(`--   ${0}: ${this.puffTemp(0).toFixed(1)} °C`);
    console.log(`--  ${25}: ${this.puffTemp(25).toFixed(1)} °C`);
    console.log(`--  ${50}: ${this.puffTemp(50).toFixed(1)} °C`);
    console.log(`--  ${75}: ${this.puffTemp(75).toFixed(1)} °C`);
    console.log(`-- ${100}: ${this.puffTemp(100).toFixed(1)} °C`);
    console.log(`-- ${125}: ${this.puffTemp(125).toFixed(1)} °C`);
    console.log(`-- ${150}: ${this.puffTemp(150).toFixed(1)} °C`);
    console.log(`-- ${175}: ${this.puffTemp(175).toFixed(1)} °C`);
    console.log(`-- ${200}: ${this.puffTemp(200).toFixed(1)} °C`);
    console.groupEnd();
  }

  protected calcHeat(t1 = this.T1, t2 = this.T2, t3 = this.T3) {
    let s = 0;
    let ms = 0;
    const ro = 1000; // kg/m3
    const dh = this.H / this.N;
    for (let i = 0; i < this.N; i++) {
      const dV = (Math.PI * this.R * this.R * dh) / (100 * 100 * 100); // m3
      const h = i * dh; // cm
      const t = this.puffTemp(h, t1, t2, t3);
      ms += ro * dV;
      const Q = ro * dV * this.c(t) * t;
      s += Q;
    }
    return s;
  }

  protected c = (t) => {
    const fc = getLinearFunc(25, 4181, 100, 2080);
    return fc(t);
  };

  protected puffTemp(h, t1 = this.T1, t2 = this.T2, t3 = this.T3) {
    const f1 = getLinearFunc(25, t3, 100, t2);
    const f2 = getLinearFunc(100, t2, 175, t1);

    if (h < 100) {
      return f1(h);
    } else if (h > 100) {
      return f2(h);
    } else {
      return +t2;
    }
  }
}

export function getLinearFunc(x1, y1, x2, y2) {
  return (x) => {
    return ((y2 - y1) / (x2 - x1)) * x + y1 - ((y2 - y1) / (x2 - x1)) * x1;
  };
}

// const p = new Puffer(40, 200, 60, 62, 51, 28, 77);

// p.logTemp();
// p.logQ();
// p.logLvl();
// p.setTemp(66, 70, 66);
// p.logLvl();
