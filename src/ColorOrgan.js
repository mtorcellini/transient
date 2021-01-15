// noteToFreq(numSteps) {
//   return +(440 * Math.pow(Math.pow(2, 1 / 12), numSteps)).toFixed(2);
// }

// getHalfSteps(note) {
//   // var base = "A",
//   // baseOct = 4;
//   let dist = 0;
//   dist += note.oct * 12 - 48 + (this.tones.indexOf(note.root) - 9);
//   return dist;
// }

const colorChart = {};
const tones = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

// for (let i = 0; i < 12; i++) {
//   colorChart[tones[i]] = 
// }

console.log(colorChart);

// C being 261.63 Hz


// keep multiplying by 2 until a frequency is in the visible light range
// roughly 400 - 800 THz
const makeVisible = (freq) => {
  while (freq < (400*Math.pow(10, 12)) ) {
    freq *= 2;
  }
  thz = parseFloat((freq * Math.pow(10, -12)).toFixed(3));
  return thz;
}

console.log(makeVisible(261.63));

const wav2rgb = (l) => {
  // expects nm

  // change gamma depending on display
  let gamma = 1;
  let attenuation;

  let R;
  let G;
  let B;

  if (l >= 380 && l <= 440) {
    attenuation = 0.3 + 0.7 * (l-380)/(440-380)
    R = Math.pow( ((attenuation * (440-l)/(440-380)) ), gamma);
    G = 0.0;
    B = Math.pow(attenuation, gamma);
  } else if (l > 440 && l <= 490) {
    R = 0.0;
    G = Math.pow( ((l-440)/(490-440)), gamma );
    B = 1.0;
  } else if (l > 490 && l <= 510) {
    R = 0.0;
    G = 1.0;
    B = Math.pow( ((510-l)/(510-490)), gamma );
  } else if (l < 510 && l <= 580) {
    R = Math.pow( ((l-510)/(580-510)), gamma );
    G = 1.0;
    B = 0.0;
  } else if (l > 580 && l <= 645) {
    R = 1.0;
    G = Math.pow( ((645-l)/(645-580)), gamma );
    B = 0.0;
  } else if (l > 645 && l <=750) {
    attenuation = 0.3 + 0.7*(750-l)/(750-645);
    R = Math.pow(attenuation, gamma);
    G = 0.0;
    B = 0.0;
  } else {
    R = 0.0;
    G = 0.0;
    B = 0.0;
  }

  R *= 255;
  G *= 255;
  B *= 255;

  let rgb = [R, G, B];

  return rgb;

}