/*
Danny Modir Rahmati
182537217
dmodir-rahmati@myseneca.ca
*/

const EventEmitter = require('events');

class TrafficLight extends EventEmitter {
  constructor() {
    super();
    this.colors = ['Red', 'Yellow', 'Green'];
    this.currentColorIndex = 0;
    this.cycleInterval = null;
    this.colorDurations = {
      Red: 5000,    
      Yellow: 2000, 
      Green: 5000,  
    };
  }

  start() {
    this.cycleInterval = setInterval(() => {
      const currentColor = this.colors[this.currentColorIndex];
      this.emit('colorChange', currentColor);
      this.displayColor(currentColor);
      this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    }, this.getTotalCycleDuration());
  }

  stop() {
    clearInterval(this.cycleInterval);
  }

  displayColor(color) {
    setTimeout(() => {
      console.log(color);
    }, this.colorDurations[color]);
  }

  getTotalCycleDuration() {
    return this.colors.reduce((total, color) => total + this.colorDurations[color], 0);
  }
}

const trafficLight = new TrafficLight();

trafficLight.on('colorChange', (currentColor) => {
  console.log('The light just changed to', currentColor);
});

trafficLight.start();
