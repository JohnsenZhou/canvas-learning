/*!
 * @author Johnsen
 * @date 2017.9.6
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
    
    // 定义球对象
    var self = this;
    this.ball = {
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
    };

    this.init();
  }
  
  MoveBall.prototype.init = function() {
    this.ball.draw();
    this.listener();
  }

  MoveBall.prototype.draw = function draw() {
    this.ctx.clearRect(0, 0, this.container.width, this.container.height);
    var ball = this.ball;
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.y + ball.vy > this.container.height || ball.y + ball.vy < 0) {
      ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > this.container.width || ball.x + ball.vx < 0) {
      ball.vx = -ball.vx;
    }
    this.raf = window.requestAnimationFrame(this.draw.bind(this));
  }

  MoveBall.prototype.listener = function listener() {
    this.container.addEventListener('mouseover', function(e) {
      this.raf = window.requestAnimationFrame(this.draw.bind(this));
    }.bind(this));
    
    this.container.addEventListener('mouseout', function(e) {
      window.cancelAnimationFrame(this.raf);
    }.bind(this))
  }

  return MoveBall;
})