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
})('MoveBall', function() {
  function MoveBall(selector) {
    this.container = document.getElementById(selector);
    this.ctx = document.getElementById(selector).getContext('2d');
    this.raf;
    this.init();
  }
  
  MoveBall.prototype.init = function() {
    this.ball().draw();
    this.listener();
  }

  MoveBall.prototype.ball = function ball() {
    var self = this;
    var ball = {
      x: 100,
      y: 100,
      vx: 5,
      vy: 2,
      radius: 25,
      color: 'blue',
      draw: function() {
        self.ctx.beginPath();
        self.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        self.ctx.closePath();
        self.ctx.fillStyle = this.color;
        self.ctx.fill();
      }
    }

    return ball;
  }

  MoveBall.prototype.draw = function draw() {
    var self = this;
    console.log(this)
    self.ctx.clearRect(0, 0, self.container.width, self.container.height);
    var ball = self.ball();
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    self.raf = window.requestAnimationFrame(self.draw);
  }

  MoveBall.prototype.listener = function listener() {
    var self = this;
    this.container.addEventListener('mouseover', function(e) {
      console.log(this)
      this.raf = window.requestAnimationFrame(self.draw);
    }.bind(this));
    
    this.container.addEventListener('mouseout', function(e) {
      window.cancelAnimationFrame(this.raf);
    })
  }

  return MoveBall;
})