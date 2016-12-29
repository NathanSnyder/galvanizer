/* https://github.com/d3/d3-timer Copyright 2015 Mike Bostock */
"undefined"==typeof requestAnimationFrame&&(requestAnimationFrame="undefined"!=typeof window&&(window.msRequestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame)||function(e){return setTimeout(e,17)}),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.timer={})}(this,function(e){"use strict";function t(){l=s=0,c=1/0,n(a())}function n(e){if(!l){var n=e-Date.now();n>24?c>e&&(s&&clearTimeout(s),s=setTimeout(t,n),c=e):(s&&(s=clearTimeout(s),c=1/0),l=requestAnimationFrame(t))}}function i(e,t){this.callback=e,this.time=t,this.flush=!1,this.next=null}function o(e,t,o){o=null==o?Date.now():+o,null!=t&&(o+=+t);var u=new i(e,o);r?r.next=u:m=u,r=u,n(o)}function u(e,t,n){n=null==n?Date.now():+n,null!=t&&(n+=+t),f.callback=e,f.time=n}function a(e){e=null==e?Date.now():+e;var t=f;for(f=m;f;)e>=f.time&&(f.flush=f.callback(e-f.time,e)),f=f.next;f=t,e=1/0;for(var n,i=m;i;)i.flush?i=n?n.next=i.next:m=i.next:(i.time<e&&(e=i.time),i=(n=i).next);return r=n,e}var m,r,f,l,s,c=1/0;e.timer=o,e.timerReplace=u,e.timerFlush=a});

var canvas = document.querySelector("canvas.animated"),
    context = canvas.getContext("2d"),
    radius = 2.5,
    minDistance = 2,
    maxDistance = 250,
    minDistance2 = minDistance * minDistance,
    maxDistance2 = maxDistance * maxDistance;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

var width = canvas.width,
    height = canvas.height

var tau = 2 * Math.PI,
    n = Math.round($(window).width()/25),
    particles = new Array(n);

for (var i = 0; i < n; ++i) {
  particles[i] = {
    x: width * Math.random(),
    y0: height * Math.random(),
    v: .1 * (Math.random() - .5)
  };
}

timer.timer(function(elapsed) {
  context.clearRect(0, 0, width, height);

  context.lineWidth = 1;
  context.strokeStyle = "black";
  for (var i = 0; i < n; ++i) {
    var pi = particles[i];
    for (var j = i + 1; j < n; ++j) {
      var pj = particles[j],
          dx = pi.x - pj.x,
          dy = pi.y - pj.y,
          d2 = dx * dx + dy * dy;
      if (d2 < maxDistance2) {
        context.globalAlpha = d2 > minDistance2 ? (maxDistance2 - d2) / (maxDistance2 - minDistance2) : 1;
        context.beginPath();
        context.arc((pi.x + pj.x) / 2, (pi.y + pj.y) / 2, Math.sqrt(d2) / 2, 0, tau);
        context.stroke();
      }
    }
  }
  context.globalAlpha = 1;

  for (var i = 0; i < n; ++i) {
    var p = particles[i];
    p.y = p.y0 + elapsed * p.v;
    if (p.y > height + maxDistance) p.x = width * Math.random(), p.y0 -= height + 2 * maxDistance;
    else if (p.y < -maxDistance) p.x = width * Math.random(), p.y0 += height + 2 * maxDistance;
    context.beginPath();
    context.arc(p.x, p.y, radius, 0, tau);
    context.fill();
  }
});
