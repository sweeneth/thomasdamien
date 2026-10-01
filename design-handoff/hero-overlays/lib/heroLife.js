/*
 * heroLife.js — birds drift across, then a wolf appears on the ridge, over the locked hero photo.
 * No dependencies. Plays once when the hero is on screen.
 *
 * Markup (photo + overlay share one "stage" in photo pixel space, 2070 x 760):
 *
 *   <section class="hero">
 *     <div class="hero-stage">
 *       <img src="/hero.jpg" alt="" />
 *       <svg class="hero-life" viewBox="0 0 2070 760" aria-hidden="true"></svg>
 *     </div>
 *     …hero text…
 *   </section>
 *
 *   HeroLife.start(document.querySelector(".hero"));
 *
 * Reduced motion: no birds; the wolf is drawn already settled. Pass { wolfWhenStill: false } to omit it.
 */
(function (root) {
  "use strict";

  var IMG_W = 2070, IMG_H = 760;
  var ANCHOR = [1606, 244];             // wolf's feet on the right cliff-top ridge, in photo px
  var WOLF_W = 30, FOOT_X = 60;          // wolf art is a 100 x 60 box, feet centred under x = 60
  var BIRD_COLOR = "#26231F", WOLF_COLOR = "#201D1A";
  var FLOCK = [[0, 0, 0.0], [24, -9, 0.37], [45, 7, 0.81], [67, -3, 0.15], [96, 11, 0.58]];
  var POSES = {
    glide: "M-6 0.2 Q-3.2 -1.5 0 0.5 Q3.2 -1.5 6 0.2",
    up:    "M-5.6 -2.6 Q-2.6 -0.9 0 0.6 Q2.6 -0.9 5.6 -2.6",
    down:  "M-5.4 1.9 Q-2.8 -0.5 0 0.6 Q2.8 -0.5 5.4 1.9"
  };
  var WOLF_BODY = "M26 18 Q32 20.5 40 18.6 Q55 18.5 70 21 Q78 22 82.5 24 Q90 27 93.5 36 Q96 44 93.5 50.5 Q91.8 53 89.6 50.8 Q88.8 44 85.8 37.5 Q87.2 41 84.6 44.2 L86 57.5 Q86 59 84.3 59 L82.6 59 Q81.6 59 81.5 57.8 L79.4 46 Q77.6 46.4 76.2 46 L76.6 57.5 Q76.6 59 75 59 L73.4 59 Q72.4 59 72.4 57.8 L72.2 44.6 Q68 39.6 60 38.8 Q51 39.6 44 43.4 L43.6 57.5 Q43.6 59 42 59 L40.4 59 Q39.4 59 39.4 57.8 L39 45 L37.6 57.5 Q37.5 59 35.9 59 L34.3 59 Q33.3 59 33.3 57.8 L33.2 44.6 Q29.5 41.5 28.4 35 Q27.8 30 28.6 26 Z";
  var WOLF_HEAD = "M31.5 28 Q31 21 25.6 16.6 L22.8 7.6 L19.6 13.2 L18.6 13 L16.4 7.8 L14.8 14.8 Q10 16.8 6 19.2 Q2.2 20.8 2 22.4 Q2.3 23.8 4 24 Q8 24.6 12 26.6 Q18 30.2 24 30.8 Q30.6 31 31.5 28 Z";
  var HEAD_PIVOT = "27 22";

  // Timeline (seconds)
  var T = { birdsIn: 0.5, birdsCross: 14.0, wolfIn: 6.5, wolfFade: 1.5, headUp: 9.5, headBack: 12.0, headMove: 0.7, end: 15.0 };
  var FLAP_EVERY = 2.8, BEAT = 0.16, BOB_PERIOD = 4.2, BOB_AMP = 1.6;

  var NS = "http://www.w3.org/2000/svg";
  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function smooth(u) { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); }
  function pose(t, phase) {
    var c = (t + phase * 3) % FLAP_EVERY;
    if (c > BEAT * 4) return "glide";
    return ["up", "glide", "down", "glide"][Math.floor(c / BEAT) % 4];
  }

  // Which slice of the photo is on screen right now, in photo px (follows object-fit: cover + position).
  function visibleX(hero, stage) {
    var h = hero.getBoundingClientRect(), s = stage.getBoundingClientRect();
    var k = IMG_W / s.width;
    return [(h.left - s.left) * k, (h.right - s.left) * k];
  }

  function build(svg) {
    svg.innerHTML = "";
    var birds = el("g", { "class": "hl-birds" }, svg);
    var list = FLOCK.map(function () {
      var g = el("g", { opacity: "0.86" }, birds);
      var p = el("path", { d: POSES.glide, fill: "none", stroke: BIRD_COLOR, "stroke-width": "1.15", "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
      return { g: g, p: p, last: "glide" };
    });
    var k = WOLF_W / 100;
    var wolfWrap = el("g", { "class": "hl-wolf", opacity: "0" }, svg);
    var wolf = el("g", { fill: WOLF_COLOR, stroke: WOLF_COLOR, "stroke-width": "1.3", "stroke-linejoin": "round" }, wolfWrap);
    el("path", { d: WOLF_BODY }, wolf);
    var head = el("g", {}, wolf);
    el("path", { d: WOLF_HEAD }, head);
    function placeWolf(dy) {
      wolfWrap.setAttribute("transform", "translate(" + (ANCHOR[0] - FOOT_X * k) + " " + (ANCHOR[1] - 59 * k + dy) + ") scale(" + k + ")");
    }
    placeWolf(0);
    return { birds: birds, list: list, wolfWrap: wolfWrap, head: head, placeWolf: placeWolf };
  }

  function frame(r, t, vis) {
    // Birds: cross the visible slice right -> left, rising from far/low to nearer/high.
    var u = Math.max(0, Math.min(1, (t - T.birdsIn) / T.birdsCross));
    var showBirds = t >= T.birdsIn && t <= T.birdsIn + T.birdsCross + 0.2;
    r.birds.setAttribute("visibility", showBirds ? "visible" : "hidden");
    if (showBirds) {
      var e = smooth(u), x0 = vis[1] + 40, x1 = vis[0] - 140;
      var x = x0 + (x1 - x0) * u, y = 132 - 54 * e, s = 0.8 + 0.4 * e;
      r.list.forEach(function (b, i) {
        var f = FLOCK[i], bob = BOB_AMP * Math.sin(2 * Math.PI * (t + f[2] * 3) / BOB_PERIOD);
        b.g.setAttribute("transform", "translate(" + (x + f[0] * s).toFixed(2) + " " + (y + f[1] * s + bob).toFixed(2) + ") scale(" + s.toFixed(3) + ")");
        var p = pose(t, f[2]);
        if (p !== b.last) { b.p.setAttribute("d", POSES[p]); b.last = p; }
      });
    }
    // Wolf: soft settle, then one slow lift of the head (looking out), and back.
    var a = smooth((t - T.wolfIn) / T.wolfFade);
    r.wolfWrap.setAttribute("opacity", a.toFixed(3));
    r.placeWolf(2 * (1 - a));
    var rot = -6 * (smooth((t - T.headUp) / T.headMove) - smooth((t - T.headBack) / T.headMove));
    r.head.setAttribute("transform", "rotate(" + rot.toFixed(2) + " " + HEAD_PIVOT + ")");
  }

  function start(hero, opts) {
    opts = opts || {};
    var stage = hero.querySelector(".hero-stage"), svg = hero.querySelector(".hero-life");
    if (!stage || !svg) return { replay: function () {}, stop: function () {} };
    var r = build(svg), raf = 0, t0 = 0, vis = visibleX(hero, stage);
    var reduce = opts.reduceMotion != null ? opts.reduceMotion : matchMedia("(prefers-reduced-motion: reduce)").matches;

    function still() {
      cancelAnimationFrame(raf);
      r.birds.setAttribute("visibility", "hidden");
      var show = opts.wolfWhenStill !== false && opts.bearWhenStill !== false;
      r.wolfWrap.setAttribute("opacity", show ? "1" : "0");
      r.placeWolf(0); r.head.setAttribute("transform", "");
    }
    function tick(now) {
      var t = (now - t0) / 1000;
      frame(r, t, vis);
      if (opts.onTime) opts.onTime(t);
      if (t < T.end) raf = requestAnimationFrame(tick);
    }
    function play() {
      if (reduce) return still();
      cancelAnimationFrame(raf);
      vis = visibleX(hero, stage);
      t0 = performance.now();
      raf = requestAnimationFrame(tick);
    }
    addEventListener("resize", function () { vis = visibleX(hero, stage); });

    if (reduce) still();
    else if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { io.disconnect(); play(); }
      }, { threshold: 0.4 });
      io.observe(hero);
    } else play();

    return { replay: play, still: still, stop: function () { cancelAnimationFrame(raf); },
             setReduceMotion: function (v) { reduce = v; v ? still() : play(); } };
  }

  root.HeroLife = { start: start, IMG_W: IMG_W, IMG_H: IMG_H, TIMELINE: T };
})(typeof window !== "undefined" ? window : this);
