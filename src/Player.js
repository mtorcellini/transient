import Pizzicato from "pizzicato";
import instrument from "./Instrument.js";

export default class Player {
  constructor() {
    this.play = {
      soprano: {},
      alto: {},
      tenor: {},
      bass: {},
      kick: () => {
        this.kick.play();
        setTimeout(() => {
          this.kick.stop();
        }, 250);
      },
      clap: () => {
        this.clap.play();
        setTimeout(() => {
          this.clap.stop();
        }, 250);
      },
    };
    this.tones = [
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
    this.oct = [2, 3, 4, 5, 6];
    this.kick = instrument("sine", 130.8, 0.2, 0.6, 0);
    this.clap = instrument("sawtooth", 261.6, 0.05, 1.5, 0);
    this.voices = [
      {
        voiceName: "soprano",
        inst: instrument("triangle", null, 0.2, 1, 1),
      },
      {
        voiceName: "alto",
        inst: instrument("sine", null, 0.2, 1, 1),
      },
      {
        voiceName: "tenor",
        inst: instrument("square", null, 0.1, 1, 1),
      },
      {
        voiceName: "bass",
        inst: instrument("sine", null, 0.3, 1, 1),
      },
    ];

    this.band = new Pizzicato.Group();
    this.playToggle = false;
    this.dur = 1000;

    this.reverb = new Pizzicato.Effects.Reverb({
      time: 1,
      decay: 0.8,
      reverse: true,
      mix: 0.9,
    });
    this.ringModulator = new Pizzicato.Effects.RingModulator({
      speed: 1,
      distortion: 1,
      mix: 0.1,
    });

    this.dubDelay = new Pizzicato.Effects.DubDelay({
      feedback: 0.2,
      time: 0.7,
      mix: 0.1,
      cutoff: 3000,
    });
    this.quadrafuzz = new Pizzicato.Effects.Quadrafuzz({
      lowGain: 0.6,
      midLowGain: 0.8,
      midHighGain: 0,
      highGain: 0,
    });
    /* Additional setup */
    // this.kick.addEffect(this.dubDelay);
    // this.clap.addEffect(this.quadrafuzz);
  }
  // playKickBeat() {
  //   this.kick.play();
  //   setTimeout(() => this.kick.stop(), 250);
  // }
  // playClapBeat() {
  //   this.clap.play();
  //   setTimeout(() => this.clap.stop(), 250);
  // }
  playMusic(playToggle) {
    if (!playToggle) {
      /* Clear triggers and remove effects to stop music */
      this.stopMusic();
    } else {
      this.playKickTrigger = setInterval(this.play.kick, 1000);
      this.playClapTrigger = setInterval(this.play.clap, 2000);
      this.voices.map((voice) => {
        if (voice.voiceName === "soprano") {
          voice.inst.addEffect(this.ringModulator);
        }
        this.band.addSound(voice.inst);
        this.randNote(voice);
        return null;
      });
      this.band.addEffect(this.reverb);
      this.band.addEffect(this.dubDelay);
    }
  }
  stopMusic() {
    clearInterval(this.playClapTrigger);
    clearInterval(this.playKickTrigger);
    this.voices.forEach((voice) => {
      voice.inst.stop();
      if (voice.voiceName === "soprano") {
        voice.inst.removeEffect(this.ringModulator);
      }
      this.band.removeSound(voice.inst);
      return null;
    });
    clearTimeout(this.play.soprano);
    clearTimeout(this.play.alto);
    clearTimeout(this.play.tenor);
    clearTimeout(this.play.bass);
    this.band.removeEffect(this.reverb);
    this.band.removeEffect(this.dubDelay);
  }
  randNote(voice) {
    switch (voice.voiceName) {
      case "soprano":
        this.randNoteForVoice(voice, 3, 4);
        break;
      case "alto":
        this.randNoteForVoice(voice, 3, 3);
        break;
      case "tenor":
        this.randNoteForVoice(voice, 2, 3);
        break;
      case "bass":
        this.randNoteForVoice(voice, 3, 2);
        break;
      default:
        break;
    }
  }
  randNoteForVoice(voice, range, baseOctave) {
    let note = {
      voice: voice.voiceName,
      root: this.tones[Math.floor(Math.random() * this.tones.length)].substring(
        0,
        1
      ),
      oct: Math.floor(Math.random() * range) + baseOctave,
      duration: (Math.floor(Math.random() * 8 + 1) * 1000) / 2,
    };
    this.dur = note.duration;
    // document.getElementById(voice.voiceName).innerHTML += note.root + note.oct + "&nbsp&nbsp";
    voice.inst.frequency = this.noteToFreq(this.getHalfSteps(note));
    voice.inst.volume = note.oct > 5 ? 0.05 : 0.2;
    voice.inst.play();

    this.play[voice.voiceName] = setTimeout(() => {
      this.randNoteForVoice(voice, range, baseOctave);
    }, this.dur);
  }
  rand_oct() {
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return (
      Math.abs(
        Math.floor(
          Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * 2
        )
      ) + 1
    );
  }
  noteToFreq(numSteps) {
    return +(440 * Math.pow(Math.pow(2, 1 / 12), numSteps)).toFixed(2);
  }
  getHalfSteps(note) {
    // var base = "A",
    // baseOct = 4;
    let dist = 0;
    dist += note.oct * 12 - 48 + (this.tones.indexOf(note.root) - 9);
    return dist;
  }
}
