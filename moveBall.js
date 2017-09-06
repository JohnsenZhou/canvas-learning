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
    this.raf;  // 重绘 FPS:60
    this.isRunning = false;

    // 定义球对象
    var self = this;
    this.ball = {
      x: 100,
      y: 100,
      vx: 5,
      vy: 2,
      radius: 25,
      color: '#ff6e6e',
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
  
  MoveBall.prototype.init = function init() {
    this.ball.draw();
    this.listener();
  }

  MoveBall.prototype.clear = function clear() {
    // this.ctx.clearRect(0, 0, this.container.width, this.container.height);
    this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
    this.ctx.fillRect(0, 0, this.container.width, this.container.height);
  }

  MoveBall.prototype.draw = function draw() {
    this.clear();

    var ball = this.ball;
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy *= .99;
    ball.vy += .25;
    // ball.vx *= .99;
    // ball.vx -= .01;
    if (ball.y + ball.vy > this.container.height - 25 || ball.y + ball.vy < 25) {
      ball.vy = - ball.vy;
    }
    if (ball.x + ball.vx > this.container.width - 25 || ball.x + ball.vx < 25) {
      ball.vx = - ball.vx;
    }
    this.raf = window.requestAnimationFrame(this.draw.bind(this));
  }

  MoveBall.prototype.listener = function listener() {
    // this.container.addEventListener('mouseover', function(e) {
    //   this.raf = window.requestAnimationFrame(this.draw.bind(this));
    // }.bind(this));

    this.container.addEventListener('mousemove', function(e) {
      if (!this.isRunning) {
        this.clear();
        this.ball.x = e.clientX;
        this.ball.y = e.clientY;
        this.ball.draw();
      }
    }.bind(this))

    this.container.addEventListener('click', function(e) {
      if (!this.isRunning) {
        this.raf = window.requestAnimationFrame(this.draw.bind(this));
        this.isRunning = true;
      }
    }.bind(this));
    
    this.container.addEventListener('mouseout', function(e) {
      window.cancelAnimationFrame(this.raf);
      this.isRunning = false;
    }.bind(this));
  }

  return MoveBall;
})