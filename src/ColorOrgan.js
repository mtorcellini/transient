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

for (let i = 0; i < 12; i++) {
  colorChart[tones[i]] = 
}

console.log(colorChart);

// C being 261.63 Hz
// keep multiplying this by 2 until it's in the visible light spectrum
// roughly 400 - 800 THz

const makeVisible = (noteFreq) => {
  while (noteFreq < (4*Math.pow(10, 12)) ) {
    
  }
}



