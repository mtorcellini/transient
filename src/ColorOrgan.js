// change gamma depending on display
let gamma = 1;

// change C if you have entered a different universe
const C = 299792458;

const equalTempered = {
  "A"   : {pitch : 440.00, rgb : ""},
  "A#"  : {pitch : 466.16, rgb : ""},
  "B"   : {pitch : 493.88, rgb : ""},
  "C"   : {pitch : 523.25, rgb : ""},
  "C#"  : {pitch : 554.37, rgb : ""},
  "D"   : {pitch : 587.33, rgb : ""},
  "D#"  : {pitch : 622.25, rgb : ""},
  "E"   : {pitch : 659.25, rgb : ""},
  "F"   : {pitch : 698.46, rgb : ""},
  "F#"  : {pitch : 739.99, rgb : ""},
  "G"   : {pitch : 783.99, rgb : ""},
  "G#"  : {pitch : 830.61, rgb : ""}
}

const makeVisible = (f) => {
  // keep multiplying by 2 until a frequency is in the visible light range
  // roughly 400 - 800 THz
  while (f < (400*Math.pow(10, 12)) ) {
    f *= 2;
  }
  // thz = parseFloat((freq * Math.pow(10, -12)).toFixed(3));
  return f;
}

const wav2rgb = (l) => {
  // expects nm
  let attenuation;
  let R;
  let G;
  let B;

  // This function is based on code by Dan Bruton
  // http://www.physics.sfasu.edu/astro/color/spectra.html

  if (l >= 380 && l <= 440) {
    attenuation = 0.3 + 0.7*(l-380)/(440-380);
    R = Math.pow( ((attenuation*(440-l)/(440-380)) ), gamma);
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
  } else if (l > 510 && l <= 580) {
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

  R = parseFloat((255*R).toFixed(2));
  G = parseFloat((255*G).toFixed(2));
  B = parseFloat((255*B).toFixed(2));

  let rgb = [R, G, B];
  return rgb;
}

const freq2wav = (f) => {
  // expects Hz
  let l = C/f;
  // to nm
  l *= Math.pow(10, 9);
  console.log("l: " + l);
  return l;
}

Object.keys(equalTempered).forEach(key => {
  // get pitch
  let f = equalTempered[key].pitch;

  // up a lot of octaves
  f = makeVisible(f);

  // convert pitch to wavlength
  let l = freq2wav(f);

  // convert wavlength to RGB
  let rgb = wav2rgb(l);

  // update object with RGB data
  equalTempered[key].rgb = rgb;
})

console.log(equalTempered);