/*!
 * @author Johnsen
 * @date 2017.9.5
 */

(function(name, definition) {
  if (typeof define === 'function') {
    define(definition);
  } else {
    this[name] = definition();
  }
})('SunEarth', function() {
  function SunEarth(selector) {
    this.container = document.getElementById(selector);
    this.sun = new Image();
    this.earth = new Image();
    this.moon = new Image();

    this.init();
  }

  SunEarth.prototype.init = function() {
    this.sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
    this.moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
    this.earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
    window.requestAnimationFrame(this.draw.bind(this));
  }

  SunEarth.prototype.draw = function() {
    var ctx = this.container.getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 300, 300);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.save();
    ctx.translate(150,150);

    // earth
    var time = new Date();
    ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
    ctx.translate(105,0);
    ctx.fillRect(0,-12,50,24); // Shadow
    ctx.drawImage(this.earth,-12,-12);

    // Moon
    ctx.save();
    ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
    ctx.translate(0,28.5);
    ctx.drawImage(this.moon,-3.5,-3.5);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
    ctx.stroke();
   
    ctx.drawImage(this.sun,0,0,300,300);
  
    window.requestAnimationFrame(this.draw.bind(this));
  }

  return SunEarth;
})
