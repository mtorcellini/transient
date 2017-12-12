export default class ColorChanger {
	/* 
	Duration is not what it says. It's a multiplier in the calculateIncrement() function.
	duration = 1-4, fast-to-slow
	*/
	constructor(){
		this.fps             = 60;
		this.duration        = 1;
		this.transElement    = document.body;
		this.currentColor    = this.getElementBG(this.transElement);
		this.transHandler    = null;
		this.targetColor 	  = null;
		this.increment 		= null;
		this.distance 		= null;
	}
	/* 
	This is required to get the initial background-color of an element.
	The element might have it's bg-color already set before the transition.
	Transition should continue/start from this color.
	This will be used only once.
	*/
	getElementBG(elm) {
		let bg  = getComputedStyle(elm).backgroundColor;
		bg  = bg.match(/\((.*)\)/)[1];
		bg  = bg.split(",");
		for (let i = 0; i < bg.length; i++) {
			bg[i] = parseInt(bg[i], 10);
		}
		if (bg.length > 3) { bg.pop(); }
		return bg;
	}

	/*
	 A function to generate random numbers.
	 Will be needed to generate random RGB value between 0-255.
	 */
	 random() {
	 	if (arguments.length > 2) {
	 		return 0;
	 	}
	 	switch (arguments.length) {
	 		case 0:
	 		return Math.random();
	 		case 1:
	 		return Math.round(Math.random() * arguments[0]);
	 		case 2:
	 		let min = arguments[0];
	 		let max = arguments[1];
	 		return Math.round(Math.random() * (max - min) + min);
	 	}
	 }

	 /* Generates a random RGB value. */
	 generateRGB(min, max) {
	 	min     = min || 0;
	 	max     = min || 255;
	 	let color   = [];
	 	for (let i = 0; i < 3; i++) {
	 		let num = this.random(min, max);
	 		color.push(num);
	 	}
	 	return color;
	 }

	/*
	 Calculates the distance between the RGB values.
	 We need to know the distance between two colors
	 so that we can calculate the increment values for R, G, and B.
	 */
	 calculateDistance(colorArray1, colorArray2) {
	 	let distance = [];
	 	for (let i = 0; i < colorArray1.length; i++) {
	 		distance.push(Math.abs(colorArray1[i] - colorArray2[i]));
	 	}
	 	return distance;
	 }

	/*
	 Calculates the increment values for R, G, and B using distance, fps, and duration.
	 This calculation can be made in many different ways.
	 */
	 calculateIncrement(distanceArray, fps, duration) {
	 	fps         = this.fps || 60;
	 	duration    = this.duration || 1;
	 	let increment   = [];
	 	for (let i = 0; i < distanceArray.length; i++) {
	 		let incr = Math.abs(Math.floor(distanceArray[i] / (fps * duration)));
	 		if (incr === 0) {
	 			incr = 1;
	 		}
	 		increment.push(incr);
	 	}
	 	return increment;
	 }

	/* 
	Converts RGB array [32,64,128] to HEX string #204080
	It's easier to apply HEX color than RGB color.
	*/
	rgb2hex(colorArray) {
		let color = [];
		for (let i = 0; i < colorArray.length; i++) {
			let hex = colorArray[i].toString(16);
			if (hex.length < 2) { hex = "0" + hex; }
			color.push(hex);
		}
		return "#" + color.join("");
	}

	startTransition() {
		clearInterval(this.transHandler);

		this.targetColor = this.generateRGB();
		this.distance    = this.calculateDistance(this.currentColor, this.targetColor);
		this.increment   = this.calculateIncrement(this.distance, this.fps, this.duration);

		this.transHandler = setInterval(() => {
			this.transition();
		}, 1000/this.fps);
	}
	stopTransition(){
		clearInterval(this.transHandler);
	}
	transition() {
		/* checking R */
		if (this.currentColor[0] > this.targetColor[0]) {
			this.currentColor[0] -= this.increment[0];
			if (this.currentColor[0] <= this.targetColor[0]) {
				this.increment[0] = 0;
			}
		} else {
			this.currentColor[0] += this.increment[0];
			if (this.currentColor[0] >= this.targetColor[0]) {
				this.increment[0] = 0;
			}
		}

		/* checking G */
		if (this.currentColor[1] > this.targetColor[1]) {
			this.currentColor[1] -= this.increment[1];
			if (this.currentColor[1] <= this.targetColor[1]) {
				this.increment[1] = 0;
			}
		} else {
			this.currentColor[1] += this.increment[1];
			if (this.currentColor[1] >= this.targetColor[1]) {
				this.increment[1] = 0;
			}
		}

		/* checking B */
		if (this.currentColor[2] > this.targetColor[2]) {
			this.currentColor[2] -= this.increment[2];
			if (this.currentColor[2] <= this.targetColor[2]) {
				this.increment[2] = 0;
			}
		} else {
			this.currentColor[2] += this.increment[2];
			if (this.currentColor[2] >= this.targetColor[2]) {
				this.increment[2] = 0;
			}
		}

		/* applying the new modified color */
		this.transElement.style.backgroundColor = this.rgb2hex(this.currentColor);

		/* transition ended. start a new one */
		if (this.increment[0] === 0 && this.increment[1] === 0 && this.increment[2] === 0) {
			this.startTransition();
		}
	}

}