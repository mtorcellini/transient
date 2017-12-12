import { Sound } from 'pizzicato';
/* 
	Type is a string of "sine", "square", "triangle", "sawtooth"
	Frequency is the Hz value of a note to be played when the sound is triggered (This value is optional and defaults to A4 @ 440Hz)
	Volume is a float representing the loudness of a sound between 0 (quietest) and 1 (loudest) 
	Release is a float representing the time a sound takes to fade out after being played between 0 (quick fade) and 1 (long fade)
	Attack is a float representing the intensity with which a note is played when it is first struck between 0 (softest) and 1 (strongest)
	*/

export default (type, frequency, volume, release, attack) => {

	return new Sound({ 
          source: 'wave',
          options: {
          	frequency: frequency || 440,
            type: type,
            volume: volume,
            release: release,
            attack: attack
          }
        });
	}
