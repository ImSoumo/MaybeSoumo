/*!
 * @made by MaybeSoumo - @MaybeSoumo
 * @version 1.1.0
 */
(function ($, window, document, undefined) {
  'use strict';

  function Plugin(element, options) {
    this.element = element;
    this.$el = $(element);
    this.options = $.extend({}, $.fn.particleground.defaults, options);
    this._defaults = $.fn.particleground.defaults;
    this._name = 'particleground';
    this.init();
  }

  Plugin.prototype.init = function () {
    var _ = this;
    var supportsCanvas = !!document.createElement('canvas').getContext;
    if (!supportsCanvas) {
      return;
    }

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = this.options.particleCount;
    var width = this.$el.width();
    var height = this.$el.height();
    var animationId;

    canvas.width = width;
    canvas.height = height;
    this.$el.append(canvas);

    function Particle() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * _.options.maxSpeedX;
      this.vy = (Math.random() - 0.5) * _.options.maxSpeedY;
      this.radius = Math.random() * _.options.sizeVariations + _.options.baseRadius;
      this.color = _.options.color;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      ctx.fillStyle = _.options.color;

      for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) {
          particle.vx = -particle.vx;
        }

        if (particle.y < 0 || particle.y > height) {
          particle.vy = -particle.vy;
        }
      }
      animationId = requestAnimationFrame(draw);
    }

    for (var i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    draw();

    $(window).on('resize', function () {
      width = _.$el.width();
      height = _.$el.height();
      canvas.width = width;
      canvas.height = height;
      particles = [];
      for (var i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
      cancelAnimationFrame(animationId);
      draw();
    });
  };

  $.fn.particleground = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_particleground')) {
        $.data(this, 'plugin_particleground', new Plugin(this, options));
      }
    });
  };

  $.fn.particleground.defaults = {
    particleCount: 100,
    maxSpeedX: 0.5,
    maxSpeedY: 0.5,
    baseRadius: 2,
    sizeVariations: 3,
    color: '#ffffff'
  };

})(jQuery, window, document);

$(document).ready(function () {
  $('#particles-background').particleground({
    particleCount: 150,
    maxSpeedX: 1.0,
    maxSpeedY: 1.0,
    baseRadius: 3,
    sizeVariations: 4,
    color: '#ffffff'
  });
});
