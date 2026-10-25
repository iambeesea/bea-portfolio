// @ts-nocheck
// The scroll-and-animation engine behind the portfolio, carried over from the
// Claude Design prototype. It drives the DOM directly through refs and data-*
// attributes, so it is intentionally excluded from type-checking; everything
// that feeds it (content, validation, server actions) is typed.
import { createRef } from 'react';
import { EngineBase, type EngineProps } from './engine-base';
import type { ViewModel } from './view';
import { validateContact } from '@/lib/validation/contact';

export class PortfolioEngine extends EngineBase<EngineProps, ViewModel> {
  get EXPERIENCE() {
    return this.props.content.experience;
  }
  get LEADERSHIP() {
    return this.props.content.leadership;
  }
  get EDUCATION() {
    return this.props.content.education;
  }
  get projects() {
    return this.props.content.projects;
  }

  state = {
    view: 'proto',
    active: 0,
    caseIdx: null,
    trans: null,
    entry: false,
    introOn: true,
    introHover: false,
    heroPlay: 'paused',
    sound: false,
    hover: false,
    clock: '',
    ready: false,
  };

  // IntroExperience config
  SHOW_INTRO = true; // false = skip the intro entirely
  INTRO_ONCE_PER_SESSION = false; // true = only show once per browser session

  introRef = createRef();
  introHeadRef = createRef();
  introCtaRef = createRef();
  introBtnRef = createRef();
  glowRef = createRef();
  homeRef = createRef();
  cursorRef = createRef();

  // About → Experience: Experience holds in place and is wiped in left→right behind a thin line of light
  paintXpWipe() {
    const sc = this.scrollRef.current;
    if (!sc || !this.panels) return;
    const xi = this.panelIdx('Experience');
    if (xi < 1) return;
    const sec = this.panels[xi],
      H = sc.clientHeight || 1,
      k = Math.max(0, Math.min(1, sc.scrollTop / H - (xi - 1)));
    const line = sec.querySelector('[data-xwipe]');
    const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    if (k > 0 && k < 1) {
      sec.style.transform = 'translate3d(0,' + (-(1 - k) * H).toFixed(1) + 'px,0)';
      if (this.reduced) {
        sec.style.opacity = k.toFixed(3);
        sec.style.clipPath = '';
      } else {
        const c = 'inset(0 ' + ((1 - e) * 100).toFixed(2) + '% 0 0)';
        sec.style.clipPath = c;
        sec.style.webkitClipPath = c;
        sec.style.opacity = '';
        if (line) {
          line.style.transform = 'translate3d(' + (e * sec.clientWidth - 1).toFixed(1) + 'px,0,0)';
          line.style.opacity = Math.sin(Math.PI * e).toFixed(3);
        }
      }
    } else {
      if (sec.style.transform || sec.style.clipPath || sec.style.opacity) {
        sec.style.transform = '';
        sec.style.clipPath = '';
        sec.style.webkitClipPath = '';
        sec.style.opacity = '';
      }
      if (line && line.style.opacity !== '0') line.style.opacity = '0';
    }
    // About recedes a touch further as it is covered
    const ab = this.panels[this.panelIdx('About')];
    const inner = ab && ab.firstElementChild;
    if (inner && !this.reduced) inner.style.filter = k > 0 && k < 1 ? 'saturate(' + (1 - 0.4 * e).toFixed(3) + ')' : '';
  }

  // "Follow the starlight" after Get to know me. Scroll units from the Journey panel (3→4 = About opens).
  STARLIGHT = {
    starFrom: 1.78,
    travelFrom: 1.86,
    travelLen: 0.42,
    shine: 0.9,
    dissolveFrom: 2.24,
    dissolveLen: 0.36,
    dustFrom: 2.3,
    dustLen: 0.42,
    linesFrom: 2.5,
    linesLen: 0.26,
    lineOpacity: 0.32,
    expandFrom: 2.78,
    expandLen: 0.7,
    expandScale: 2.4,
    fadeFrom: 3.45,
    lingerTo: 3.95,
    count: 24,
    countTablet: 16,
    countMobile: 9,
    points: [
      [-0.2, -0.1],
      [-0.08, -0.2],
      [0.05, -0.08],
      [0.18, -0.17],
      [0.13, 0.09],
      [-0.01, 0.14],
      [-0.15, 0.07],
    ],
    pointsMobile: [
      [-0.22, -0.1],
      [-0.02, -0.18],
      [0.2, -0.06],
      [0.08, 0.12],
      [-0.14, 0.1],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
      [4, 5],
      [5, 6],
    ],
    linesMobile: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  };

  paintJourneyStar(st, H) {
    const ph = this.jPhraseRef.current,
      sc = this.scrollRef.current;
    if (!ph || !sc || !this.panels) return;
    const S = this.STARLIGHT,
      clamp = (v) => Math.max(0, Math.min(1, v));
    const eio = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      red = this.reduced;
    let O = this._jsO && this._jsO.ph === ph ? this._jsO : null;
    if (!O) {
      const root = ph.closest('section').querySelector('[data-jstar]');
      if (!root) return;
      O = this._jsO = {
        ph,
        root,
        dots: Array.prototype.slice.call(root.querySelectorAll('[data-jp]')),
        lines: Array.prototype.slice.call(root.querySelectorAll('[data-jsline]')),
        guide: root.querySelector('[data-jguide]'),
        trail: root.querySelector('[data-jtrail]'),
        letters: Array.prototype.slice.call(ph.querySelectorAll('[data-jl]')),
      };
    }
    const local = st;
    const ai = this.panelIdx('About');
    if (ai > 0) {
      const sec = this.panels[ai],
        real = sc.scrollTop / (sc.clientHeight || 1),
        k = clamp(real - (ai - 1));
      if (k > 0 && k < 1) {
        sec.style.transform = 'translate3d(0,' + (-(1 - k) * sc.clientHeight).toFixed(1) + 'px,0)';
        if (red) {
          sec.style.clipPath = '';
          sec.style.opacity = k.toFixed(3);
        } else {
          const r = 'circle(' + (4 + 150 * k * k).toFixed(2) + '% at 50% 48%)';
          sec.style.clipPath = r;
          sec.style.webkitClipPath = r;
          sec.style.opacity = '';
        }
      } else if (sec.style.transform || sec.style.clipPath || sec.style.opacity) {
        sec.style.transform = '';
        sec.style.clipPath = '';
        sec.style.webkitClipPath = '';
        sec.style.opacity = '';
      }
    }
    const active = local > S.starFrom - 0.1 && local < S.lingerTo + 0.2;
    if (!active) {
      if (!O.off) {
        O.off = true;
        O.dots.forEach((d) => {
          d.style.opacity = '0';
        });
        O.lines.forEach((l) => {
          l.style.opacity = '0';
        });
        O.guide.style.opacity = '0';
        O.trail.style.opacity = '0';
        O.letters.forEach((el) => {
          el.style.textShadow = '';
          el.style.color = '';
        });
        ph.style.opacity = '';
      }
      return;
    }
    O.off = false;
    const rr = O.root.getBoundingClientRect(),
      W = rr.width || 1200,
      Hh = rr.height || H;
    const cx = W / 2,
      cy = Hh * 0.48;
    const fs = parseFloat(getComputedStyle(ph).fontSize) || 80;
    const L = O.letters.map((el) => {
      const b = el.getBoundingClientRect();
      return { x: b.left - rr.left + b.width / 2, y: b.top - rr.top + b.height * 0.55 };
    });
    const x0 = L.length ? L[0].x - fs * 0.6 : cx - 200,
      x1 = L.length ? L[L.length - 1].x + fs * 0.6 : cx + 200,
      ly = L.length ? L[0].y : cy;
    const narrow = W < 640,
      n = narrow ? S.countMobile : W < 1024 ? S.countTablet : S.count;
    const P = (narrow ? S.pointsMobile : S.points).map(([px, py]) => [cx + px * W * (narrow ? 1.2 : 1), cy + py * Hh]);
    const LN = narrow ? S.linesMobile : S.lines;
    const tv = eio(clamp((local - S.travelFrom) / S.travelLen));
    const gIn = clamp((local - S.starFrom) / 0.08);
    let gx = x0 + (x1 - x0) * tv,
      gy = ly - fs * 0.5 * Math.sin(Math.PI * tv);
    const toNode = eio(clamp((local - (S.travelFrom + S.travelLen)) / 0.3));
    gx += (P[2][0] - gx) * toNode;
    gy += (P[2][1] - gy) * toNode;
    const ex = eio(clamp((local - S.expandFrom) / S.expandLen));
    const scl = 1 + (S.expandScale - 1) * ex;
    const outX = (x) => cx + (x - cx) * scl,
      outY = (y) => cy + (y - cy) * scl;
    gx = outX(gx);
    gy = outY(gy);
    if (red) {
      gx = x1;
      gy = ly - fs * 0.45;
    }
    O.guide.style.transform =
      'translate3d(' + gx.toFixed(1) + 'px,' + gy.toFixed(1) + 'px,0) scale(' + (red ? 1 : 0.4 + 0.6 * gIn).toFixed(3) + ')';
    O.guide.style.opacity = (gIn * (red ? 1 - clamp((local - 2.6) / 0.3) : 1 - clamp((local - S.fadeFrom) / 0.25))).toFixed(3);
    if (gIn > 0.5 && !this._jsChime) {
      this._jsChime = true;
      if (!this._jumping) this.playSound('chime');
    } else if (gIn < 0.1) this._jsChime = false;
    if (!red && tv > 0 && tv < 1) {
      const pts = [];
      for (let q = 0; q <= 5; q++) {
        const u = Math.max(0, tv - 0.14 * (1 - q / 5));
        pts.push((x0 + (x1 - x0) * u).toFixed(1) + ',' + (ly - fs * 0.5 * Math.sin(Math.PI * u)).toFixed(1));
      }
      O.trail.setAttribute('d', 'M' + pts.join(' L'));
      O.trail.style.opacity = (0.22 * Math.sin(Math.PI * tv)).toFixed(3);
    } else O.trail.style.opacity = '0';
    const dz = eio(clamp((local - S.dissolveFrom) / S.dissolveLen));
    const starX = x0 + (x1 - x0) * tv,
      crossing = tv > 0 && tv < 1,
      mid = (O.letters.length - 1) / 2;
    O.letters.forEach((el, i) => {
      const k = crossing && !red ? Math.max(0, 1 - Math.abs(starX - L[i].x) / (fs * S.shine)) : 0;
      el.style.textShadow = k > 0.02 ? '0 0 ' + (10 * k).toFixed(1) + 'px rgba(var(--glow-rgb),' + (0.65 * k).toFixed(2) + ')' : '';
      el.style.color = k > 0.4 ? 'var(--glow)' : '';
      if (local > S.dissolveFrom && !red) {
        el.style.transform =
          'translate3d(' +
          ((i - mid) * fs * 0.08 * dz).toFixed(1) +
          'px,' +
          (-6 * dz).toFixed(1) +
          'px,0) scale(' +
          (1 - 0.08 * dz).toFixed(3) +
          ')';
        el.style.opacity = (1 - dz).toFixed(3);
      }
    });
    ph.style.opacity = red ? (1 - clamp((local - 2.4) / 0.3)).toFixed(3) : '';
    const lp = red ? clamp((local - 2.4) / 0.3) : clamp((local - S.linesFrom) / S.linesLen);
    const lf = clamp((local - S.fadeFrom) / 0.3);
    if (!O.seed || O.n !== n) {
      let sd = 11;
      const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
      O.n = n;
      O.seed = O.dots.map((d, i) => {
        const key = i < P.length,
          sz = key ? 3 : [1, 2, 1, 2, 3, 1][i % 6];
        d.style.display = i < n ? 'block' : 'none';
        d.style.width = d.style.height = sz + 'px';
        d.style.marginLeft = d.style.marginTop = -sz / 2 + 'px';
        d.style.background = i % 4 === 0 ? 'var(--accent)' : 'var(--ink2)';
        d.style.boxShadow = sz >= 3 ? '0 0 7px rgba(var(--glow-rgb),.55)' : 'none';
        const ang = rnd() * Math.PI * 2,
          rad = 0.18 + rnd() * 0.22;
        return {
          key,
          li: i % Math.max(1, L.length),
          jx: (rnd() - 0.5) * 20,
          jy: (rnd() - 0.5) * 20,
          fx: Math.cos(ang) * rad,
          fy: Math.sin(ang) * rad * 0.8,
          d: rnd() * 0.15,
          o: 0.4 + rnd() * 0.5,
          linger: i === 1 || i === 4,
        };
      });
    }
    const cur = [];
    O.seed.forEach((p, i) => {
      if (i >= n) return;
      const d = O.dots[i],
        src = L[p.li] || { x: cx, y: cy };
      const tx = p.key ? P[i][0] : cx + p.fx * W,
        ty = p.key ? P[i][1] : cy + p.fy * Hh;
      const e = red ? 1 : eio(clamp((local - S.dustFrom - p.d) / S.dustLen));
      let x = src.x + p.jx + (tx - src.x - p.jx) * e,
        y = src.y + p.jy + (ty - src.y - p.jy) * e - (red ? 0 : 30 * Math.sin(Math.PI * e));
      x = outX(x);
      y = outY(y);
      cur[i] = [x, y];
      const appear = red ? (p.key ? clamp((local - 2.3) / 0.3) : 0) : clamp((local - S.dustFrom - p.d) / 0.1);
      const fade = p.key ? (p.linger ? 1 - clamp((local - S.fadeFrom - 0.2) / (S.lingerTo - S.fadeFrom - 0.2)) : 1 - lf) : 1 - ex * 0.9;
      d.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      d.style.opacity = (appear * fade * p.o * (p.key ? 1.5 : 1)).toFixed(3);
    });
    O.lines.forEach((ln, k) => {
      const pr = LN[k];
      if (!pr || !cur[pr[0]] || !cur[pr[1]]) {
        ln.style.opacity = '0';
        return;
      }
      ln.setAttribute('x1', cur[pr[0]][0].toFixed(1));
      ln.setAttribute('y1', cur[pr[0]][1].toFixed(1));
      ln.setAttribute('x2', cur[pr[1]][0].toFixed(1));
      ln.setAttribute('y2', cur[pr[1]][1].toFixed(1));
      const li = red ? lp : clamp(lp * 1.5 - k * 0.1);
      ln.style.strokeDashoffset = red ? '0' : (1 - li).toFixed(3);
      ln.style.opacity = (li * S.lineOpacity * (1 - lf)).toFixed(3);
    });
    if (lp > 0.95 && !this._jsForm) {
      this._jsForm = true;
      if (!this._jumping) this.playSound('dust');
    } else if (lp < 0.1) this._jsForm = false;
  }
  dustRef = createRef();

  // Stardust transition (About → Beyond the code). Scroll units: 0 = panel starts rising, 1 = landed, 2 = Beyond rises.
  DUST = {
    count: 32,
    countTablet: 20,
    countMobile: 10,
    starFrom: 0.1,
    travelFrom: 0.3,
    travelLen: 0.7, // first star, then dust travels in
    linesFrom: 0.85,
    linesLen: 0.3,
    lineOpacity: 0.32, // constellation draws
    breakFrom: 1.2,
    gatherLen: 0.4, // lines fade, dust gathers at the title
    titleFrom: 1.3,
    titleLen: 0.42,
    titleStagger: 0.022, // letters materialise
    shimmerFrom: 1.74,
    shimmerLen: 0.2,
    subFrom: 1.7,
    glow: 8, // px
    // constellation points (% of the panel) — the key particles settle here
    points: [
      [22, 30],
      [36, 20],
      [52, 34],
      [66, 22],
      [44, 56],
      [74, 50],
    ],
    pointsMobile: [
      [20, 26],
      [48, 18],
      [74, 30],
      [58, 50],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
      [4, 5],
    ],
    linesMobile: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  };

  paintStardust(st) {
    const root = this.dustRef.current;
    if (!root || !this.panels) return;
    const pi = this.panelIdx('Stardust — Beyond the code');
    if (pi < 0) return;
    const local = st - (pi - 1);
    if (local < -0.2 || local > 3) {
      if (!this._dustOff) {
        this._dustOff = true;
      }
      return;
    }
    this._dustOff = false;
    const D = this.DUST,
      clamp = (v) => Math.max(0, Math.min(1, v));
    const ease = (t) => 1 - Math.pow(1 - t, 3),
      eio = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const W = root.clientWidth || 1200,
      H = root.clientHeight || 800,
      red = this.reduced;
    const n = W < 640 ? D.countMobile : W < 1024 ? D.countTablet : D.count;
    const pts = W < 640 ? D.pointsMobile : D.points,
      lns = W < 640 ? D.linesMobile : D.lines;
    if (!this._dust || this._dust.root !== root || this._dust.n !== n) {
      let seed = 7;
      const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      const els = Array.prototype.slice.call(root.querySelectorAll('[data-dust]'));
      const data = els.map((el, i) => {
        const on = i < n,
          key = i < pts.length;
        const side = i % 3,
          sz = key ? 3 : [1, 1, 2, 2, 3, 1, 2, 4][i % 8];
        el.style.display = on ? 'block' : 'none';
        el.style.width = el.style.height = sz + 'px';
        el.style.marginLeft = el.style.marginTop = -sz / 2 + 'px';
        el.style.background = i % 4 === 0 ? 'var(--accent)' : 'var(--ink2)';
        el.style.boxShadow = sz >= 3 ? '0 0 ' + D.glow + 'px rgba(var(--glow-rgb),.55)' : 'none';
        return {
          el,
          on,
          key,
          s: side === 0 ? [rnd() * 30, 100 + rnd() * 10] : side === 1 ? [-6, 40 + rnd() * 60] : [106, 40 + rnd() * 60],
          m: key ? pts[i] : [12 + rnd() * 76, 12 + rnd() * 60],
          c: [(rnd() - 0.5) * 40, -20 - rnd() * 30],
          e: [42 + rnd() * 16, 44 + rnd() * 8],
          o: 0.35 + rnd() * 0.5,
          d: rnd() * 0.18,
        };
      });
      this._dust = {
        root,
        n,
        data,
        lines: Array.prototype.slice.call(root.querySelectorAll('[data-dline]')),
        chars: Array.prototype.slice.call(root.querySelectorAll('[data-bc]')),
        shimmer: root.querySelector('[data-shimmer]'),
        sub: root.querySelector('[data-dsub]'),
        guide: root.querySelector('[data-guide]'),
        trail: root.querySelector('[data-trail]'),
      };
    }
    const C = this._dust;
    const tA = clamp((local - D.travelFrom) / D.travelLen),
      tB = clamp((local - D.breakFrom) / D.gatherLen);
    const fadeOut = clamp((local - 1.85) / 0.3);
    C.data.forEach((p, i) => {
      if (!p.on) return;
      if (red) {
        p.el.style.opacity = p.key ? (clamp((local - 0.4) / 0.3) * (1 - fadeOut) * 0.9).toFixed(3) : '0';
        p.el.style.transform = 'translate3d(' + ((p.m[0] * W) / 100).toFixed(1) + 'px,' + ((p.m[1] * H) / 100).toFixed(1) + 'px,0)';
        return;
      }
      const a = eio(clamp((tA - p.d) / (1 - p.d)));
      // start → constellation point along a curve
      let x = p.s[0] + (p.m[0] - p.s[0]) * a + p.c[0] * Math.sin(Math.PI * a) * 0.5;
      let y = p.s[1] + (p.m[1] - p.s[1]) * a + p.c[1] * Math.sin(Math.PI * a) * 0.5;
      // gather toward the title, key points first; the rest drift outward
      const b = eio(clamp((tB - (p.key ? 0 : 0.15)) / 0.85));
      const ex = p.key ? p.e[0] : p.m[0] + (p.m[0] - 50) * 0.6,
        ey = p.key ? p.e[1] : p.m[1] + (p.m[1] - 45) * 0.5;
      x += (ex - x) * b;
      y += (ey - y) * b;
      p.el.style.transform =
        'translate3d(' +
        ((x * W) / 100).toFixed(1) +
        'px,' +
        ((y * H) / 100).toFixed(1) +
        'px,0) scale(' +
        (1 + (p.key ? 0.3 * Math.sin(Math.PI * clamp((local - D.linesFrom) / 0.4)) : 0)).toFixed(3) +
        ')';
      p.el.style.opacity = (Math.min(1, a * 3) * p.o * (p.key ? 1.4 : 1) * (1 - fadeOut * (p.key ? 1 : 0.9))).toFixed(3);
    });
    // first star (key point 0) brightens before the rest
    const first = C.data[0];
    if (first && first.on && !red) {
      const fs = clamp((local - D.starFrom) / 0.25);
      if (tA < 0.05) {
        first.el.style.transform =
          'translate3d(' +
          ((pts[0][0] * W) / 100).toFixed(1) +
          'px,' +
          ((pts[0][1] * H) / 100).toFixed(1) +
          'px,0) scale(' +
          (0.6 + 0.5 * Math.sin(Math.PI * Math.min(1, fs * 0.9))).toFixed(3) +
          ')';
        first.el.style.opacity = (0.3 + 0.7 * fs).toFixed(3);
      }
    }
    // constellation lines between the key particles
    const lp = red ? clamp((local - 0.5) / 0.3) : clamp((local - D.linesFrom) / D.linesLen);
    const lf = red ? fadeOut : clamp((local - D.breakFrom) / 0.2);
    C.lines.forEach((ln, k) => {
      const pr = lns[k];
      if (!pr) {
        ln.style.opacity = '0';
        return;
      }
      const A = pts[pr[0]],
        B = pts[pr[1]];
      ln.setAttribute('x1', ((A[0] * W) / 100).toFixed(1));
      ln.setAttribute('y1', ((A[1] * H) / 100).toFixed(1));
      ln.setAttribute('x2', ((B[0] * W) / 100).toFixed(1));
      ln.setAttribute('y2', ((B[1] * H) / 100).toFixed(1));
      const li = red ? lp : clamp(lp * 1.5 - k * 0.1);
      ln.style.strokeDashoffset = red ? '0' : (1 - li).toFixed(3);
      ln.style.opacity = (li * D.lineOpacity * (1 - lf)).toFixed(3);
    });
    if (lp > 0.5 && !this._dustSnd) {
      this._dustSnd = true;
      if (!this._jumping) this.playSound('dust');
    } else if (lp < 0.05) this._dustSnd = false;
    // guide star + short trail travelling across to the title
    const gt = clamp((local - (D.titleFrom - 0.1)) / (D.titleLen + 0.15));
    if (C.guide) {
      const gx = (0.12 + 0.76 * gt) * W,
        gy = (0.5 - 0.1 * Math.sin(Math.PI * gt)) * H;
      C.guide.style.transform = 'translate3d(' + gx.toFixed(1) + 'px,' + gy.toFixed(1) + 'px,0)';
      C.guide.style.opacity = red ? '0' : (Math.sin(Math.PI * gt) * 0.95).toFixed(3);
      if (C.trail) {
        const back = Math.max(0, gt - 0.12),
          pts2 = [];
        for (let q = 0; q <= 6; q++) {
          const u = back + ((gt - back) * q) / 6;
          pts2.push(((0.12 + 0.76 * u) * W).toFixed(1) + ',' + ((0.5 - 0.1 * Math.sin(Math.PI * u)) * H).toFixed(1));
        }
        C.trail.setAttribute('d', 'M' + pts2.join(' L'));
        C.trail.style.opacity = red ? '0' : (Math.sin(Math.PI * gt) * 0.22).toFixed(3);
      }
    }
    // title letters materialise as the guide passes
    let done = true;
    C.chars.forEach((ch, k) => {
      const t = red ? clamp((local - D.titleFrom) / 0.3) : ease(clamp((local - D.titleFrom - k * D.titleStagger) / (D.titleLen * 0.6)));
      if (t < 1) done = false;
      ch.style.opacity = t.toFixed(3);
      ch.style.transform = red || t >= 1 ? '' : 'translate3d(0,' + (8 * (1 - t)).toFixed(1) + 'px,0)';
      ch.style.filter = red || t >= 1 ? '' : 'blur(' + (6 * (1 - t)).toFixed(2) + 'px)';
    });
    if (done && !this._chimeSnd && local < 2.2) {
      this._chimeSnd = true;
      if (!this._jumping) this.playSound('chime');
    } else if (!done) this._chimeSnd = false;
    if (C.shimmer) {
      const sh = clamp((local - D.shimmerFrom) / D.shimmerLen);
      C.shimmer.style.setProperty('--sx', (-30 + 160 * sh).toFixed(1) + '%');
      C.shimmer.style.opacity = red ? '0' : (sh > 0 && sh < 1 ? 0.9 : 0).toString();
    }
    if (C.sub) {
      const sv = clamp((local - D.subFrom) / 0.2);
      C.sub.style.opacity = sv.toFixed(3);
      C.sub.style.transform = red ? '' : 'translate3d(0,' + (10 * (1 - sv)).toFixed(1) + 'px,0)';
    }
  }

  // icons that exist in the Beyond the code markup (data-sport="…")
  LIFE_KEYS = ['pickle', 'badminton', 'photo', 'video', 'coffee', 'sneakers', 'cats', 'law'];

  // balanced constellation for any count: 1 centred, 2 diagonal, 3 triangle, more = staggered rows
  lifeCols(n, narrow) {
    const w = this.state.lifeW || (narrow ? 340 : 560);
    const byWidth = Math.max(2, Math.min(4, Math.floor(w / 135)));
    return Math.max(2, Math.min(byWidth, Math.round(Math.sqrt(n)) + (w > 640 ? 1 : 0)));
  }
  lifeBoxRef = createRef();
  lifeLayout(n, narrow) {
    if (n <= 0) return [];
    if (n === 1) return [{ l: 50, t: 46 }];
    if (n === 2)
      return [
        { l: 30, t: 36 },
        { l: 70, t: 62 },
      ];
    if (n === 3)
      return [
        { l: 24, t: 28 },
        { l: 74, t: 36 },
        { l: 46, t: 76 },
      ];
    const cols = this.lifeCols(n, narrow),
      rows = Math.ceil(n / cols);
    const out = [];
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / cols),
        c = i - r * cols,
        inRow = r === rows - 1 ? n - r * cols : cols;
      const step = 80 / cols,
        off = ((cols - inRow) * step) / 2 + (rows > 2 ? 0 : (r % 2 ? 1 : -1) * step * 0.14);
      const l = Math.max(10, Math.min(90, 10 + off + (c + 0.5) * step));
      const t = 8 + (r + 0.5) * (84 / rows) + (rows > 2 ? 0 : rows > 1 ? (c % 2 ? 3 : -3) : 0);
      out.push({ l: +l.toFixed(1), t: +t.toFixed(1) });
    }
    return out;
  }

  // each node joins its two nearest neighbours — no line can point at a missing icon
  lifeLinks(pos) {
    const seen = {},
      out = [];
    pos.forEach((p, i) => {
      pos
        .map((q, j) => ({ j, d: i === j ? Infinity : Math.hypot(p.l - q.l, (p.t - q.t) * 0.8) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, pos.length > 2 ? 2 : 1)
        .forEach(({ j }) => {
          const k = Math.min(i, j) + '-' + Math.max(i, j);
          if (!seen[k] && isFinite(j)) {
            seen[k] = 1;
            out.push([Math.min(i, j), Math.max(i, j)]);
          }
        });
    });
    return out;
  }
  xpRef = createRef();
  footRef = createRef();
  watchFooter() {
    const f = this.footRef.current;
    if (!f || this._fObs) return;
    if (!('IntersectionObserver' in window) || this.reduced) {
      this.setState({ footIn: true });
      return;
    }
    this._fObs = new IntersectionObserver(
      (ents) => {
        ents.forEach((en) => {
          const star = f.querySelector('[data-fstar]');
          if (star) star.style.opacity = en.isIntersecting ? '1' : '.25';
          if (en.isIntersecting && !this.state.footIn) this.setState({ footIn: true });
        });
      },
      { threshold: 0.6 },
    );
    this._fObs.observe(f);
  }
  lbBtnRef = createRef();

  // Clipboard API first; falls back to a hidden textarea where the API is blocked (e.g. embedded frames)
  copyEmail() {
    const v = this.props.email;
    const done = (ok) => {
      this.setState({ copied: ok ? 'ok' : 'fail' });
      clearTimeout(this._cpT);
      this._cpT = setTimeout(() => this.setState({ copied: false }), 1800);
      if (ok) this.playSound('tick');
    };
    const fallback = () => {
      try {
        const ta = document.createElement('textarea');
        ta.value = v;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, v.length);
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        done(ok);
      } catch (e) {
        done(false);
      }
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(v).then(() => done(true), fallback);
    else fallback();
  }

  // Contact form -> server action (validated again on the server, stored in Supabase).
  async sendMessage(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (this.state.formSending) return;
    const data = new FormData(form);
    const check = validateContact(data);
    if (!check.ok) {
      this.setState({ formStatus: check.message });
      return;
    }
    this.setState({ formSending: true, formStatus: 'Sending…' });
    let res;
    try {
      res = await this.props.sendMessage(data);
    } catch (err) {
      res = { ok: false, message: 'Couldn’t send right now. You can email me directly at ' + this.props.email + '.' };
    }
    if (res.ok) {
      this.playSound('confirm');
      form.reset();
    }
    this.setState({ formSending: false, formStatus: res.message });
  }
  xpPaneRef = createRef();
  animPane() {
    const p = this.xpPaneRef.current;
    if (!p || this.reduced || !p.animate) return;
    p.animate(
      [
        { opacity: 0.2, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 480, easing: 'cubic-bezier(.16,1,.3,1)' },
    );
  }

  // Experience accordion — one row open at a time (state.accOpen = 'w0' | 'l0' | null)
  accItem(e, i, kind, st) {
    const key = kind + i,
      open = (st.accOpen || 'w0') === key,
      hov = st.accHover === key;
    const c = this.deckCard(e, i, kind === 'w' ? 'W' : 'L', st);
    const shown = (d) => (open ? '0px' : d);
    return Object.assign({}, c, {
      hid: 'acc-h-' + key,
      pid: 'acc-p-' + key,
      exp: open ? 'true' : 'false',
      hidden: open ? 'false' : 'true',
      vis: open ? 'visible' : 'hidden',
      rows: open ? '1fr' : '0fr',
      rot: open ? '45deg' : '0deg',
      bg: open ? 'rgba(var(--ink-rgb),.05)' : hov ? 'rgba(var(--ink-rgb),.08)' : 'transparent',
      star: kind === 'l' ? 'var(--accent)' : 'var(--ink2)',
      starFill: open ? (kind === 'l' ? 'var(--accent)' : 'var(--ink2)') : 'transparent',
      starGlow: open || hov ? '0 0 8px rgba(var(--glow-rgb),.6)' : 'none',
      line: hov || open ? '1' : '0',
      accent: kind === 'l' ? 'var(--accent)' : 'var(--muted)',
      cols: 'minmax(0,1fr)',
      hasMedia: c.mediaSide || c.mediaInline,
      o1: open ? '1' : '0',
      y1: shown('8px'),
      o2: open ? '1' : '0',
      y2: shown('8px'),
      o3: open ? '1' : '0',
      y3: shown('8px'),
      o4: open ? '1' : '0',
      y4: shown('12px'),
      toggle: () => {
        this.playSound('tick');
        const same = (this.state.accOpen || 'w0') === key;
        this.setState({ accOpen: key, xpSheet: !!this.state.narrow, xpFull: same ? this.state.xpFull : false }, () => {
          if (!same) this.animPane();
        });
      },
      arrow: open ? '1' : hov ? '.6' : '0',
      arrowX: open || hov ? '0px' : '-6px',
      kindLabel: kind === 'l' ? 'Leadership' : 'Work',
      aria: (kind === 'l' ? 'Leadership' : 'Work') + ' — ' + e.role,
      mCols: c.hasRest && !st.narrow ? 'minmax(0,1.6fr) minmax(0,1fr)' : 'minmax(0,1fr)',
      enter: () => this.setState({ accHover: key, hover: true }),
      leave: () => this.setState({ accHover: null, hover: false }),
    });
  }

  // Only images you have explicitly approved are ever shown: { src, alt, caption, safeForPortfolio: true }
  safeMedia(e) {
    return (e.media || []).filter((m) => m && ((m.src && m.safeForPortfolio === true) || m.placeholder)).slice(0, 3);
  }
  deckHasMedia() {
    return this.EXPERIENCE.concat(this.LEADERSHIP).some((e) => this.safeMedia(e).length > 0);
  }
  deckCard(e, i, prefix, st) {
    const med = this.safeMedia(e),
      has = med.length > 0,
      narrow = !!st.narrow;
    const mk = (m) => ({
      isPh: !!m.placeholder,
      label: m.label || 'Work image [PH]',
      src: m.placeholder ? '' : m.src,
      alt: m.placeholder ? '' : m.alt || '',
      pos: m.pos || '50% 50%',
      caption: m.caption || '',
      hasCap: !!m.caption,
      aria: 'View larger — ' + (m.alt || e.role + ' work'),
      open: (ev) => {
        if (!m.placeholder) this.openLb(m, ev && ev.currentTarget);
      },
    });
    const tags = (e.tags || []).slice(0, 5);
    return Object.assign({}, e, {
      num: prefix + String(i + 1).padStart(2, '0'),
      hasBullets: !!(e.bullets && e.bullets.length),
      bullets: has ? (e.bullets || []).slice(0, 4) : (e.bullets || []).slice(0, 7),
      tags,
      hasTags: tags.length > 0,
      mediaSide: has && !narrow,
      mediaInline: has && narrow,
      cols: has && !narrow ? 'minmax(0,1.05fr) minmax(0,.95fr)' : 'minmax(0,1fr)',
      inlineH: '130px',
      m0: has ? mk(med[0]) : { hasCap: false },
      rest: med.slice(1).map(mk),
      hasRest: med.length > 1 && !narrow,
    });
  }
  openLb(m, opener) {
    this._lbOpener = opener || null;
    this.setState({ lb: { src: m.src, alt: m.alt || '', caption: m.caption || '' }, hover: false }, () => {
      const b = this.lbBtnRef.current;
      if (b)
        try {
          b.focus({ preventScroll: true });
        } catch (e) {}
    });
  }
  closeLb() {
    this.setState({ lb: null });
    const o = this._lbOpener;
    this._lbOpener = null;
    if (o)
      try {
        o.focus({ preventScroll: true });
      } catch (e) {}
  }

  // Leadership roles

  // Experience + Education. The current employer is intentionally shown only as "Private Company" — never add its name, products, clients or URLs here.
  // Card media (optional, max 3): media: [{ src: '/images/work/file.jpg', alt: 'What the image shows', caption: '', safeForPortfolio: true }]
  // Anything without safeForPortfolio: true is never displayed. tags: ['React', 'APIs'] is optional too.

  // highlight the entry nearest the middle of the Experience scroller (no React state)
  initXpObserver() {
    const root = this.xpRef.current;
    if (!root || this._xpObs || !('IntersectionObserver' in window) || this.reduced) return;
    const rows = Array.prototype.slice.call(root.querySelectorAll('[data-xrow]'));
    const set = (el, on) => {
      el.style.opacity = on ? '1' : '.62';
      const n = el.querySelector('[data-xnode]');
      if (n) {
        n.style.background = on ? 'var(--ink)' : 'var(--bg)';
        n.style.borderColor = on ? 'var(--ink)' : 'rgba(var(--ink-rgb),.4)';
        n.style.boxShadow = on ? '0 0 10px rgba(var(--glow-rgb),.5)' : 'none';
      }
    };
    rows.forEach((r) => set(r, false));
    this._xpObs = new IntersectionObserver(
      (ents) => {
        ents.forEach((en) => set(en.target, en.isIntersecting));
      },
      { root, rootMargin: '-30% 0px -30% 0px', threshold: 0 },
    );
    rows.forEach((r) => this._xpObs.observe(r));
  }

  // Beyond the code — sports + your own photos. Leave src '' to show a labelled placeholder.
  LIFE = {
    // Interest constellation. Add/remove entries freely — positions and connecting lines are generated
    // from whatever is listed here. key must match a data-sport icon in the Beyond the code markup.
    sports: [
      { key: 'pickle', name: 'Pickleball', desc: 'Fast rallies, good energy.', move: 'rotate(-14deg)' },
      { key: 'badminton', name: 'Badminton', desc: 'Quick feet, quicker reactions.', move: 'translateY(-7px)' },
      { key: 'photo', name: 'Photography', desc: 'Noticing the small details.', move: 'scale(1.18)' },
      { key: 'video', name: 'Video editing', desc: 'Turning moments into stories.', move: 'scale(1.35)' },
      { key: 'coffee', name: 'Coffee', desc: 'A pause and a reset.', move: 'translateY(-4px)' },
      { key: 'sneakers', name: 'Sneakers', desc: 'Stories in every pair.', move: 'translateY(-3px) rotate(-6deg)' },
      { key: 'cats', name: 'Cats', desc: 'Quiet joy, always.', move: 'rotate(-7deg)' },
      { key: 'law', name: 'Law', desc: 'Another way of thinking.', move: 'rotate(-9deg)' },
    ],
    gym: [{ src: '', alt: 'At the gym', pos: '50% 40%' }],
    travel: [
      // l / t / w / h are % of the collage box; r = tilt; frame = postcard border
      { src: '', alt: '', location: '', l: 0, t: 6, w: 62, h: 64, r: -2, z: 1, frame: 6, rad: 14, par: 0.12 },
      { src: '', alt: '', location: '', l: 58, t: 0, w: 36, h: 60, r: 3, z: 2, frame: 8, rad: 10, par: 0.26 },
      { src: '', alt: '', location: '', l: 8, t: 62, w: 34, h: 36, r: 2, z: 3, frame: 8, rad: 8, par: 0.34 },
      { src: '', alt: '', location: '', l: 50, t: 64, w: 42, h: 34, r: -3, z: 2, frame: 6, rad: 12, par: 0.2 },
    ],
    diary: [
      { src: '', alt: '', caption: '', date: '', location: '', ar: '4 / 5' },
      { src: '', alt: '', caption: '', date: '', location: '', ar: '3 / 2' },
      { src: '', alt: '', caption: '', date: '', location: '', ar: '4 / 5' },
      { src: '', alt: '', caption: '', date: '', location: '', ar: '1 / 1' },
      { src: '', alt: '', caption: '', date: '', location: '', ar: '3 / 2' },
      { src: '', alt: '', caption: '', date: '', location: '', ar: '4 / 5' },
      { src: '', alt: '', caption: '', date: '', location: '', ar: '3 / 4' },
    ],
  };

  lifeVals(st) {
    const L = this.LIFE,
      narrow = st.narrow,
      h = st.spHover;
    const ph = (p, label) => ({ has: !!p.src, none: !p.src, src: p.src, alt: p.alt || '', pos: p.pos || '50% 50%', label });
    const out = {
      lifeCols: narrow ? 'minmax(0,1fr)' : 'minmax(0,.9fr) minmax(0,1.1fr)',
      spOut: () => this.setState({ spHover: null, hover: false }),
      gymPhotos: L.gym.map((p) => ph(p, 'Gym photo [PH]')),
      travelPhotos: L.travel.map((p, i) =>
        Object.assign(ph(p, 'Travel photo ' + (i + 1) + ' [PH]'), {
          posMode: narrow ? 'relative' : 'absolute',
          l: narrow ? 'auto' : p.l + '%',
          t: narrow ? 'auto' : p.t + '%',
          w: narrow ? '100%' : p.w + '%',
          h: narrow ? (i === 0 ? '200px' : '150px') : p.h + '%',
          mb: narrow ? '10px' : '0',
          r: narrow || this.reduced ? '0deg' : p.r + 'deg',
          z: String(p.z),
          frame: p.frame + 'px',
          rad: p.rad + 'px',
          par: String(this.reduced ? 0 : p.par),
          hasLoc: !!p.location,
          location: p.location,
        }),
      ),
      diaryPhotos: L.diary.map((p, i) =>
        Object.assign(ph(p, 'Photo [PH]'), {
          ar: p.ar,
          num: String(i + 1).padStart(2, '0'),
          meta: [p.date, p.location, p.caption].filter(Boolean).join(' · '),
        }),
      ),
    };
    const icons = this.LIFE_KEYS;
    const list = L.sports.filter((sp) => icons.indexOf(sp.key) >= 0);
    const pos = this.lifeLayout(list.length, narrow);
    const spk = {};
    icons.forEach((k) => {
      spk[k] = {
        disp: 'none',
        L: '50%',
        T: '50%',
        Name: '',
        Desc: '',
        Aria: '',
        B: '.2',
        Bg: '.02',
        C: 'var(--muted)',
        N: 'var(--body)',
        D: '0',
        Dy: '6px',
        Move: 'none',
        In: () => {},
      };
    });
    list.forEach((sp, i) => {
      const on = h === i;
      spk[sp.key] = {
        disp: 'flex',
        L: pos[i].l + '%',
        T: pos[i].t + '%',
        Name: sp.name,
        Desc: sp.desc,
        Aria: sp.name + ' — ' + sp.desc,
        B: on ? '.5' : '.2',
        Bg: on ? '.07' : '.02',
        C: on ? 'var(--ink)' : 'var(--muted)',
        N: on ? 'var(--ink)' : 'var(--body)',
        D: on ? '1' : '0',
        Dy: on ? '0px' : '6px',
        Move: on && !this.reduced ? sp.move : 'none',
        In: () => {
          this.playSound('sparkle');
          this.setState({ spHover: i, hover: true });
        },
      };
    });
    out.spk = spk;
    out.spLines = this.lifeLinks(pos).map(([a, b]) => ({
      x1: pos[a].l + '%',
      y1: pos[a].t + '%',
      x2: pos[b].l + '%',
      y2: pos[b].t + '%',
      op: h === a || h === b ? '.5' : '.14',
    }));
    const rowsN = list.length > 3 ? Math.ceil(list.length / this.lifeCols(list.length, narrow)) : 2;
    out.spSize = narrow
      ? '44px'
      : 'clamp(40px,min(6vw,' +
        (rowsN > 3 ? '5.5vh' : rowsN > 2 ? '7vh' : '10vh') +
        '),' +
        (rowsN > 3 ? '54px' : rowsN > 2 ? '64px' : '76px') +
        ')';
    out.lifeBoxRef = this.lifeBoxRef;
    out.spLabel = narrow ? '9px' : 'clamp(10px,1vw,12px)';
    return out;
  }
  cpStageRef = createRef();
  cpLineRef = createRef();
  cpFormRef = createRef();
  bookRef = createRef();

  // Scheduling widget — replace with your real availability or a Cal.com / Calendly embed
  BOOK = { days: 10, slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] };
  bookDays() {
    if (this._bd && this._bdDate === new Date().toDateString()) return this._bd;
    const out = [],
      d = new Date();
    d.setDate(d.getDate() + 1);
    const W = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    while (out.length < this.BOOK.days) {
      if (d.getDay() !== 0 && d.getDay() !== 6)
        out.push({
          wd: W[d.getDay()],
          dn: String(d.getDate()),
          mo: M[d.getMonth()],
          full: W[d.getDay()] + ', ' + M[d.getMonth()] + ' ' + d.getDate(),
        });
      d.setDate(d.getDate() + 1);
    }
    this._bd = out;
    this._bdDate = new Date().toDateString();
    return out;
  }

  // ContactMe floating pills — desktop positions (% of stage), rotation (deg), idle period (s)
  CONTACT = {
    pills: [
      { l: 58, t: 24, r: -4, p: 6.2 },
      { l: 49, t: 52, r: 3, p: 7.4 },
      { l: 82, t: 6, r: 8, p: 5.6 },
      { l: 87, t: 62, r: -7, p: 6.8 },
      { l: 68, t: 80, r: -2, p: 7.9 },
      { l: 0, t: 80, r: 2, p: 6.6 },
    ],
    copy: { l: 49, t: 69 },
    float: 4,
    pull: 8,
    radius: 220,
  };

  runContact() {
    const tick = (now) => {
      this._cpr = requestAnimationFrame(tick);
      const st = this.cpStageRef.current;
      if (!st || this.state.narrow || this.reduced) return;
      const els = Array.prototype.slice.call(st.querySelectorAll('[data-cpill]'));
      if (!els.length) return;
      const sr = st.getBoundingClientRect();
      if (sr.bottom < 0 || sr.top > (window.innerHeight || 900)) return;
      const C = this.CONTACT,
        t = now / 1000,
        centers = [];
      els.forEach((el, i) => {
        const c = C.pills[i];
        if (!c) return;
        el._h = (el._h || 0) + ((this._cpHover === i ? 1 : 0) - (el._h || 0)) * 0.14;
        const w = el.offsetWidth,
          h = el.offsetHeight;
        const cx = sr.left + el.offsetLeft + w / 2,
          cy = sr.top + el.offsetTop + h / 2;
        let px = 0,
          py = 0;
        if (this._cpx != null) {
          const dx = this._cpx - cx,
            dy = this._cpy - cy,
            d = Math.hypot(dx, dy),
            k = Math.max(0, 1 - d / C.radius);
          if (d > 0) {
            px = (dx / d) * C.pull * k;
            py = (dy / d) * C.pull * k;
          }
        }
        el._px = (el._px || 0) + (px - (el._px || 0)) * 0.1;
        el._py = (el._py || 0) + (py - (el._py || 0)) * 0.1;
        const idle = Math.sin((t / c.p) * Math.PI * 2 + i) * C.float;
        const rot = (c.r + Math.sin((t / c.p) * Math.PI * 2 + i * 1.7) * 0.8) * (1 - el._h);
        el.style.transform =
          'translate3d(' +
          el._px.toFixed(2) +
          'px,' +
          (idle + el._py).toFixed(2) +
          'px,0) rotate(' +
          rot.toFixed(2) +
          'deg) scale(' +
          (1 + 0.02 * el._h).toFixed(4) +
          ')';
        const ar = el.querySelector('[data-cparrow]');
        if (ar) {
          ar.style.opacity = (0.5 + 0.5 * el._h).toFixed(2);
          ar.style.transform = 'translate(' + (2 * el._h).toFixed(1) + 'px,' + (-2 * el._h).toFixed(1) + 'px)';
        }
        centers[i] = { x: el.offsetLeft + w / 2 + el._px, y: el.offsetTop + h / 2 + idle + el._py };
      });
      const ln = this.cpLineRef.current ? this.cpLineRef.current.querySelectorAll('[data-cpline]') : [];
      [
        [0, 1],
        [0, 2],
      ].forEach((pr, k) => {
        const a = centers[pr[0]],
          b = centers[pr[1]],
          l = ln[k];
        if (!a || !b || !l) return;
        l.setAttribute('x1', a.x.toFixed(1));
        l.setAttribute('y1', a.y.toFixed(1));
        l.setAttribute('x2', b.x.toFixed(1));
        l.setAttribute('y2', b.y.toFixed(1));
        const lit = Math.max(els[pr[0]]._h || 0, els[pr[1]]._h || 0);
        l.style.opacity = (this.state.formOpen ? 0 : 0.14 + 0.24 * lit).toFixed(3);
      });
    };
    this._cpr = requestAnimationFrame(tick);
  }
  navRef = createRef();
  navPillRef = createRef();
  navBarRef = createRef();
  navVeilRef = createRef();

  getTheme() {
    try {
      return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    } catch (e) {
      return 'dark';
    }
  }

  toggleTheme() {
    this.playSound('tick');
    const next = this.getTheme() === 'light' ? 'dark' : 'light';
    const root = document.documentElement;
    if (!this.reduced) {
      root.setAttribute('data-theming', '');
      clearTimeout(this._thT);
      this._thT = setTimeout(() => root.removeAttribute('data-theming'), 420);
    }
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('bec.theme', next);
    } catch (e) {}
    this.setState({ theme: next });
  }
  NAV = { targets: [0, 3, 7, 9] }; // panel index each link scrolls to

  // label-driven so it survives sections being added or removed
  panelLabels() {
    const sc = this.scrollRef.current;
    const ps = sc ? Array.prototype.slice.call(sc.querySelectorAll('[data-panel]')) : [];
    let last = 'Hero';
    return ps.map((p) => {
      const l = p.getAttribute('data-screen-label');
      if (l) last = l;
      return last;
    });
  }
  navIndex(active) {
    const l = this.panelLabels()[active] || 'Hero';
    if (/Contact/.test(l)) return 4;
    if (/Work|Tech|Elsewhere/.test(l)) return 3;
    if (/Experience|Education/.test(l)) return 2;
    if (/About|Journey|Beyond|Travel|Documenting/.test(l)) return 1;
    return 0;
  }
  navTarget(k) {
    const want = ['Hero', 'About', 'Experience', 'Work', 'Contact'][k];
    const sc = this.scrollRef.current;
    const ps = sc ? Array.prototype.slice.call(sc.querySelectorAll('[data-panel]')) : [];
    const i = ps.findIndex((p) => p.getAttribute('data-screen-label') === want);
    return i < 0 ? 0 : i;
  }

  updateNavPill() {
    const nav = this.navRef.current,
      pill = this.navPillRef.current;
    if (!nav || !pill) return;
    const btn = nav.querySelector('[data-nav="' + this.navIndex(this.state.active) + '"]');
    if (!btn) return;
    pill.style.width = btn.offsetWidth + 'px';
    pill.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
    pill.style.opacity = '1';
    if (!this._navInit) {
      this._navInit = true;
      const t = pill.style.transition;
      pill.style.transition = 'none';
      void pill.offsetWidth;
      pill.style.transition = t;
    }
  }

  // Nav jumps: soft fade out → land directly on the section → fade in (never scrubs through the transitions)
  navGo(k) {
    const sc = this.scrollRef.current,
      veil = this.navVeilRef.current;
    if (!sc) return;
    const i = this.navTarget(k);
    this.playSound('tick');
    this.setState({ hover: false });
    const land = () => {
      this._jumping = true;
      setTimeout(() => {
        this._jumping = false;
      }, 600);
      sc.scrollTop = i * sc.clientHeight;
      this.sm = i;
      this.painted = false;
      this.last = undefined;
      this.setState({ active: i });
    };
    if (i === this.state.active) return;
    if (this.reduced || !veil || !veil.animate) {
      land();
      return;
    }
    if (this._navAnim) this._navAnim.cancel();
    const a = veil.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
    this._navAnim = a;
    a.finished.then(
      () => {
        land();
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const b = veil.animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: 480,
              easing: 'cubic-bezier(.16,1,.3,1)',
              fill: 'forwards',
            });
            this._navAnim = b;
          }),
        );
      },
      () => {},
    );
  }

  // images bound to data are given a real src only once the value has resolved, so no request is ever made for an unresolved placeholder
  syncImgs() {
    const root = this.scrollRef.current && this.scrollRef.current.parentElement;
    const list = (root || document).querySelectorAll('img[data-src]');
    for (let i = 0; i < list.length; i++) {
      const el = list[i],
        v = el.getAttribute('data-src');
      if (v && v.indexOf('{{') < 0 && el.getAttribute('src') !== v) el.setAttribute('src', v);
    }
  }

  componentDidUpdate() {
    this.syncImgs();
    const k = this.state.active + '|' + this.state.view;
    if (k !== this._navKey) {
      this._navKey = k;
      this.updateNavPill();
    }
  }
  techRef = createRef();

  // TechConstellation — rows drift → converge on arcs → constellation → title
  TECH = {
    list: [
      { name: 'React', row: 0, rx: 0, fx: 13.4, fy: 17, mfx: 27, mfy: 9, arc: 0.03 },
      { name: 'Next.js', row: 1, rx: 0.37, fx: 20.6, fy: 22.6, mfx: 27, mfy: 13.2, arc: -0.045 },
      { name: 'Tailwind CSS', row: 0, rx: 0.74, fx: 13.4, fy: 28.2, mfx: 27, mfy: 17.4, arc: 0.06 },
      { name: 'Radix UI', row: 1, rx: 0.10999999999999988, fx: 20.6, fy: 33.8, mfx: 27, mfy: 21.6, arc: -0.03 },
      { name: 'Zustand', row: 0, rx: 0.48, fx: 13.4, fy: 39.4, mfx: 27, mfy: 25.8, arc: 0.045 },
      { name: 'Node.js', row: 1, rx: 0.8500000000000001, fx: 46.4, fy: 15, mfx: 73, mfy: 9, arc: 0.06 },
      { name: 'Express', row: 0, rx: 0.21999999999999975, fx: 53.6, fy: 20.6, mfx: 73, mfy: 13.2, arc: -0.03 },
      { name: 'FastAPI', row: 1, rx: 0.5899999999999999, fx: 46.4, fy: 26.2, mfx: 73, mfy: 17.4, arc: 0.045 },
      { name: 'Hono', row: 0, rx: 0.96, fx: 53.6, fy: 31.8, mfx: 73, mfy: 21.6, arc: -0.06 },
      { name: 'Cloudflare Workers', row: 1, rx: 0.33000000000000007, fx: 46.4, fy: 37.4, mfx: 73, mfy: 25.8, arc: 0.03 },
      { name: 'MongoDB', row: 0, rx: 0.7000000000000002, fx: 79.4, fy: 17, mfx: 27, mfy: 36, arc: 0.045 },
      { name: 'Supabase', row: 1, rx: 0.07000000000000028, fx: 86.6, fy: 22.6, mfx: 27, mfy: 40.2, arc: -0.06 },
      { name: 'Firebase', row: 0, rx: 0.4399999999999995, fx: 79.4, fy: 28.2, mfx: 27, mfy: 44.4, arc: 0.03 },
      { name: 'Cloudflare D1', row: 1, rx: 0.8099999999999996, fx: 86.6, fy: 33.8, mfx: 27, mfy: 48.6, arc: -0.045 },
      { name: 'R2', row: 0, rx: 0.17999999999999972, fx: 79.4, fy: 39.4, mfx: 27, mfy: 52.8, arc: 0.06 },
      { name: 'Canva', row: 1, rx: 0.5499999999999998, fx: 13.4, fy: 53, mfx: 73, mfy: 36, arc: 0.03 },
      { name: 'Figma', row: 0, rx: 0.9199999999999999, fx: 20.6, fy: 58.6, mfx: 73, mfy: 40.2, arc: -0.045 },
      { name: 'UI/UX Design', row: 1, rx: 0.29000000000000004, fx: 13.4, fy: 64.2, mfx: 73, mfy: 44.4, arc: 0.06 },
      { name: 'Responsive Design', row: 0, rx: 0.6600000000000001, fx: 20.6, fy: 69.8, mfx: 73, mfy: 48.6, arc: -0.03 },
      { name: 'Prototyping', row: 1, rx: 0.03000000000000025, fx: 13.4, fy: 75.4, mfx: 73, mfy: 52.8, arc: 0.045 },
      { name: 'Expo', row: 0, rx: 0.40000000000000036, fx: 46.4, fy: 55, mfx: 27, mfy: 62, arc: 0.06 },
      { name: 'React Native', row: 1, rx: 0.7699999999999996, fx: 53.6, fy: 60.6, mfx: 27, mfy: 66.2, arc: -0.03 },
      { name: 'Vercel', row: 0, rx: 0.14000000000000057, fx: 79.4, fy: 53, mfx: 73, mfy: 62, arc: 0.045 },
      { name: 'Render', row: 1, rx: 0.5099999999999998, fx: 86.6, fy: 58.6, mfx: 73, mfy: 66.2, arc: -0.06 },
      { name: 'Cloudflare', row: 0, rx: 0.879999999999999, fx: 79.4, fy: 64.2, mfx: 73, mfy: 70.4, arc: 0.03 },
      { name: 'GitHub', row: 1, rx: 0.25, fx: 86.6, fy: 69.8, mfx: 73, mfy: 74.6, arc: -0.045 },
    ],
    links: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [10, 11],
      [11, 12],
      [12, 13],
      [13, 14],
      [15, 16],
      [16, 17],
      [17, 18],
      [18, 19],
      [20, 21],
      [22, 23],
      [23, 24],
      [24, 25],
      [1, 22],
      [9, 13],
      [0, 21],
      [11, 5],
    ],
    rowsY: [0.34, 0.58], // marquee rows (fraction of height)
    marqueeSpeed: 70, // px/s, row 1 left, row 2 right
    rowsFrom: 0.3, // local scroll units
    convergeFrom: 0.52,
    convergeLen: 0.42,
    stagger: 0.006, // 26 nodes: last one lands by ~1.1
    linesFrom: 1.0,
    linesLen: 0.2,
    lineOpacity: 0.3,
    titleFrom: 1.1,
    titleLen: 0.18,
    radius: 120, // cursor proximity radius (px)
    dim: 0.5, // resting opacity once settled
  };

  paintTech(local, W, H, ex) {
    const T = this.TECH,
      ul = this.techRef.current;
    if (!ul) return;
    const clamp = (v) => Math.max(0, Math.min(1, v));
    if (!this._tc || this._tc.ul !== ul) {
      const q = (sel, root) => Array.prototype.slice.call((root || ul).querySelectorAll(sel));
      const scene = this.wSceneRef.current;
      this._tc = {
        ul,
        nodes: q('[data-tn]').map((el) => ({
          el,
          brand: el.querySelector('[data-tbrand]'),
          label: el.querySelector('[data-tlabel]'),
          desc: el.querySelector('[data-tdesc]'),
        })),
        lines: this.wLinesRef.current ? q('[data-wline]', this.wLinesRef.current) : [],
        cats: scene ? q('[data-tcat]', scene) : [],
        t0: performance.now(),
      };
    }
    const C = this._tc,
      narrow = W < 640,
      now = performance.now();
    const ease = (a) => (a < 0.5 ? 4 * a * a * a : 1 - Math.pow(-2 * a + 2, 3) / 2);
    const drift = ((now - C.t0) / 1000) * T.marqueeSpeed + local * W * 0.6;
    const span = W * 1.3;
    const pos = [];
    let settledAll = true;
    T.list.forEach((t, i) => {
      const n = C.nodes[i];
      if (!n) return;
      const fx = ((narrow ? t.mfx : t.fx) / 100) * W,
        fy = ((narrow ? t.mfy : t.fy) / 100) * H;
      let mx = t.rx * span + (t.row === 0 ? -drift : drift);
      mx = (((mx % span) + span) % span) - W * 0.15;
      const my = T.rowsY[t.row] * H;
      const e = this.reduced ? 1 : ease(clamp((local - T.convergeFrom - i * T.stagger) / T.convergeLen));
      if (e < 1) settledAll = false;
      const arc = Math.sin(Math.PI * e) * t.arc * H * (narrow ? 0.5 : 1);
      const x = mx + (fx - mx) * e,
        y = my + (fy - my) * e - arc;
      pos[i] = { x, y };
      const appear = this.reduced ? clamp((local - T.convergeFrom) / 0.3) : clamp((local - T.rowsFrom) / 0.15);
      // cursor proximity (desktop, once settled)
      let prox = 0;
      if (!narrow && e >= 1 && this._tmx != null) prox = clamp(1 - Math.hypot(this._tmx - x, this._tmy - y) / T.radius);
      const focus = document.activeElement === n.el ? 1 : 0;
      const lit = Math.max(prox, focus);
      const base = e < 1 ? 0.35 + 0.35 * e : T.dim;
      n.el.style.opacity = (appear * (base + (1 - base) * lit)).toFixed(3);
      n.el.style.transform =
        'translate3d(' +
        x.toFixed(1) +
        'px,' +
        (y - 2 * lit).toFixed(1) +
        'px,0) translate(-50%,-50%) scale(' +
        (1 + 0.03 * lit).toFixed(3) +
        ')';
      if (n.brand) n.brand.style.opacity = (0.85 * lit).toFixed(3);
      if (n.label) n.label.style.color = lit > 0.5 ? 'var(--ink)' : 'var(--body)';
      if (n.desc) n.desc.style.opacity = clamp((lit - 0.55) / 0.3).toFixed(3);
      pos[i].lit = lit;
    });
    const lp = this.reduced ? clamp((local - T.convergeFrom - 0.3) / 0.2) : clamp((local - T.linesFrom) / T.linesLen);
    if (lp > 0.3 && !this._formSnd) {
      this._formSnd = true;
      if (!this._jumping) this.playSound('form');
    } else if (lp < 0.05) this._formSnd = false;
    C.lines.forEach((ln, k) => {
      const pr = T.links[k];
      if (!pr || (narrow && k > 10)) {
        ln.style.opacity = '0';
        return;
      }
      const a = pos[pr[0]],
        b = pos[pr[1]];
      if (!a || !b) return;
      ln.setAttribute('x1', a.x.toFixed(1));
      ln.setAttribute('y1', a.y.toFixed(1));
      ln.setAttribute('x2', b.x.toFixed(1));
      ln.setAttribute('y2', b.y.toFixed(1));
      const li = clamp(lp * 1.4 - k * 0.06);
      ln.style.strokeDashoffset = this.reduced ? '0' : (1 - li).toFixed(3);
      ln.style.opacity = (li * (T.lineOpacity + 0.3 * Math.max(a.lit || 0, b.lit || 0))).toFixed(3);
    });
    C.cats.forEach((el) => {
      const v = el.getAttribute('data-tcat').split(',').map(Number);
      const x = ((narrow ? v[2] : v[0]) / 100) * W,
        y = ((narrow ? v[3] : v[1]) / 100) * H;
      el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) translate(-50%,-50%)';
      el.style.opacity = (lp * 0.9).toFixed(3);
    });
    const title = this.wTitleRef.current,
      sub = this.wSubRef.current;
    const tp = clamp((local - T.titleFrom) / T.titleLen);
    if (title) {
      title.style.opacity = tp.toFixed(3);
      title.style.transform = this.reduced ? '' : 'translate3d(0,' + (14 * (1 - tp)).toFixed(1) + 'px,0)';
    }
    if (sub) sub.style.opacity = clamp((local - T.titleFrom - 0.08) / T.titleLen).toFixed(3);
    this._techLive = local > T.rowsFrom && local < 1.8 && !settledAll;
  }
  track1Ref = createRef();
  track2Ref = createRef();
  MARQUEE = { speed: 38, copies: 3 }; // px per second; how many times each row repeats

  rowOrder(row) {
    const n = this.projects.length,
      half = Math.ceil(n / 2);
    const all = this.projects.map((_, i) => i);
    return n < 4 ? all : row === 0 ? all.slice(0, half) : all.slice(half);
  }
  marqueeRow(n, order, st) {
    const out = [];
    for (let c = 0; c < this.MARQUEE.copies; c++)
      order.forEach((i) => {
        const p = this.projects[i],
          key = n + '-' + c + '-' + i,
          on = st.hovCard === key || this._touch;
        out.push(
          Object.assign({}, p, {
            tab: c === 0 ? '0' : '-1',
            hid: c === 0 ? 'false' : 'true',
            aria: 'Open ' + p.name + ' case study',
            ovOp: on ? '1' : '0',
            ovY: on ? '0px' : '8px',
            imgScale: st.hovCard === key && !this.reduced ? '1.035' : '1',
            open: (e) => this.openCase(i, e && e.currentTarget),
            enter: () => this.setState({ hovCard: key, hover: true }),
            leave: () => this.setState({ hovCard: null, hover: false }),
          }),
        );
      });
    return out;
  }

  // two rows drifting in opposite directions; pause on hover, focus, open case, or reduced motion
  runMarquee() {
    let last = performance.now(),
      o1 = 0,
      o2 = 0;
    const tick = (now) => {
      this._mqr = requestAnimationFrame(tick);
      const dt = Math.min(64, now - last);
      last = now;
      const t1 = this.track1Ref.current,
        t2 = this.track2Ref.current;
      if (this._techLive || this._tmx != null) {
        const scx = this.scrollRef.current;
        if (scx) {
          const Hh = scx.clientHeight || 1;
          this.paintWork(scx.scrollTop / Hh, Hh);
        }
      }
      if (!t1 || !t2 || this.reduced) return;
      const sc = this.scrollRef.current;
      if (!sc) return;
      const sv = sc.scrollTop / (sc.clientHeight || 1);
      const wi = this.panelIdx('Work');
      if (wi < 0 || sv < wi - 0.45 || sv > wi + 0.6) {
        this._mqLast = sc.scrollTop;
        return;
      }
      const boost = Math.min(60, Math.abs(sc.scrollTop - (this._mqLast == null ? sc.scrollTop : this._mqLast)) * 0.6);
      this._mqLast = sc.scrollTop;
      const busy = this.state.caseIdx !== null;
      const v = (this.MARQUEE.speed * dt) / 1000 + boost;
      if (!busy && !this._mq1p && !t1.contains(document.activeElement)) o1 += v;
      if (!busy && !this._mq2p && !t2.contains(document.activeElement)) o2 += v;
      const h1 = t1.scrollWidth / this.MARQUEE.copies,
        h2 = t2.scrollWidth / this.MARQUEE.copies;
      if (h1 > 0) t1.style.transform = 'translate3d(' + (-(o1 % h1)).toFixed(1) + 'px,0,0)';
      if (h2 > 0) t2.style.transform = 'translate3d(' + (-h2 + (o2 % h2)).toFixed(1) + 'px,0,0)';
    };
    this._mqr = requestAnimationFrame(tick);
  }
  caseRef = createRef();
  caseHeroRef = createRef();
  caseCloseRef = createRef();

  // Card → case study: FLIP the hero from the card's rect, fade the rest in
  openCase(i, fromEl, isNext) {
    const p = this.projects[i];
    if (!p) return;
    this.beep('open');
    const from = fromEl && fromEl.getBoundingClientRect ? fromEl.getBoundingClientRect() : null;
    if (fromEl) this._caseReturn = fromEl;
    const wasOpen = this.state.caseIdx !== null;
    this.setState({ caseIdx: i, hover: false, hovCard: null }, () => {
      const ov = this.caseRef.current,
        hero = this.caseHeroRef.current;
      if (!ov) return;
      if (isNext) ov.scrollTo({ top: 0, behavior: 'auto' });
      try {
        const h = '#work/' + p.slug;
        if (!wasOpen) {
          history.pushState({ bcase: p.slug }, '', h);
          this._casePushed = true;
        } else history.replaceState({ bcase: p.slug }, '', h);
      } catch (e) {}
      const fades = Array.prototype.slice.call(ov.querySelectorAll('[data-cfade]'));
      if (this.reduced || !ov.animate) {
        ov.animate && ov.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
        this.focusCase();
        return;
      }
      const E = 'cubic-bezier(.16,1,.3,1)';
      if (!wasOpen)
        ov.animate([{ backgroundColor: 'rgba(var(--bg-rgb),0)' }, { backgroundColor: 'rgba(var(--bg-rgb),1)' }], {
          duration: 420,
          easing: 'ease-out',
        });
      fades.forEach((el, k) =>
        el.animate(
          [
            { opacity: 0, transform: 'translateY(16px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 520, delay: 180 + k * 90, easing: E, fill: 'backwards' },
        ),
      );
      if (hero && from) {
        const to = hero.getBoundingClientRect();
        const sx = from.width / to.width,
          sy = from.height / to.height;
        hero.animate(
          [
            {
              transform: 'translate(' + (from.left - to.left) + 'px,' + (from.top - to.top) + 'px) scale(' + sx + ',' + sy + ')',
              borderRadius: '18px',
            },
            { transform: 'none' },
          ],
          { duration: 700, easing: E },
        );
      } else if (hero)
        hero.animate(
          [
            { opacity: 0, transform: 'translateY(20px)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 520, delay: 140, easing: E, fill: 'backwards' },
        );
      this.focusCase();
    });
  }

  focusCase() {
    const b = this.caseCloseRef.current;
    if (b)
      try {
        b.focus({ preventScroll: true });
      } catch (e) {
        b.focus();
      }
  }

  closeCase(fromPop) {
    if (this.state.caseIdx === null || this._closing) return;
    this.playSound('close');
    if (!fromPop && this._casePushed) {
      this._casePushed = false;
      try {
        history.back();
        return;
      } catch (e) {}
    }
    this._casePushed = false;
    this._closing = true;
    const ov = this.caseRef.current;
    const done = () => {
      this._closing = false;
      this.setState({ caseIdx: null, hover: false });
      const r = this._caseReturn;
      if (r && r.focus)
        try {
          r.focus({ preventScroll: true });
        } catch (e) {}
    };
    if (!ov || !ov.animate || this.reduced) {
      done();
      return;
    }
    ov.animate(
      [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: 'scale(.985)' },
      ],
      { duration: 300, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' },
    ).finished.then(done, done);
  }

  caseKey(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.closeCase();
      return;
    }
    if (e.key !== 'Tab') return;
    const ov = this.caseRef.current;
    if (!ov) return;
    const f = Array.prototype.slice.call(ov.querySelectorAll('button,a[href]'));
    if (!f.length) return;
    const first = f[0],
      last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  wDarkRef = createRef();
  wStmtRef = createRef();
  wSceneRef = createRef();
  wLinesRef = createRef();
  wTitleRef = createRef();
  wSubRef = createRef();

  // SelectedWorkTransition — scroll units (1 = one viewport), local 0 = panel starts rising
  panelIdx(label) {
    if (!this.panels) return -1;
    if (this._pIdxFor !== this.panels) {
      this._pIdxFor = this.panels;
      this._pIdx = {};
      this.panels.forEach((p, i) => {
        const l = p.getAttribute('data-screen-label');
        if (l && this._pIdx[l] == null) this._pIdx[l] = i;
      });
    }
    return this._pIdx[label] == null ? -1 : this._pIdx[label];
  }

  WORK_T = {
    panel: 10,
    stmtFrom: 1.72,
    stmtLen: 1.08,
    stmtHold: 0.2, // after the constellation: sentence lands, then holds
    wave: 0.18,
    waveRot: 14,
    darkFrom: 1.55,
    darkLen: 0.3, // constellation fades, ground lightens for the sentence
    assembleFrom: 2.28,
    assembleLen: 0.58,
    delayScale: 1.3,
    subFrom: 3.0,
    subLen: 0.18,
    exitFrom: 3.2,
    exitLen: 0.3,
    revealFrom: 3.3,
    revealLen: 0.42,
    revealStagger: 0.08,
    lineOpacity: 0.3,
    desktop: [
      { dx: -0.3, dy: -0.26, rot: -7, s: 1.1, o: 0.5, d: 0.06 },
      { dx: -0.1, dy: 0.3, rot: 5, s: 0.8, o: 0.35, d: 0.12 },
      { dx: -0.22, dy: 0.12, rot: 8, s: 0.95, o: 0.6, d: 0.02 },
      { dx: 0.02, dy: -0.34, rot: -4, s: 1.12, o: 0.45, d: 0.1 },
      { dx: -0.06, dy: 0.38, rot: 6, s: 0.9, o: 0.7, d: 0 },
      { dx: 0.1, dy: -0.12, rot: -6, s: 1.05, o: 0.4, d: 0.08 },
      { dx: 0.02, dy: 0.22, rot: 3, s: 0.85, o: 0.9, d: 0.04 },
      { dx: 0.16, dy: -0.3, rot: -3, s: 1.0, o: 0.55, d: 0.14 },
      null,
      { dx: 0.26, dy: 0.18, rot: 7, s: 1.15, o: 0.8, d: 0.03 },
      { dx: 0.12, dy: 0.36, rot: -5, s: 0.9, o: 0.45, d: 0.11 },
      { dx: 0.3, dy: -0.18, rot: 4, s: 1.0, o: 0.6, d: 0.07 },
      { dx: 0.2, dy: -0.38, rot: -8, s: 0.8, o: 0.3, d: 0.13 },
    ],
    mobile: [
      { dx: -0.16, dy: -0.18, rot: -3, s: 1.05, o: 0.5, d: 0.04 },
      { dx: -0.06, dy: 0.2, rot: 3, s: 0.9, o: 0.4, d: 0.1 },
      { dx: -0.12, dy: 0.1, rot: 4, s: 0.95, o: 0.6, d: 0.02 },
      { dx: 0.02, dy: -0.22, rot: -2, s: 1.05, o: 0.45, d: 0.08 },
      { dx: -0.04, dy: 0.24, rot: 3, s: 0.9, o: 0.7, d: 0 },
      { dx: 0.06, dy: -0.1, rot: -3, s: 1, o: 0.45, d: 0.06 },
      { dx: 0.02, dy: 0.16, rot: 2, s: 0.9, o: 0.85, d: 0.03 },
      { dx: 0.1, dy: -0.2, rot: -2, s: 1, o: 0.55, d: 0.1 },
      null,
      { dx: 0.14, dy: 0.12, rot: 3, s: 1.05, o: 0.8, d: 0.02 },
      { dx: 0.08, dy: 0.24, rot: -3, s: 0.9, o: 0.45, d: 0.09 },
      { dx: 0.16, dy: -0.12, rot: 2, s: 1, o: 0.6, d: 0.05 },
      { dx: 0.12, dy: -0.24, rot: -4, s: 0.85, o: 0.35, d: 0.1 },
    ],
    links: [
      [0, 4],
      [4, 7],
      [7, 9],
      [9, 12],
    ],
  };

  paintWork(st, H) {
    const T = this.WORK_T,
      stmt = this.wStmtRef.current,
      title = this.wTitleRef.current;
    if (!stmt || !title) return;
    const clamp = (v) => Math.max(0, Math.min(1, v));
    const sc = this.scrollRef.current;
    const W = (sc && sc.clientWidth) || window.innerWidth || 1200;
    const pi = this.panelIdx('Tech Constellation transition');
    const local = st - ((pi >= 0 ? pi : T.panel) - 1);
    if (!this._wt || this._wt.stmt !== stmt || this._wt.W !== W) {
      const sl = Array.prototype.slice.call(stmt.querySelectorAll('[data-sl]'));
      this._wt = {
        stmt,
        W,
        sl,
        lx: sl.map((el) => el.offsetLeft + el.offsetWidth / 2),
        tw: stmt.scrollWidth,
        wl: Array.prototype.slice.call(title.querySelectorAll('[data-wl]')),
        lines: this.wLinesRef.current ? Array.prototype.slice.call(this.wLinesRef.current.querySelectorAll('[data-wline]')) : [],
        revs: sc ? Array.prototype.slice.call(sc.querySelectorAll('[data-wrev]')) : [],
      };
    }
    const C = this._wt;
    const ease3 = (a) => (a < 0.5 ? 4 * a * a * a : 1 - Math.pow(-2 * a + 2, 3) / 2);
    C.revs.forEach((el) => {
      const k = +el.getAttribute('data-wrev') || 0;
      const r = this.reduced ? clamp((local - T.revealFrom) / 0.2) : clamp((local - T.revealFrom - k * T.revealStagger) / T.revealLen);
      const e = 1 - Math.pow(1 - r, 3);
      el.style.opacity = e.toFixed(3);
      el.style.transform = this.reduced || e >= 1 ? '' : 'translate3d(0,' + ((k === 0 ? 50 : 25) * (1 - e)).toFixed(1) + 'px,0)';
    });
    const inRange = local > -0.05 && local < 4.2;
    if (!inRange && this._wDone) return;
    this._wDone = !inRange;
    const dark = 1 - clamp((local - T.darkFrom) / T.darkLen);
    if (this.wDarkRef.current) this.wDarkRef.current.style.opacity = dark.toFixed(3);
    stmt.style.opacity = (clamp((local - T.stmtFrom + 0.08) / 0.2) * (1 - clamp((local - 3.05) / 0.3))).toFixed(3);
    const scene = this.wSceneRef.current;
    const ex = clamp((local - T.exitFrom) / T.exitLen);
    if (scene) scene.style.opacity = (clamp((local - 0.2) / 0.2) * (1 - clamp((local - T.darkFrom) / 0.25))).toFixed(3);
    const sub = this.wSubRef.current;
    if (sub) sub.style.opacity = (clamp((local - T.subFrom) / T.subLen) * (1 - ex)).toFixed(3);
    const inner = title.parentNode;
    inner.style.opacity = (1 - ex).toFixed(3);
    inner.style.transform =
      ex > 0 && !this.reduced ? 'translate3d(0,' + (-20 * ex).toFixed(1) + 'px,0) scale(' + (1 - 0.1 * ex).toFixed(4) + ')' : '';
    if (this.reduced) {
      stmt.style.whiteSpace = 'normal';
      stmt.style.left = '6vw';
      stmt.style.right = '6vw';
      stmt.style.textAlign = 'center';
      stmt.style.fontSize = 'clamp(32px,min(6vw,9vh),96px)';
      stmt.style.transform = 'translateY(-50%)';
      stmt.style.opacity = (clamp((local - T.stmtFrom) / 0.3) * (1 - clamp((local - 3.05) / 0.3))).toFixed(3);
      this.paintTech(local, W, H, ex);
      return;
    }
    const p = clamp((local - T.stmtFrom) / T.stmtLen);
    const endX = C.tw < W * 0.88 ? (W - C.tw) / 2 : W * 0.94 - C.tw;
    const pe = 1 - Math.pow(1 - p, 2.2);
    const tx = W * 1.02 + pe * (endX - W * 1.02);
    const settle = 1 - clamp((p - 0.82) / 0.18);
    stmt.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,0,0)';
    if (stmt.style.opacity !== '0.000') {
      for (let i = 0; i < C.sl.length; i++) {
        const cx = C.lx[i] + tx;
        const u = Math.max(0, (cx - W * 0.6) / (W * 0.4));
        const uu = u * settle;
        C.sl[i].style.transform =
          uu > 0.001 ? 'translate3d(0,' + (uu * uu * H * T.wave).toFixed(1) + 'px,0) rotate(' + (uu * T.waveRot).toFixed(2) + 'deg)' : '';
      }
    }
    this.paintTech(local, W, H, ex);
  }
  aboutTextRef = createRef();

  // About text starlight — same technique as the intro sentence
  hoverGlow(key, ref) {
    const box = ref.current;
    let touch = false;
    try {
      touch = window.matchMedia('(hover: none)').matches;
    } catch (e) {}
    if (!box || touch) return;
    if (!this[key]) {
      this[key] = { box, els: Array.prototype.slice.call(box.querySelectorAll('[data-aglow]')), x: null, y: null, gi: 0 };
      this[key].els.forEach((el) => el.style.setProperty('--r', ((window.innerWidth || 1200) < 640 ? 64 : 90) + 'px'));
      if (this.reduced)
        this[key].els.forEach((el) => {
          el.style.webkitMaskImage = 'none';
          el.style.maskImage = 'none';
          el.style.transition = 'opacity 240ms ease';
        });
    }
    const g = this[key];
    g.on = true;
    if (g.run) return;
    g.run = true;
    const loop = () => {
      const rects = g.els.map((el) => el.getBoundingClientRect());
      if (g.on && this._mx != null) {
        if (g.x == null) {
          g.x = this._mx;
          g.y = this._my;
        }
        g.x += (this._mx - g.x) * 0.35;
        g.y += (this._my - g.y) * 0.35;
      }
      if (this.reduced) {
        g.els.forEach((el) => {
          el.style.opacity = g.on ? '0.45' : '0';
        });
        g.run = false;
        return;
      }
      g.gi += ((g.on ? 1 : 0) - g.gi) * (g.on ? 0.22 : 0.13);
      g.els.forEach((el, i) => {
        const r = rects[i];
        el.style.setProperty('--mx', ((g.x == null ? -999 : g.x) - r.left).toFixed(1) + 'px');
        el.style.setProperty('--my', ((g.y == null ? -999 : g.y) - r.top).toFixed(1) + 'px');
        el.style.opacity = g.gi.toFixed(3);
      });
      if (!g.on && g.gi < 0.004) {
        g.els.forEach((el) => {
          el.style.opacity = '0';
        });
        g.x = null;
        g.run = false;
        return;
      }
      this[key + 'r'] = requestAnimationFrame(loop);
    };
    this[key + 'r'] = requestAnimationFrame(loop);
  }

  aboutGlowOn() {
    const box = this.aboutTextRef.current;
    let touch = false;
    try {
      touch = window.matchMedia('(hover: none)').matches;
    } catch (e) {}
    if (!box || touch) return;
    if (!this._ag) {
      this._ag = { box, els: Array.prototype.slice.call(box.querySelectorAll('[data-aglow]')), x: null, y: null, gi: 0 };
      this._ag.els.forEach((el) => el.style.setProperty('--r', ((window.innerWidth || 1200) < 640 ? 64 : 90) + 'px'));
      if (this.reduced)
        this._ag.els.forEach((el) => {
          el.style.webkitMaskImage = 'none';
          el.style.maskImage = 'none';
          el.style.transition = 'opacity 240ms ease';
        });
    }
    const g = this._ag;
    g.on = true;
    if (g.run) return;
    g.run = true;
    const loop = () => {
      const rects = g.els.map((el) => el.getBoundingClientRect());
      if (g.on && this._mx != null) {
        if (g.x == null) {
          g.x = this._mx;
          g.y = this._my;
        }
        g.x += (this._mx - g.x) * 0.35;
        g.y += (this._my - g.y) * 0.35;
      }
      if (this.reduced) {
        g.els.forEach((el) => {
          el.style.opacity = g.on ? '0.45' : '0';
        });
        g.run = false;
        return;
      }
      g.gi += ((g.on ? 1 : 0) - g.gi) * (g.on ? 0.22 : 0.13);
      g.els.forEach((el, i) => {
        const r = rects[i];
        el.style.setProperty('--mx', ((g.x == null ? -999 : g.x) - r.left).toFixed(1) + 'px');
        el.style.setProperty('--my', ((g.y == null ? -999 : g.y) - r.top).toFixed(1) + 'px');
        el.style.opacity = g.gi.toFixed(3);
      });
      if (!g.on && g.gi < 0.004) {
        g.els.forEach((el) => {
          el.style.opacity = '0';
        });
        g.x = null;
        g.run = false;
        return;
      }
      this._agr = requestAnimationFrame(loop);
    };
    this._agr = requestAnimationFrame(loop);
  }
  fxRef = createRef();
  jLinesRef = createRef();
  jPhraseRef = createRef();
  jSparkRef = createRef();

  // JourneyTransition — values in scroll units (1 = one viewport)
  JOURNEY = {
    panel: 1,
    assembleFrom: 0.35,
    assembleLen: 1.1,
    delayScale: 1.8,
    exitFrom: 99,
    exitLen: 0.5,
    exitScale: 0.12, // exit handled by the starlight sequence
    revealFrom: 3.4,
    revealLen: 0.45,
    revealStagger: 0.09,
    revealY: 26,
    lineOpacity: 0.32,
    // per-letter start: dx/dy fraction of viewport, rot deg, s scale, o opacity, d delay
    desktop: [
      { dx: -0.1, dy: 0.3, rot: -6, s: 1.1, o: 0.55, d: 0.06 }, // G
      { dx: -0.14, dy: -0.2, rot: 5, s: 0.85, o: 0.45, d: 0.12 }, // e
      { dx: -0.06, dy: 0.36, rot: 7, s: 0.9, o: 0.5, d: 0.02 }, // t
      null,
      { dx: -0.02, dy: -0.3, rot: -4, s: 1.12, o: 0.7, d: 0.1 }, // t
      { dx: 0.04, dy: 0.24, rot: -5, s: 1.05, o: 0.9, d: 0 }, // o
      null,
      { dx: 0.08, dy: -0.16, rot: 6, s: 0.85, o: 0.45, d: 0.08 }, // k
      { dx: 0.12, dy: 0.34, rot: 3, s: 1.0, o: 0.85, d: 0.04 }, // n
      { dx: -0.04, dy: 0.4, rot: -7, s: 0.95, o: 0.5, d: 0.14 }, // o
      { dx: 0.18, dy: -0.24, rot: 5, s: 1.1, o: 0.6, d: 0.07 }, // w
      null,
      { dx: 0.22, dy: 0.28, rot: -6, s: 1.15, o: 0.55, d: 0.11 }, // m
      { dx: 0.14, dy: -0.34, rot: 8, s: 0.9, o: 0.6, d: 0.03 }, // e
    ],
    mobile: [
      { dx: -0.14, dy: 0.18, rot: -3, s: 1.05, o: 0.55, d: 0.04 },
      { dx: -0.08, dy: -0.14, rot: 3, s: 0.9, o: 0.45, d: 0.1 },
      { dx: -0.1, dy: 0.24, rot: 3, s: 0.9, o: 0.5, d: 0.02 },
      null,
      { dx: -0.02, dy: -0.2, rot: -2, s: 1.05, o: 0.7, d: 0.08 },
      { dx: 0.04, dy: 0.2, rot: -3, s: 1, o: 0.85, d: 0 },
      null,
      { dx: 0.06, dy: -0.12, rot: 3, s: 0.9, o: 0.45, d: 0.06 },
      { dx: 0.1, dy: 0.24, rot: 2, s: 1, o: 0.8, d: 0.03 },
      { dx: -0.04, dy: 0.28, rot: -4, s: 0.95, o: 0.5, d: 0.1 },
      { dx: 0.12, dy: -0.18, rot: 3, s: 1.05, o: 0.6, d: 0.05 },
      null,
      { dx: 0.14, dy: 0.2, rot: -3, s: 1.08, o: 0.55, d: 0.09 },
      { dx: 0.1, dy: -0.24, rot: 4, s: 0.9, o: 0.6, d: 0.02 },
    ],
    links: [
      [0, 4],
      [4, 7],
      [7, 10],
      [10, 13],
      [5, 9],
    ],
  };

  paintJourney(st, H) {
    const J = this.JOURNEY,
      ph = this.jPhraseRef.current;
    if (!ph) return;
    const clamp = (v) => Math.max(0, Math.min(1, v));
    const sc = this.scrollRef.current;
    if (!this._jl || this._jl.ph !== ph) {
      this._jl = {
        ph,
        els: Array.prototype.slice.call(ph.querySelectorAll('[data-jl]')),
        lines: this.jLinesRef.current ? Array.prototype.slice.call(this.jLinesRef.current.querySelectorAll('[data-jline]')) : [],
        revs: sc ? Array.prototype.slice.call(sc.querySelectorAll('[data-rev]')) : [],
      };
    }
    const L = this._jl;
    const local = st - (J.panel - 1);
    L.revs.forEach((el) => {
      const k = +el.getAttribute('data-rev');
      const r = this.reduced ? clamp((local - J.revealFrom) / 0.2) : clamp((local - J.revealFrom - k * J.revealStagger) / J.revealLen);
      const e = 1 - Math.pow(1 - r, 3);
      el.style.opacity = e.toFixed(3);
      el.style.transform = this.reduced || e >= 1 ? '' : 'translate3d(0,' + (J.revealY * (1 - e)).toFixed(1) + 'px,0)';
    });
    const inRange = local > -0.05 && local < 4.3;
    if (!inRange && this._jDone) return;
    this._jDone = !inRange;

    const W = (sc && sc.clientWidth) || window.innerWidth || 1200;
    const cfg = W < 640 ? J.mobile : J.desktop;
    const ex = clamp((local - J.exitFrom) / J.exitLen);
    ph.style.opacity = (1 - ex).toFixed(3);
    ph.style.transform = ex > 0 && !this.reduced ? 'scale(' + (1 - J.exitScale * ex).toFixed(4) + ')' : '';

    if (this.reduced) {
      const fi = clamp((local - 0.5) / 0.3);
      ph.style.opacity = (fi * (1 - ex)).toFixed(3);
      return;
    }

    let sum = 0,
      n = 0;
    L.els.forEach((el) => {
      const c = cfg[+el.getAttribute('data-jl')];
      if (!c) return;
      const a = clamp((local - J.assembleFrom - c.d * J.delayScale) / J.assembleLen);
      const e = a < 0.5 ? 4 * a * a * a : 1 - Math.pow(-2 * a + 2, 3) / 2;
      sum += e;
      n++;
      const k = 1 - e;
      el.style.transform =
        'translate3d(' +
        (c.dx * W * k).toFixed(1) +
        'px,' +
        (c.dy * H * k).toFixed(1) +
        'px,0) rotate(' +
        (c.rot * k).toFixed(2) +
        'deg) scale(' +
        (c.s + (1 - c.s) * e).toFixed(4) +
        ')';
      el.style.opacity = (c.o + (1 - c.o) * e).toFixed(3);
    });
    const avg = n ? sum / n : 1;

    const svg = this.jLinesRef.current;
    if (svg && L.lines.length) {
      const peak = Math.sin(Math.PI * Math.min(1, avg)) * (1 - ex);
      if (peak > 0.01) {
        const sr = svg.getBoundingClientRect();
        const by = {};
        L.els.forEach((el) => {
          by[el.getAttribute('data-jl')] = el.getBoundingClientRect();
        });
        J.links.forEach((p, i) => {
          const a = by[p[0]],
            b = by[p[1]],
            ln = L.lines[i];
          if (!a || !b || !ln) return;
          ln.setAttribute('x1', (a.left + a.width / 2 - sr.left).toFixed(1));
          ln.setAttribute('y1', (a.top + a.height * 0.2 - sr.top).toFixed(1));
          ln.setAttribute('x2', (b.left + b.width / 2 - sr.left).toFixed(1));
          ln.setAttribute('y2', (b.top + b.height * 0.2 - sr.top).toFixed(1));
          ln.style.opacity = (J.lineOpacity * peak).toFixed(3);
        });
      } else
        L.lines.forEach((ln) => {
          ln.style.opacity = '0';
        });
    }
    const sp = this.jSparkRef.current;
    if (sp) {
      const t = clamp((local - (J.assembleFrom + J.assembleLen + 0.28)) / 0.4);
      const v = Math.sin(Math.PI * t) * (1 - ex);
      sp.style.opacity = v.toFixed(3);
      sp.style.transform = 'scale(' + (0.6 + 0.6 * v).toFixed(3) + ') rotate(' + (45 * t).toFixed(1) + 'deg)';
    }
  }
  ringRef = createRef();
  cardRef = createRef();
  cardWrapRef = createRef();
  scrollRef = createRef();
  floatRef = createRef();

  // FloatingTypography config — x/y in px, s = scale, d = delay ms, t = duration ms, o = peak opacity, b = max blur px
  floatCfg = [
    { x0: -80, x1: 20, y0: 0, y1: 0, s0: 1, s1: 1, d: 450, t: 1600, o: 0.16, b: 4 },
    { x0: 100, x1: -20, y0: 0, y1: 0, s0: 1, s1: 1, d: 520, t: 1500, o: 0.14, b: 3 },
    { x0: 0, x1: 0, y0: 70, y1: -10, s0: 1, s1: 1, d: 480, t: 1700, o: 0.12, b: 6 },
    { x0: 0, x1: 0, y0: 0, y1: 0, s0: 1.15, s1: 1, d: 600, t: 1500, o: 0.18, b: 2 },
    { x0: -60, x1: 30, y0: 0, y1: 0, s0: 1, s1: 1, d: 660, t: 1400, o: 0.15, b: 3 },
    { x0: 90, x1: -30, y0: 0, y1: 0, s0: 1, s1: 1, d: 560, t: 1650, o: 0.13, b: 5 },
    { x0: 0, x1: 0, y0: -60, y1: 20, s0: 1, s1: 1, d: 700, t: 1500, o: 0.16, b: 3 },
    { x0: -100, x1: 10, y0: 0, y1: 0, s0: 1, s1: 1, d: 620, t: 1550, o: 0.14, b: 4 },
    { x0: 0, x1: 0, y0: 50, y1: -20, s0: 1, s1: 1, d: 740, t: 1350, o: 0.2, b: 1 },
    { x0: 40, x1: 0, y0: 0, y1: 0, s0: 1.2, s1: 1, d: 780, t: 1400, o: 0.18, b: 2 },
    { x0: 0, x1: 0, y0: 80, y1: 0, s0: 1, s1: 1, d: 540, t: 1600, o: 0.12, b: 6 },
    { x0: 70, x1: -10, y0: 0, y1: 0, s0: 1, s1: 1, d: 820, t: 1450, o: 0.17, b: 2 },
  ];

  // Loops while the hero is in view; fades out and stops once you scroll past it
  playFloat() {
    const layer = this.floatRef.current;
    if (!layer || this.reduced || this._floating) return;
    const els = Array.prototype.slice.call(layer.querySelectorAll('[data-fw]'));
    const w = window.innerWidth || 1200;
    const count = w < 640 ? 5 : w < 1024 ? 8 : els.length;
    const k = w < 640 ? 0.35 : w < 1024 ? 0.6 : 1;
    const om = w < 640 ? 0.8 : 1;
    const SLOW = 1.8;
    els.forEach((el, i) => {
      el.style.display = i < count ? 'block' : 'none';
      el.style.opacity = '0';
      el.style.willChange = 'transform, opacity';
    });
    this._floating = true;
    this._fade = 1;
    const t0 = performance.now();
    const step = (now) => {
      const t = now - t0;
      const target = this.heroOut ? 0 : 1;
      this._fade += (target - this._fade) * 0.08;
      if (this.heroOut && this._fade < 0.01) {
        els.forEach((el) => {
          el.style.opacity = '0';
          el.style.willChange = 'auto';
          el.style.filter = 'none';
        });
        this._floating = false;
        return;
      }
      for (let i = 0; i < count; i++) {
        const c = this.floatCfg[i],
          el = els[i];
        if (!c || !el) continue;
        const dur = c.t * SLOW;
        const cycle = dur + 500 + (i % 4) * 300;
        const local = t - c.d;
        if (local < 0) continue;
        const p = (local % cycle) / dur;
        if (p > 1) {
          el.style.opacity = '0';
          continue;
        }
        const e = 1 - (1 - p) * (1 - p);
        const env = Math.sin(Math.PI * p);
        const x = (c.x0 + (c.x1 - c.x0) * e) * k;
        const y = (c.y0 + (c.y1 - c.y0) * e) * k;
        const sc = 1 + (c.s0 + (c.s1 - c.s0) * e - 1) * k;
        const bl = c.b * (1 - env);
        el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) scale(' + sc.toFixed(4) + ')';
        el.style.opacity = (c.o * om * env * this._fade * (this.state.theme === 'light' ? 0.5 : 1)).toFixed(3);
        el.style.filter = bl > 0.2 ? 'blur(' + bl.toFixed(1) + 'px)' : 'none';
      }
      this._fr = requestAnimationFrame(step);
    };
    this._fr = requestAnimationFrame(step);
  }

  sectionDefs = [
    { name: 'Hero' },
    { name: 'Journey' },
    { name: 'Journey' },
    { name: 'About' },
    { name: 'Tech Constellation' },
    { name: 'Tech Constellation' },
    { name: 'Tech Constellation' },
    { name: 'Work' },
    { name: 'Elsewhere' },
    { name: 'Contact' },
  ];

  // Project data — add a project by appending an object here. Omit any field you don't have; the UI hides it.
  // Layout: col / row are CSS grid placements in a 12 × 2 grid.

  componentDidMount() {
    try {
      const sv = localStorage.getItem('bec.sound');
      this.setState({ sound: sv ? sv === 'on' : this.SOUND.defaultOn });
    } catch (e) {}
    this._unlock = () => {
      if (this.state.sound) {
        const ac = this.audio();
        if (ac && ac.state === 'suspended')
          try {
            ac.resume();
          } catch (e) {}
      }
    };
    window.addEventListener('pointerdown', this._unlock);
    window.addEventListener('keydown', this._unlock);
    try {
      this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      this.reduced = false;
    }
    let show = this.SHOW_INTRO;
    try {
      if (show && this.INTRO_ONCE_PER_SESSION && sessionStorage.getItem('bec.intro') === '1') show = false;
    } catch (e) {}
    if (show) {
      this.setState({ entry: true, introOn: true, heroPlay: 'paused' });
      this.startGlow();
      this.lockScroll(true);
      if ((window.innerWidth || 1200) < 640) {
        const ov = this.introRef.current;
        if (ov)
          Array.prototype.forEach.call(ov.querySelectorAll('[data-istar]'), (el) => {
            if (+el.getAttribute('data-istar') >= 7) el.style.display = 'none';
          });
      }
    } else {
      this.setState({ entry: false, introOn: false, heroPlay: 'running' });
      this.playFloat();
    }
    // one rAF loop drives dot + ring; frame-rate independent smoothing, centred with translate(-50%,-50%) so size changes never shift them
    this._mm = (e) => {
      this._mx = e.clientX;
      this._my = e.clientY;
      if (!this.state.ready || this.state.away) this.setState({ ready: true, away: false });
      if (!this._ringRun) {
        this._ringRun = true;
        this._rt = 0;
        const tick = (t) => {
          const dt = this._rt ? Math.min(0.05, (t - this._rt) / 1000) : 1 / 60;
          this._rt = t;
          if (this._rx == null) {
            this._rx = this._mx;
            this._ry = this._my;
            this._dx = this._mx;
            this._dy = this._my;
          }
          const kd = this.reduced ? 1 : 1 - Math.exp(-dt * 38),
            kr = this.reduced ? 1 : 1 - Math.exp(-dt * 14);
          this._dx += (this._mx - this._dx) * kd;
          this._dy += (this._my - this._dy) * kd;
          this._rx += (this._mx - this._rx) * kr;
          this._ry += (this._my - this._ry) * kr;
          const c = this.cursorRef.current,
            r = this.ringRef.current;
          if (c) c.style.transform = 'translate3d(' + this._dx.toFixed(2) + 'px,' + this._dy.toFixed(2) + 'px,0) translate(-50%,-50%)';
          if (r) r.style.transform = 'translate3d(' + this._rx.toFixed(2) + 'px,' + this._ry.toFixed(2) + 'px,0) translate(-50%,-50%)';
          if (
            Math.abs(this._mx - this._rx) + Math.abs(this._my - this._ry) + Math.abs(this._mx - this._dx) + Math.abs(this._my - this._dy) >
            0.08
          )
            this._rc = requestAnimationFrame(tick);
          else this._ringRun = false;
        };
        this._rc = requestAnimationFrame(tick);
      }
    };
    this._mo = (e) => {
      if (!e.relatedTarget) this.setState({ away: true });
    };
    document.addEventListener('mouseout', this._mo);
    try {
      this._touch = window.matchMedia('(hover: none)').matches;
    } catch (e) {
      this._touch = false;
    }
    this._rs = () => {
      const sc = this.scrollRef.current;
      const w = (sc && sc.clientWidth) || window.innerWidth || 1200;
      const n = w < 640;
      if (n !== !!this.state.narrow) this.setState({ narrow: n });
    };
    this._rs();
    window.addEventListener('resize', this._rs);
    this.setState({ theme: this.getTheme() });
    this._np = () => this.updateNavPill();
    window.addEventListener('resize', this._np);
    this._sw = () => {
      const sc = this.scrollRef.current;
      if (!sc) return;
      const w = sc.clientWidth,
        h = sc.clientHeight;
      if (w && (Math.abs(w - (this.state.stageW || 0)) > 20 || Math.abs(h - (this.state.stageH || 0)) > 20))
        this.setState({ stageW: w, stageH: h });
    };
    window.addEventListener('resize', this._sw);
    setTimeout(this._sw, 60);
    this._lm = () => {
      const b = this.lifeBoxRef.current;
      if (!b) return;
      const w = Math.round(b.clientWidth);
      if (w && Math.abs(w - (this.state.lifeW || 0)) > 8) this.setState({ lifeW: w });
    };
    window.addEventListener('resize', this._lm);
    setTimeout(() => this.watchFooter(), 400);
    this.syncImgs();
    setTimeout(() => this.syncImgs(), 300);
    setTimeout(this._lm, 80);
    setTimeout(this._lm, 900);
    setTimeout(this._np, 60);
    setTimeout(this._np, 800);
    this.runMarquee();
    setTimeout(() => this.initXpObserver(), 400);
    this.runContact();
    this._pop = () => {
      if (this.state.caseIdx !== null) this.closeCase(true);
    };
    window.addEventListener('popstate', this._pop);
    this._esc = (e) => {
      if (e.key !== 'Escape') return;
      if (this.state.lb) {
        this.closeLb();
        return;
      }
      if (this.state.xpSheet) {
        this.setState({ xpSheet: false });
        return;
      }
      if (this.state.caseIdx !== null) this.closeCase();
      else if (this.state.formOpen) this.setState({ formOpen: false });
      else if (this.state.bookOpen) this.setState({ bookOpen: false, bookDone: false });
    };
    window.addEventListener('keydown', this._esc);
    try {
      const m = /^#work\/(.+)$/.exec(location.hash || '');
      if (m) {
        const idx = this.projects.findIndex((p) => p.slug === m[1]);
        if (idx >= 0) this.setState({ caseIdx: idx });
      }
    } catch (e) {}
    window.addEventListener('mousemove', this._mm);
    this._loop = () => {
      this.paintScroll();
      this._rid = requestAnimationFrame(this._loop);
    };
    this._rid = requestAnimationFrame(this._loop);
  }

  componentWillUnmount() {
    clearTimeout(this._t);
    clearTimeout(this._t2);
    clearTimeout(this._t3);
    cancelAnimationFrame(this._rid);
    cancelAnimationFrame(this._fr);
    cancelAnimationFrame(this._agr);
    cancelAnimationFrame(this._kr);
    this.stopGlow();
    window.removeEventListener('mousemove', this._mm);
    document.removeEventListener('mouseout', this._mo);
    window.removeEventListener('popstate', this._pop);
    window.removeEventListener('resize', this._rs);
    window.removeEventListener('resize', this._np);
    window.removeEventListener('resize', this._lm);
    window.removeEventListener('resize', this._sw);
    window.removeEventListener('pointerdown', this._unlock);
    window.removeEventListener('keydown', this._unlock);
    if (this._ac)
      try {
        this._ac.close();
      } catch (e) {}
    if (this._fObs) this._fObs.disconnect();
    cancelAnimationFrame(this._mqr);
    if (this._xpObs) this._xpObs.disconnect();
    cancelAnimationFrame(this._cpr);
    window.removeEventListener('keydown', this._esc);
    cancelAnimationFrame(this._rc);
  }

  // IntroGlow tuning
  GLOW = {
    radius: 78,
    radiusMobile: 56, // px, cursor light radius
    follow: 0.35, // 0–1, how tightly the light tracks the cursor
    rise: 0.22,
    linger: 0.13, // per-frame easing in / out (linger ≈ 300ms)
    consRange: 0.9, // × radius, how close before "constellations" forms
    lineOpacity: 0.34, // max constellation line opacity
    sparkEvery: 650, // ms minimum between cursor sparkles
    sparkMs: 540,
    codeSparkMs: 620, // sparkle durations
    tapMs: 1300, // touch: tap-to-illuminate length
  };

  startGlow() {
    const h = this.introHeadRef.current;
    if (!h || this._g) return;
    const q = (sel) => Array.prototype.slice.call(h.querySelectorAll(sel));
    const G = this.GLOW;
    const g = (this._g = {
      h,
      glows: q('[data-glow]'),
      lines: q('[data-cl]'),
      pool: q('[data-cs]'),
      pts: q('[data-cp]').map((el) => {
        const v = el.getAttribute('data-cp').split(',');
        return { el, px: +v[0] / 100, py: +v[1] / 100 };
      }),
      code: h.querySelector('[data-word="code"]'),
      cons: h.querySelector('[data-word="cons"]'),
      spark: h.querySelector('[data-spark]'),
      x: null,
      y: null,
      gi: 0,
      ca: 0,
      codeIn: false,
      lastCode: 0,
      lastSpark: 0,
      sx: 0,
      sy: 0,
      pi: 0,
      touch: false,
      r: (window.innerWidth || 1200) < 640 ? G.radiusMobile : G.radius,
    });
    try {
      g.touch = window.matchMedia('(hover: none)').matches;
    } catch (e) {}
    g.glows.forEach((el) => el.style.setProperty('--r', g.r + 'px'));
    if (this.reduced)
      g.glows.forEach((el) => {
        el.style.webkitMaskImage = 'none';
        el.style.maskImage = 'none';
        el.style.transition = 'opacity 240ms ease';
      });
    this._gt = setTimeout(
      () =>
        q('[data-mask]').forEach((el) => {
          el.style.overflow = 'visible';
        }),
      1650,
    );
    const loop = (now) => {
      this._gl = requestAnimationFrame(loop);
      this.glowFrame(now);
    };
    this._gl = requestAnimationFrame(loop);
  }

  stopGlow() {
    cancelAnimationFrame(this._gl);
    clearTimeout(this._gt);
    this._g = null;
  }

  glowFrame(now) {
    const g = this._g,
      G = this.GLOW;
    if (!g) return;
    const hr = g.h.getBoundingClientRect();
    const gr = g.glows.map((el) => el.getBoundingClientRect());
    const cr = g.cons ? g.cons.getBoundingClientRect() : null;
    const kr = g.code ? g.code.getBoundingClientRect() : null;

    let mx = this._mx,
      my = this._my,
      active = false;
    const tap = (this._tapUntil || 0) - now;
    if (tap > 0 && cr) {
      const k = 1 - tap / G.tapMs;
      mx = cr.left + cr.width * (0.1 + 0.8 * k);
      my = cr.top + cr.height * 0.5;
      active = true;
    } else if (!g.touch && mx != null) {
      active = mx > hr.left - 40 && mx < hr.right + 40 && my > hr.top - 40 && my < hr.bottom + 40;
    }
    if (this._leaving) active = false;

    if (this.reduced) {
      const o = active ? '0.45' : '0';
      g.glows.forEach((el) => {
        if (el.style.opacity !== o) el.style.opacity = o;
      });
      return;
    }

    if (active) {
      if (g.x == null) {
        g.x = mx;
        g.y = my;
      }
      g.x += (mx - g.x) * G.follow;
      g.y += (my - g.y) * G.follow;
    }
    g.gi += ((active ? 1 : 0) - g.gi) * (active ? G.rise : G.linger);
    if (!active && g.gi < 0.004 && g.ca < 0.004) {
      if (g.idle) return;
      g.idle = true;
      g.gi = 0;
      g.ca = 0;
      g.x = null;
    } else g.idle = false;

    const dist = (r, x, y) => {
      const dx = Math.max(r.left - x, 0, x - r.right),
        dy = Math.max(r.top - y, 0, y - r.bottom);
      return Math.sqrt(dx * dx + dy * dy);
    };
    const cx = g.x == null ? -9999 : g.x,
      cy = g.y == null ? -9999 : g.y;

    for (let i = 0; i < g.glows.length; i++) {
      const el = g.glows[i],
        r = gr[i];
      el.style.setProperty('--mx', (cx - r.left).toFixed(1) + 'px');
      el.style.setProperty('--my', (cy - r.top).toFixed(1) + 'px');
      el.style.opacity = g.gi.toFixed(3);
    }

    if (cr) {
      const near = active ? Math.max(0, Math.min(1, 1 - dist(cr, cx, cy) / (g.r * G.consRange))) : 0;
      g.ca += (near - g.ca) * (near > g.ca ? 0.12 : 0.07);
      const a = g.ca;
      g.lines.forEach((el, i) => {
        const li = Math.max(0, Math.min(1, a * 1.5 - i * 0.14));
        el.style.strokeDashoffset = (1 - li).toFixed(3);
        el.style.opacity = (G.lineOpacity * li).toFixed(3);
      });
      const L = cr.left - cr.width * 0.04,
        W = cr.width * 1.08,
        T = cr.top - cr.height * 0.38,
        H = cr.height * 1.76;
      g.pts.forEach((p) => {
        const d = Math.hypot(L + W * p.px - cx, T + H * p.py - cy);
        const prox = Math.max(0, 1 - d / (g.r * 1.1));
        const v = a * (0.4 + 0.6 * prox);
        p.el.style.opacity = v.toFixed(3);
        p.el.style.transform = 'scale(' + (0.4 + 0.8 * v).toFixed(3) + ')';
      });
    }

    if (kr && g.spark && active) {
      const d = dist(kr, cx, cy);
      if (d < 6 && !g.codeIn && now - g.lastCode > 1400) {
        g.codeIn = true;
        g.lastCode = now;
        g.spark.animate(
          [
            { opacity: 0, transform: 'scale(0) rotate(0deg)' },
            { opacity: 1, transform: 'scale(1) rotate(45deg)', offset: 0.45 },
            { opacity: 0, transform: 'scale(0) rotate(90deg)' },
          ],
          { duration: G.codeSparkMs, easing: 'cubic-bezier(.16,1,.3,1)' },
        );
      } else if (d > 24) g.codeIn = false;
    }

    if (active && g.gi > 0.6 && g.pool.length && now - g.lastSpark > G.sparkEvery && Math.hypot(cx - g.sx, cy - g.sy) > 50) {
      g.lastSpark = now;
      g.sx = cx;
      g.sy = cy;
      const el = g.pool[g.pi++ % g.pool.length];
      const x = cx - hr.left + (Math.random() * 28 - 14),
        y = cy - hr.top - (6 + Math.random() * 14);
      const t = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      el.animate(
        [
          { opacity: 0, transform: t + ' scale(0)' },
          { opacity: 0.9, transform: t + ' scale(1)', offset: 0.4 },
          { opacity: 0, transform: t + ' scale(0)' },
        ],
        { duration: G.sparkMs, easing: 'cubic-bezier(.16,1,.3,1)' },
      );
    }
  }

  // ProfileCard hover — refs + rAF, no React state per mousemove
  CARD = { lift: 4, scale: 0.005, tilt: 1.5, photoScale: 0.015, photoLift: 1.5, lightRadius: 180, starRange: 120, lineOpacity: 0.28 };

  cardEnter() {
    const c = this.cardRef.current;
    if (!c) return;
    let touch = false;
    try {
      touch = window.matchMedia('(hover: none)').matches;
    } catch (e) {}
    if (touch) return;
    this.setFlip(true);
    if (!this._k) {
      const q = (sel) => Array.prototype.slice.call(c.querySelectorAll(sel));
      this._k = {
        c,
        wrap: this.cardWrapRef.current,
        light: c.querySelector('[data-klight]'),
        img: c.querySelector('[data-kimg]'),
        star: c.querySelector('[data-kstar]'),
        lines: q('[data-kl]'),
        pts: q('[data-kp]').map((el) => {
          const v = el.getAttribute('data-kp').split(',');
          return { el, px: +v[0] / 100, py: +v[1] / 100 };
        }),
        h: 0,
        lh: 0,
        ax: 0,
        ay: 0,
        x: null,
        y: null,
      };
    }
    const k = this._k;
    k.hover = true;
    if (k.star && k.star.animate)
      k.star.animate(
        [
          { opacity: 0.5, transform: 'scale(.85) rotate(-5deg)' },
          { opacity: 1, transform: 'scale(1.1) rotate(0deg)', offset: 0.5 },
          { opacity: 1, transform: 'scale(1) rotate(0deg)' },
        ],
        { duration: this.reduced ? 1 : 620, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' },
      );
    if (!k.run) {
      k.run = true;
      const loop = () => {
        if (this.cardFrame()) this._kr = requestAnimationFrame(loop);
        else k.run = false;
      };
      this._kr = requestAnimationFrame(loop);
    }
  }

  // Flip with a constellation forming across the photo mid-turn
  setFlip(v) {
    if (!!this.state.flipped === v) return;
    this.setState({ flipped: v });
    const fx = this.fxRef.current;
    if (!fx || this.reduced || !fx.animate) return;
    const E = 'cubic-bezier(.16,1,.3,1)';
    Array.prototype.forEach.call(fx.querySelectorAll('[data-fxl]'), (el, i) => {
      el.animate(
        [
          { strokeDashoffset: 1, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.7, offset: 0.45 },
          { strokeDashoffset: 0, opacity: 0 },
        ],
        { duration: 1100, delay: 40 + i * 45, easing: E },
      );
    });
    Array.prototype.forEach.call(fx.querySelectorAll('[data-fxs]'), (el, i) => {
      el.animate(
        [
          { opacity: 0, transform: 'scale(0)' },
          { opacity: 1, transform: 'scale(1.2)', offset: 0.4 },
          { opacity: 0, transform: 'scale(.5)' },
        ],
        { duration: 1100, delay: i * 50, easing: E },
      );
    });
    const g = fx.querySelector('[data-fxg]');
    if (g) g.animate([{ opacity: 0 }, { opacity: 1, offset: 0.45 }, { opacity: 0 }], { duration: 900, delay: 120, easing: 'ease-in-out' });
  }

  cardLeave() {
    this.setFlip(false);
    const k = this._k;
    if (!k) return;
    k.hover = false;
    if (k.star && k.star.animate)
      k.star.animate(
        [
          { opacity: 1, transform: 'scale(1) rotate(0deg)' },
          { opacity: 0.5, transform: 'scale(.85) rotate(-5deg)' },
        ],
        { duration: this.reduced ? 1 : 520, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' },
      );
  }

  cardFrame() {
    const k = this._k,
      C = this.CARD;
    if (!k) return false;
    const r = (k.wrap || k.c).getBoundingClientRect();
    const mx = this._mx,
      my = this._my;
    const ease = k.hover ? 0.14 : 0.1;
    k.h += ((k.hover ? 1 : 0) - k.h) * ease;
    k.lh += ((k.hover ? 1 : 0) - k.lh) * (k.hover ? 0.05 : 0.09);
    const h = k.h;
    k.c.style.borderColor = 'rgba(var(--ink-rgb),' + (0.12 + 0.16 * h).toFixed(3) + ')';
    if (this.reduced) {
      if (!k.hover && h < 0.01) {
        k.c.style.borderColor = '';
        return false;
      }
      return true;
    }
    const rx = mx == null ? 0.5 : Math.max(0, Math.min(1, (mx - r.left) / r.width));
    const ry = my == null ? 0.5 : Math.max(0, Math.min(1, (my - r.top) / r.height));
    const tax = k.hover ? (0.5 - ry) * 2 * C.tilt : 0,
      tay = k.hover ? (rx - 0.5) * 2 * C.tilt : 0;
    k.ax += (tax - k.ax) * 0.08;
    k.ay += (tay - k.ay) * 0.08;
    k.c.style.transform =
      'translate3d(0,' +
      (-C.lift * h).toFixed(2) +
      'px,0) scale(' +
      (1 + C.scale * h).toFixed(4) +
      ') rotateX(' +
      k.ax.toFixed(3) +
      'deg) rotateY(' +
      k.ay.toFixed(3) +
      'deg)';
    if (k.light) {
      if (k.hover && mx != null) {
        k.light.style.setProperty('--mx', (mx - r.left).toFixed(1) + 'px');
        k.light.style.setProperty('--my', (my - r.top).toFixed(1) + 'px');
      }
      k.light.style.opacity = h.toFixed(3);
    }
    if (k.img)
      k.img.style.transform = 'translate3d(0,' + (-C.photoLift * h).toFixed(2) + 'px,0) scale(' + (1 + C.photoScale * h).toFixed(4) + ')';
    k.lines.forEach((el) => {
      el.style.opacity = (C.lineOpacity * k.lh).toFixed(3);
    });
    const L = r.left - 16,
      T = r.top - 16,
      W = r.width + 32,
      H = r.height + 32;
    k.pts.forEach((p) => {
      const d = mx == null ? 9999 : Math.hypot(L + W * p.px - mx, T + H * p.py - my);
      const prox = Math.max(0, 1 - d / C.starRange) * h;
      p.el.style.opacity = (0.25 + 0.2 * h + 0.55 * prox).toFixed(3);
      p.el.style.transform = 'scale(' + (0.8 + 0.2 * h + 0.25 * prox).toFixed(3) + ')';
      p.el.style.boxShadow = prox > 0.05 ? '0 0 ' + (6 * prox).toFixed(1) + 'px rgba(var(--glow-rgb),.7)' : 'none';
    });
    if (!k.hover && h < 0.003 && k.lh < 0.003) {
      k.c.style.transform = '';
      k.c.style.borderColor = '';
      if (k.img) k.img.style.transform = '';
      if (k.light) k.light.style.opacity = '0';
      return false;
    }
    return true;
  }

  // Click-to-enter timeline (Web Animations API — no library needed)
  enterUniverse() {
    if (this._leaving) return;
    this._leaving = true;
    try {
      sessionStorage.setItem('bec.intro', '1');
    } catch (e) {}
    const ov = this.introRef.current,
      home = this.homeRef.current,
      btn = this.introBtnRef.current;
    const cta = this.introCtaRef.current,
      head = this.introHeadRef.current,
      glow = this.glowRef.current;
    this.setState({ introHover: true, heroPlay: 'running', hover: false });
    if (btn) btn.disabled = true;
    this.playSound('enter');
    const finish = () => {
      this.stopGlow();
      this.setState({ introOn: false });
      this._leaving = false;
      this.endEntry();
    };
    if (!ov || !ov.animate) {
      finish();
      this.playFloat();
      return;
    }

    if (this.reduced) {
      ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 280, easing: 'ease-out', fill: 'forwards' }).finished.then(finish);
      return;
    }
    const narrow = (window.innerWidth || 1200) < 640;
    const EASE = 'cubic-bezier(.16,1,.3,1)';
    const OUT_BLUR = narrow ? 4 : 8,
      HOME_BLUR = narrow ? 3 : 6;

    btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(.96)', offset: 0.4 }, { transform: 'scale(1)' }], {
      duration: 200,
      easing: 'ease-out',
    });
    cta.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, delay: 100, easing: 'ease-out', fill: 'forwards' });
    head.animate(
      [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: 'translateY(' + (narrow ? -8 : -14) + 'px)' },
      ],
      { duration: 480, delay: 150, easing: EASE, fill: 'forwards' },
    );
    if (glow)
      glow.animate(
        [
          { opacity: 0, transform: 'scale(0)' },
          { opacity: 0.25, transform: 'scale(.6)', offset: 0.15 },
          { opacity: 0, transform: 'scale(4)' },
        ],
        { duration: 1000, delay: 120, easing: EASE, fill: 'forwards' },
      );
    if (home)
      home.animate(
        [
          { transform: 'scale(1.03)', opacity: 0.7, filter: 'blur(' + HOME_BLUR + 'px)' },
          { transform: 'none', opacity: 1, filter: 'blur(0)' },
        ],
        { duration: 800, delay: 200, easing: EASE, fill: 'backwards' },
      );
    this.playFloat();
    ov.animate(
      [
        { opacity: 1, transform: 'scale(1)', filter: 'blur(0)' },
        { opacity: 0, transform: 'scale(1.03)', filter: 'blur(' + OUT_BLUR + 'px)' },
      ],
      { duration: 650, delay: 250, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' },
    ).finished.then(finish);
  }

  lockScroll(on) {
    const s = this.scrollRef.current;
    if (s) s.style.overflowY = on ? 'hidden' : 'auto';
  }

  endEntry() {
    clearTimeout(this._t);
    this.lockScroll(false);
    if (this.state.entry) this.setState({ entry: false });
  }

  paintScroll() {
    const s = this.scrollRef.current;
    if (!s) {
      this.panels = null;
      return;
    }
    if (!this.panels || !this.panels.length) {
      this.panels = Array.prototype.slice.call(s.querySelectorAll('[data-panel]'));
      this.pars = this.panels.map((p) => Array.prototype.slice.call(p.querySelectorAll('[data-par]')));
      if (!this.panels.length) return;
    }
    const H = s.clientHeight || 1;
    const target = s.scrollTop / H;
    if (this.sm === undefined) this.sm = target;
    this.sm += (target - this.sm) * 0.12;
    const st = this.reduced ? target : Math.abs(target - this.sm) < 0.0005 ? target : this.sm;
    if (this.painted && Math.abs(st - this.last) < 0.0004) return;
    this.last = st;
    this.painted = true;

    for (let i = 0; i < this.panels.length; i++) {
      const inner = this.panels[i].firstElementChild;
      if (!inner) continue;
      const hold = this.panels[i].hasAttribute('data-hold');
      const out = hold ? 0 : Math.min(1, Math.max(0, st - i));
      const inp = hold && i > 1 ? 0 : Math.min(1, Math.max(0, i - st));
      if (this.reduced) {
        inner.style.transform = 'none';
        inner.style.opacity = out > 0.5 ? '0' : '1';
      } else {
        const y = -H * 0.06 * out + H * 0.06 * inp;
        inner.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0) scale(' + (1 - 0.04 * out).toFixed(4) + ')';
        inner.style.opacity = Math.max(0, 1 - 0.75 * out - 0.42 * inp).toFixed(3);
        const kids = this.pars[i];
        for (let k = 0; k < kids.length; k++) {
          const f = parseFloat(kids[k].getAttribute('data-par')) || 0;
          const py = -H * 0.26 * f * out + H * 0.24 * f * inp;
          kids[k].style.transform = 'translate3d(0,' + py.toFixed(2) + 'px,0)';
        }
      }
    }

    this.paintJourney(st, H);
    this.paintJourneyStar(st, H);
    this.paintXpWipe();
    this.paintStardust(st);
    // Experience scrolls internally only once its panel has fully landed
    const xp = this.xpRef.current;
    if (xp && this.panels) {
      const xi = this.panels.findIndex((p) => p.getAttribute('data-screen-label') === 'Experience');
      if (xi >= 0) {
        const settled = Math.abs(target - xi) < 0.02;
        const want = settled ? 'auto' : 'hidden';
        if (xp.style.overflowY !== want) xp.style.overflowY = want;
        if (target < xi - 0.5 && xp.scrollTop !== 0) xp.scrollTop = 0;
      }
    }
    this.paintWork(st, H);
    const solid = st > 0.04;
    if (solid !== !!this.state.navSolid) this.setState({ navSolid: solid });
    this.heroOut = st > 0.18;
    if (!this.heroOut && !this._floating && !this.state.entry) this.playFloat();
    const idx = Math.max(0, Math.min(this.panels.length - 1, Math.round(st)));
    if (idx !== this.state.active) this.setState({ active: idx });
  }

  // ============ Sound — one synthesized celestial palette, off by default, persisted in localStorage('bec.sound')
  SOUND = {
    volume: 0.05, // master level — keep low; this is feedback, not music
    defaultOn: false, // never autoplays; the visitor turns it on
    cooldown: { sparkle: 1100, tick: 90, form: 4000, flip: 1500, dust: 3000, chime: 3000 },
    // name → list of [delay s, frequency Hz, length s, relative level]
    map: {
      tick: [[0, 1760, 0.18, 0.45]],
      toggle: [[0, 1318.5, 0.3, 0.6]],
      sparkle: [
        [0, 2637, 0.35, 0.35],
        [0.06, 3136, 0.3, 0.2],
      ],
      open: [
        [0, 1174.7, 0.5, 0.6],
        [0.09, 1568, 0.6, 0.55],
      ],
      close: [
        [0, 1568, 0.45, 0.5],
        [0.09, 1174.7, 0.55, 0.45],
      ],
      enter: [
        [0, 880, 0.6, 0.35],
        [0.12, 1174.7, 0.6, 0.4],
        [0.24, 1318.5, 0.7, 0.45],
        [0.38, 1760, 0.8, 0.45],
        [0.62, 2637, 0.9, 0.5],
      ],
      flip: [
        [0, 'sweep', 0.55, 0.35],
        [0.5, 2093, 0.7, 0.5],
      ],
      form: [
        [0, 1318.5, 0.6, 0.4],
        [0.18, 1568, 0.6, 0.4],
        [0.36, 1975.5, 0.8, 0.45],
      ],
      confirm: [
        [0, 987.8, 0.8, 0.4],
        [0, 1318.5, 0.8, 0.35],
        [0.16, 1975.5, 1, 0.45],
      ],
      dust: [
        [0, 'sweep', 0.9, 0.18],
        [0.2, 1568, 0.9, 0.22],
        [0.42, 2093, 1, 0.25],
      ],
      chime: [[0, 2637, 0.9, 0.4]],
    },
  };

  audio() {
    if (this._ac) return this._ac;
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      const master = ac.createGain();
      master.gain.value = this.SOUND.volume;
      const lp = ac.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 6000;
      const dly = ac.createDelay();
      dly.delayTime.value = 0.19;
      const fb = ac.createGain();
      fb.gain.value = 0.32;
      const wet = ac.createGain();
      wet.gain.value = 0.45;
      master.connect(lp);
      lp.connect(ac.destination);
      lp.connect(dly);
      dly.connect(fb);
      fb.connect(dly);
      dly.connect(wet);
      wet.connect(ac.destination);
      this._ac = ac;
      this._master = master;
      return ac;
    } catch (e) {
      return null;
    }
  }

  playSound(name) {
    if (!this.state.sound) return;
    const cfg = this.SOUND.map[name];
    if (!cfg) return;
    const now = performance.now(),
      cd = this.SOUND.cooldown[name] || 0;
    this._sLast = this._sLast || {};
    if (cd && this._sLast[name] && now - this._sLast[name] < cd) return;
    this._sLast[name] = now;
    const ac = this.audio();
    if (!ac) return;
    if (ac.state === 'suspended') {
      try {
        ac.resume();
      } catch (e) {}
    }
    const t0 = ac.currentTime + 0.01;
    cfg.forEach(([d, f, len, lvl]) => {
      const t = t0 + d,
        g = ac.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(lvl, t + (f === 'sweep' ? 0.25 : 0.006));
      g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      g.connect(this._master);
      if (f === 'sweep') {
        const o = ac.createOscillator();
        o.type = 'sine';
        o.frequency.setValueAtTime(520, t);
        o.frequency.exponentialRampToValueAtTime(1560, t + len);
        o.connect(g);
        o.start(t);
        o.stop(t + len + 0.05);
        return;
      }
      // bell-like: fundamental + inharmonic partial
      [
        [1, 1],
        [2.76, 0.28],
      ].forEach(([m, a]) => {
        const o = ac.createOscillator(),
          og = ac.createGain();
        o.type = 'sine';
        o.frequency.value = f * m;
        og.gain.value = a;
        o.connect(og);
        og.connect(g);
        o.start(t);
        o.stop(t + len + 0.05);
      });
    });
  }

  beep(kind) {
    this.playSound({ nav: 'tick', open: 'open', toggle: 'toggle' }[kind] || kind);
  }

  jump(i) {
    const cur = this.state.active;
    this.setState({ hover: false });
    if (i === cur) return;
    this.beep('nav');
    this.setState({ trans: { to: this.sectionDefs[i].name } });
    clearTimeout(this._t2);
    clearTimeout(this._t3);
    this._t2 = setTimeout(() => {
      const s = this.scrollRef.current;
      if (s) {
        s.scrollTop = i * s.clientHeight;
        this.sm = i;
        this.painted = false;
      }
      this.setState({ active: i });
    }, 360);
    this._t3 = setTimeout(() => this.setState({ trans: null }), 850);
  }

  renderVals() {
    const st = this.state;
    const ci = st.caseIdx;
    const cp = ci !== null ? this.projects[ci] : null;
    const nextIdx = ci !== null ? (ci + 1) % this.projects.length : 0;
    const on = 'var(--ink)',
      off = 'var(--muted)';

    return {
      isProto: st.view === 'proto',

      cpL0: st.narrow ? 'auto' : this.CONTACT.pills[0].l + '%',
      cpT0: st.narrow ? 'auto' : this.CONTACT.pills[0].t + '%',
      cpR0: st.narrow || this.reduced ? '0deg' : this.CONTACT.pills[0].r + 'deg',
      cpIn0: () => {
        this._cpHover = 0;
        this.setState({ hover: true });
      },
      cpL1: st.narrow ? 'auto' : this.CONTACT.pills[1].l + '%',
      cpT1: st.narrow ? 'auto' : this.CONTACT.pills[1].t + '%',
      cpR1: st.narrow || this.reduced ? '0deg' : this.CONTACT.pills[1].r + 'deg',
      cpIn1: () => {
        this._cpHover = 1;
        this.setState({ hover: true });
      },
      cpL2: st.narrow ? 'auto' : this.CONTACT.pills[2].l + '%',
      cpT2: st.narrow ? 'auto' : this.CONTACT.pills[2].t + '%',
      cpR2: st.narrow || this.reduced ? '0deg' : this.CONTACT.pills[2].r + 'deg',
      cpIn2: () => {
        this._cpHover = 2;
        this.setState({ hover: true });
      },
      cpL3: st.narrow ? 'auto' : this.CONTACT.pills[3].l + '%',
      cpT3: st.narrow ? 'auto' : this.CONTACT.pills[3].t + '%',
      cpR3: st.narrow || this.reduced ? '0deg' : this.CONTACT.pills[3].r + 'deg',
      cpIn3: () => {
        this._cpHover = 3;
        this.setState({ hover: true });
      },
      cpL4: st.narrow ? 'auto' : this.CONTACT.pills[4].l + '%',
      cpT4: st.narrow ? 'auto' : this.CONTACT.pills[4].t + '%',
      cpR4: st.narrow || this.reduced ? '0deg' : this.CONTACT.pills[4].r + 'deg',
      cpIn4: () => {
        this._cpHover = 4;
        this.setState({ hover: true });
      },
      cpL5: st.narrow ? 'auto' : this.CONTACT.pills[5].l + '%',
      cpT5: st.narrow ? 'auto' : this.CONTACT.pills[5].t + '%',
      cpR5: st.narrow || this.reduced ? '0deg' : this.CONTACT.pills[5].r + 'deg',
      cpIn5: () => {
        this._cpHover = 5;
        this.setState({ hover: true });
      },
      bookRef: this.bookRef,
      bookOpen: !!st.bookOpen,
      calList: st.bookOpen
        ? [
            {
              src:
                'https://calendly.com/beaxcapule/30min?embed_type=Inline&hide_gdpr_banner=1&hide_landing_page_details=1' +
                (st.theme === 'light'
                  ? '&background_color=efe3e8&text_color=2a0f33&primary_color=93447f'
                  : '&background_color=230339&text_color=f7e6ee&primary_color=c574b0') +
                '&embed_domain=' +
                encodeURIComponent((typeof location !== 'undefined' && location.host) || 'portfolio'),
            },
          ]
        : [],
      bookPending: !!st.bookOpen && !st.bookDone,
      bookDone: !!st.bookDone,
      openBook: () =>
        this.setState({ bookOpen: true, bookDone: false, formOpen: false, hover: false }, () => {
          const b = this.bookRef.current;
          const f = b && b.querySelector('button');
          if (f)
            try {
              f.focus({ preventScroll: true });
            } catch (e) {}
        }),
      closeBook: () => this.setState({ bookOpen: false, bookDone: false }),
      bookDays: this.bookDays().map((d, i) => {
        const sel = (st.bookDay == null ? 0 : st.bookDay) === i;
        return Object.assign({}, d, {
          sel: sel ? 'true' : 'false',
          bg: sel ? 'var(--ink)' : 'transparent',
          fg: sel ? 'var(--bg)' : 'var(--ink)',
          bd: sel ? 'var(--ink)' : 'rgba(var(--ink-rgb),.18)',
          pick: () => this.setState({ bookDay: i, bookSlot: null }),
        });
      }),
      bookSlots: this.BOOK.slots.map((t, i) => {
        const sel = st.bookSlot === i;
        return {
          label: t,
          sel: sel ? 'true' : 'false',
          bg: sel ? 'rgba(var(--accent-rgb),.2)' : 'transparent',
          fg: 'var(--ink)',
          bd: sel ? 'var(--accent)' : 'rgba(var(--ink-rgb),.18)',
          pick: () => this.setState({ bookSlot: i }),
        };
      }),
      bookNoSlot: st.bookSlot == null,
      bookBtnOp: st.bookSlot == null ? '.45' : '1',
      bookSummary: (() => {
        const d = this.bookDays()[st.bookDay == null ? 0 : st.bookDay];
        return st.bookSlot == null ? 'Choose a time' : d.full + ' at ' + this.BOOK.slots[st.bookSlot] + ' PHT';
      })(),
      confirmBook: (e) => {
        e.preventDefault();
        if (this.state.bookSlot == null) return;
        this.playSound('confirm');
        this.setState({ bookDone: true });
      },
      cpOut: () => {
        this._cpHover = null;
        this.setState({ hover: false });
      },
      cpPos: st.narrow ? 'relative' : 'absolute',
      cpHeadW: st.narrow ? '100%' : 'min(520px,48%)',
      cpWrapDir: st.narrow ? 'row' : 'column',
      cpPadTop: st.narrow ? '58px' : 'clamp(76px,12vh,110px)',
      cpH2: st.narrow ? '28px' : 'clamp(32px,min(5.4vw,8.6vh),84px)',
      cpItalic: st.narrow ? 'none' : 'block',
      cpFoot: 'flex',
      // Footer copy
      footYear: '2026',
      footName: 'Beatrice Capule',
      footLine: 'Built with curiosity, code, and a little stardust.',
      footRef: this.footRef,
      footOp: st.footIn || this.reduced ? '1' : '0',
      footOp2: st.footIn || this.reduced ? '.85' : '0',
      footY: st.footIn || this.reduced ? '0px' : '6px',
      cpW0: st.narrow ? '100%' : 'auto',
      cpAddr: st.narrow ? 'none' : 'inline',
      cpFootLinks: st.narrow ? 'none' : 'flex',
      cpWrapPos: st.narrow ? 'relative' : 'absolute',
      cpCopyL: st.narrow ? 'auto' : this.CONTACT.copy.l + '%',
      cpCopyT: st.narrow ? 'auto' : this.CONTACT.copy.t + '%',
      cpPillsOp: st.formOpen || st.bookOpen ? '0' : '1',
      cpPillsPe: st.formOpen || st.bookOpen ? 'none' : 'auto',
      cpStageRef: this.cpStageRef,
      cpLineRef: this.cpLineRef,
      cpFormRef: this.cpFormRef,
      cpMove: (e) => {
        this._cpx = e.clientX;
        this._cpy = e.clientY;
      },
      cpLeave: () => {
        this._cpx = null;
        this._cpy = null;
      },
      formOpen: !!st.formOpen,
      formStatus: st.formStatus || '',
      openForm: () => {
        this.setState({ formOpen: true, formStatus: '', hover: false }, () => {
          const f = this.cpFormRef.current;
          const i = f && f.querySelector('input');
          if (i)
            try {
              i.focus({ preventScroll: true });
            } catch (e) {}
        });
      },
      closeForm: () => this.setState({ formOpen: false }),
      sendForm: (e) => this.sendMessage(e),
      copyLabel: st.copied === 'ok' ? 'Copied' : st.copied === 'fail' ? this.props.email : 'Copy email',
      copyEmail: () => this.copyEmail(),
      xpRef: this.xpRef,
      accWork: this.EXPERIENCE.map((e, i) => this.accItem(e, i, 'w', st)),
      accLead: this.LEADERSHIP.map((e, i) => this.accItem(e, i, 'l', st)),
      xpSel: (() => {
        const all = this.EXPERIENCE.map((e, i) => this.accItem(e, i, 'w', st)).concat(
          this.LEADERSHIP.map((e, i) => this.accItem(e, i, 'l', st)),
        );
        const sel = all.find((x) => x.exp === 'true') || all[0];
        const full = !!st.xpFull,
          bl = sel.bullets || [],
          extra = Math.max(0, bl.length - 3),
          long = (sel.summary || '').length > 260;
        return Object.assign({}, sel, {
          bullets: full ? bl : bl.slice(0, 3),
          hasBullets: bl.length > 0,
          canExpand: extra > 0 || long,
          moreLabel: full ? 'Show less' : extra > 0 ? 'Show full role · ' + extra + ' more' : 'Read more',
          clamp: full ? 'none' : '4',
        });
      })(),
      xpFullExp: st.xpFull ? 'true' : 'false',
      xpFullToggle: () => {
        this.playSound('tick');
        this.setState({ xpFull: !this.state.xpFull });
      },
      xpPaneScroll: st.xpFull ? 'auto' : 'hidden',
      xpPaneRef: this.xpPaneRef,
      // height-aware: everything fits one screen without an inner scrollbar
      xpHeadDisp: (st.stageH || 800) < 640 ? 'none' : 'block',
      xpColGap: (st.stageH || 800) < 640 ? '12px' : 'clamp(18px,3.4vh,36px)',
      xpRowMin: (st.stageH || 800) < 640 ? '40px' : '48px',
      xpRowPad: (st.stageH || 800) < 640 ? '7px' : 'clamp(10px,1.8vh,18px)',
      xpRowFont: (st.stageH || 800) < 640 ? '14px' : 'clamp(15px,min(1.4vw,2.6vh),20px)',
      xpPadTop: (st.stageH || 800) < 640 ? '72px' : 'clamp(80px,12vh,112px)',
      xpSheet: !!(st.narrow && st.xpSheet),
      xpPaneDisp: !st.narrow || st.xpSheet ? 'flex' : 'none',
      xpPanePos: st.narrow ? 'absolute' : 'relative',
      xpPaneInset: st.narrow ? '64px 12px 12px' : 'auto',
      xpPaneRad: st.narrow ? '18px' : '4px',
      xpPaneBg: st.narrow ? 'var(--panel)' : 'rgba(var(--ink-rgb),.03)',
      xpClose: () => this.setState({ xpSheet: false }),
      accCols: '14px minmax(0,1fr) 18px',
      accDateInline: 'block',
      accDateCol: 'none',
      accIndent: st.narrow ? 'clamp(10px,1.4vw,18px)' : 'calc(14px + clamp(12px,1.8vw,24px) + clamp(10px,1.4vw,18px))',
      xpCols: st.narrow ? 'minmax(0,1fr)' : 'minmax(0,1fr) minmax(0,1.1fr)',
      accGrid: this.reduced ? 'none' : 'grid-template-rows 560ms cubic-bezier(.16,1,.3,1)',
      accFade: this.reduced ? 'none' : 'opacity 420ms ease,transform 520ms cubic-bezier(.16,1,.3,1)',
      dustRef: this.dustRef,
      xpList: this.EXPERIENCE.map((e) => Object.assign({}, e, { hasBullets: !!(e.bullets && e.bullets.length) })),
      mEnter: (ev) => {
        if (this.reduced || this._touch) return;
        const b = ev.currentTarget,
          im = b.querySelector('img'),
          o = b.querySelector('[data-mov]');
        if (im) im.style.transform = 'scale(1.02)';
        if (o) o.style.opacity = '1';
        this.setState({ hover: true });
      },
      mLeave: (ev) => {
        const b = ev.currentTarget,
          im = b.querySelector('img'),
          o = b.querySelector('[data-mov]');
        if (im) im.style.transform = '';
        if (o) o.style.opacity = '0';
        this.setState({ hover: false });
      },
      lbImgs: st.lb ? [{ src: st.lb.src, alt: st.lb.alt }] : [],
      lbOpen: !!st.lb,
      lbSrc: st.lb ? st.lb.src : '',
      lbAlt: st.lb ? st.lb.alt : '',
      lbCap: st.lb ? st.lb.caption : '',
      lbHasCap: !!(st.lb && st.lb.caption),
      lbClose: (ev) => {
        if (ev && ev.target && ev.target.tagName === 'IMG') return;
        this.closeLb();
      },
      lbBtnRef: this.lbBtnRef,
      eduList: this.EDUCATION.map((e) =>
        Object.assign({}, e, {
          hasBullets: !!(e.bullets && e.bullets.length),
          dateColor: /Ongoing/.test(e.dates) ? 'var(--accent)' : 'var(--muted)',
        }),
      ),
      xCols: st.narrow ? 'minmax(0,1fr)' : 'minmax(150px,220px) minmax(0,1fr)',
      xDim: this.reduced ? '1' : '1',
      tlDisplay: st.narrow ? 'none' : 'block',
      tlX: '0',
      tlNodeX: '0',
      xPadL: st.narrow ? '0' : '22px',
      navRef: this.navRef,
      navPillRef: this.navPillRef,
      navBarRef: this.navBarRef,
      navVeilRef: this.navVeilRef,
      navGap: st.narrow ? '4px' : '10px',
      logoSize: st.narrow ? '17px' : '24px',
      logoDisplay: st.narrow ? 'none' : 'flex',
      navPad: st.narrow ? '0 5px' : '0 clamp(10px,1.5vw,18px)',
      logoStarT: st.logoHover && !this.reduced ? 'rotate(90deg) scale(1.25)' : 'none',
      logoOn: () => this.setState({ logoHover: true, hover: true }),
      logoOff: () => this.setState({ logoHover: false, hover: false }),
      navCols: st.narrow ? 'minmax(0,1fr) auto' : '1fr auto 1fr',
      navFont: st.narrow ? '12px' : '13px',
      togSize: st.narrow ? '34px' : '38px',
      navBg: st.navSolid ? 'rgba(var(--deep-rgb),.9)' : 'rgba(var(--deep-rgb),.62)',
      navBorder: st.navSolid ? '.14' : '.08',
      showCta: !st.narrow,
      toggleTheme: () => this.toggleTheme(),
      themeLabel: st.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode',
      moonOp: st.theme === 'light' ? '0' : '1',
      moonT: st.theme === 'light' || this.reduced ? (st.theme === 'light' ? 'rotate(-30deg) scale(.9)' : 'none') : 'none',
      sunOp: st.theme === 'light' ? '1' : '0',
      sunT: st.theme === 'light' ? 'none' : this.reduced ? 'none' : 'rotate(30deg) scale(.9)',
      navMove: (e) => {
        if (this.reduced || this._touch) return;
        const el = e.currentTarget,
          r = el.getBoundingClientRect();
        el.style.setProperty('--nx', e.clientX - r.left + 'px');
        el.style.setProperty('--ny', e.clientY - r.top + 'px');
        const l = el.querySelector('[data-navlight]');
        if (l) l.style.opacity = '1';
      },
      navLeave: (e) => {
        const l = e.currentTarget.querySelector('[data-navlight]');
        if (l) l.style.opacity = '0';
      },
      navHome: () => this.navGo(0),
      navAbout: () => this.navGo(1),
      navExperience: () => this.navGo(2),
      navWork: () => this.navGo(3),
      navContact: () => this.navGo(4),
      navC0: this.navIndex(st.active) === 0 ? 'var(--ink)' : 'var(--muted)',
      navW0: this.navIndex(st.active) === 0 ? '500' : '400',
      navCur0: this.navIndex(st.active) === 0 ? 'true' : 'false',
      navT0: this.navIndex(st.active) === 0 ? '0 0 10px rgba(var(--accent-rgb),.18)' : 'none',
      navC1: this.navIndex(st.active) === 1 ? 'var(--ink)' : 'var(--muted)',
      navW1: this.navIndex(st.active) === 1 ? '500' : '400',
      navCur1: this.navIndex(st.active) === 1 ? 'true' : 'false',
      navT1: this.navIndex(st.active) === 1 ? '0 0 10px rgba(var(--accent-rgb),.18)' : 'none',
      navC2: this.navIndex(st.active) === 2 ? 'var(--ink)' : 'var(--muted)',
      navW2: this.navIndex(st.active) === 2 ? '500' : '400',
      navCur2: this.navIndex(st.active) === 2 ? 'true' : 'false',
      navT2: this.navIndex(st.active) === 2 ? '0 0 10px rgba(var(--accent-rgb),.18)' : 'none',
      navC3: this.navIndex(st.active) === 3 ? 'var(--ink)' : 'var(--muted)',
      navW3: this.navIndex(st.active) === 3 ? '500' : '400',
      navCur3: this.navIndex(st.active) === 3 ? 'true' : 'false',
      navT3: this.navIndex(st.active) === 3 ? '0 0 10px rgba(var(--accent-rgb),.18)' : 'none',
      navC4: this.navIndex(st.active) === 4 ? 'var(--ink)' : 'var(--muted)',
      navW4: this.navIndex(st.active) === 4 ? '500' : '400',
      navCur4: this.navIndex(st.active) === 4 ? 'true' : 'false',
      navT4: this.navIndex(st.active) === 4 ? '0 0 10px rgba(var(--accent-rgb),.18)' : 'none',
      cAbout: st.active >= 1 && st.active <= 3 ? on : off,
      cWork: st.active >= 4 && st.active <= 7 ? on : off,
      cPlaces: st.active === 8 ? on : off,
      cContact: st.active === 9 ? on : off,
      goHero: () => this.jump(0),
      goAbout: () => this.jump(this.navTarget(1)),
      goWork: () => this.jump(this.navTarget(3)),
      goPlaces: () => this.jump(8),
      goContact: () => this.jump(this.navTarget(4)),
      wDarkRef: this.wDarkRef,
      wStmtRef: this.wStmtRef,
      wSceneRef: this.wSceneRef,
      wLinesRef: this.wLinesRef,
      wTitleRef: this.wTitleRef,
      wSubRef: this.wSubRef,
      techRef: this.techRef,
      techLeave: () => {
        this._tmx = null;
        this._tmy = null;
        const scx = this.scrollRef.current;
        if (scx) this.paintWork(scx.scrollTop / (scx.clientHeight || 1), scx.clientHeight || 1);
      },
      techMove: (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        this._tmx = e.clientX - r.left;
        this._tmy = e.clientY - r.top;
      },
      scrollToAbout: () => {
        const sc = this.scrollRef.current;
        if (sc) sc.scrollTo({ top: sc.clientHeight * 3, behavior: this.reduced ? 'auto' : 'smooth' });
      },
      jLinesRef: this.jLinesRef,
      jPhraseRef: this.jPhraseRef,
      jSparkRef: this.jSparkRef,

      workCount: String(this.projects.length),
      gridCols: st.narrow ? 'minmax(0,1fr)' : 'repeat(12,minmax(0,1fr))',
      gridRows: st.narrow ? 'repeat(' + this.projects.length + ',minmax(0,1fr))' : 'repeat(2,minmax(0,1fr))',
      row1: this.marqueeRow(1, this.rowOrder(0), st),
      row2: this.marqueeRow(2, this.rowOrder(1), st),
      track1Ref: this.track1Ref,
      track2Ref: this.track2Ref,
      pause1: () => {
        this._mq1p = true;
      },
      resume1: () => {
        this._mq1p = false;
      },
      pause2: () => {
        this._mq2p = true;
      },
      resume2: () => {
        this._mq2p = false;
      },
      closeCase: () => this.closeCase(),
      nextCase: () => this.openCase(nextIdx, null, true),
      caseKey: (e) => this.caseKey(e),
      caseRef: this.caseRef,
      caseHeroRef: this.caseHeroRef,
      caseCloseRef: this.caseCloseRef,
      caseOpen: ci !== null,
      caseAria: cp ? cp.name + ' case study' : '',
      caseName: cp ? cp.name : '',
      caseThumb: cp ? cp.thumbnailUrl || '' : '',
      caseNum: cp ? String(ci + 1).padStart(2, '0') : '',
      caseTotal: String(this.projects.length).padStart(2, '0'),
      caseDesc: cp ? cp.description || 'One or two sentences on what ' + cp.name + ' is. [PH]' : '',
      caseMeta: cp
        ? [
            cp.role && { k: 'Role', v: cp.role },
            { k: 'Type', v: cp.type || cp.tag },
            { k: 'Stack', v: cp.stack && cp.stack.length ? cp.stack.join(' · ') : '[PH]' },
            cp.year && { k: 'Year', v: cp.year },
          ].filter(Boolean)
        : [],
      // Case study: Overview and My role, then Key features (only when the project
      // has some), then Tech stack. Sections are numbered in the order shown.
      caseSections: cp
        ? [
            { num: '01', label: 'Overview', body: cp.overview || cp.description },
            { num: '02', label: 'My role', body: cp.roleDetail || cp.role },
          ].filter((s) => s.body)
        : [],
      caseShowFeatures: !!cp && cp.showFeatures !== false && !!(cp.features && cp.features.length),
      caseFeaturesNum: '03',
      caseStackNum: cp && cp.showFeatures !== false && cp.features && cp.features.length ? '04' : '03',
      caseFeatures: cp && cp.features ? cp.features.map((text, i) => ({ text, image: (cp.featureImages && cp.featureImages[i]) || '' })) : [],
      caseStack: cp && cp.stack && cp.stack.length ? cp.stack : ['Add technologies [PH]'],
      caseLinks: cp
        ? [cp.liveUrl && { label: 'Live site', url: cp.liveUrl }, cp.githubUrl && { label: 'GitHub', url: cp.githubUrl }].filter(Boolean)
        : [],
      caseHasLinks: !!(cp && (cp.liveUrl || cp.githubUrl)),
      nextCaseName: this.projects[nextIdx].name,
      nextCaseTag: this.projects[nextIdx].tag,

      scrollRef: this.scrollRef,
      cursorRef: this.cursorRef,
      floatRef: this.floatRef,
      cursorMode: this._touch ? 'auto' : 'none',
      curDisp: this._touch ? 'none' : 'block',
      ringRef: this.ringRef,
      curSize: st.hover ? '6px' : '9px',
      curOffset: '0',
      ringSize: st.hover ? '48px' : '32px',
      ringOffset: '0',
      ringColor: st.hover ? 'var(--ink)' : 'rgba(var(--accent-rgb),.85)',
      ringFill: st.hover ? 'rgba(var(--ink-rgb),.08)' : 'transparent',
      curOpacity: st.ready && !st.away ? '1' : '0',
      curOn: () => this.setState({ hover: true }),
      curOff: () => this.setState({ hover: false }),

      trans: st.trans ? true : null,
      transTo: st.trans ? st.trans.to : '',
      entry: st.entry,
      introOn: st.introOn,
      heroPlay: st.heroPlay,
      introLinkOp: st.introHover ? '0.4' : '0',
      introStarT: st.introHover ? 'rotate(45deg) translateX(2px)' : 'none',
      introHoverOn: () => this.setState({ introHover: true }),
      introHoverOff: () => {
        if (!this._leaving) this.setState({ introHover: false });
      },
      enterUniverse: () => this.enterUniverse(),
      ...this.lifeVals(st),
      aboutCols: st.narrow ? 'minmax(0,1fr)' : 'minmax(0,1.35fr) minmax(0,1fr)',
      cardRef: this.cardRef,
      aboutTextRef: this.aboutTextRef,
      aboutGlowOn: () => this.aboutGlowOn(),
      aboutGlowOff: () => {
        if (this._ag) {
          this._ag.on = false;
          if (this.reduced)
            this._ag.els.forEach((el) => {
              el.style.opacity = '0';
            });
        }
      },
      flipT: st.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      flipped: !!st.flipped,
      flipLabel: st.flipped ? 'Show graduation toga photo' : 'Show sablay photo',
      flipCard: () => this.setFlip(!this.state.flipped),
      tapFlip: () => {
        let t = false;
        try {
          t = window.matchMedia('(hover: none)').matches;
        } catch (e) {}
        if (t) this.setFlip(!this.state.flipped);
      },
      fxRef: this.fxRef,
      cardWrapRef: this.cardWrapRef,
      cardEnter: () => this.cardEnter(),
      cardLeave: () => this.cardLeave(),
      ctaIn: (e) => {
        const a = e.currentTarget.querySelector('[data-karrow]');
        if (a && !this.reduced) a.style.transform = 'translateX(4px)';
      },
      ctaOut: (e) => {
        const a = e.currentTarget.querySelector('[data-karrow]');
        if (a) a.style.transform = '';
      },
      introTap: () => {
        if (this._g && this._g.touch && !this._leaving) this._tapUntil = performance.now() + this.GLOW.tapMs;
      },
      introRef: this.introRef,
      introHeadRef: this.introHeadRef,
      introCtaRef: this.introCtaRef,
      introBtnRef: this.introBtnRef,
      glowRef: this.glowRef,
      homeRef: this.homeRef,
      soundLabel: st.sound ? 'Sound on' : 'Sound off',
      soundAria: st.sound ? 'Turn sound off' : 'Turn sound on',
      soundPressed: st.sound ? 'true' : 'false',
      sndWaveOp: st.sound ? '1' : '0',
      sndMuteOp: st.sound ? '0' : '1',
      toggleSound: () => {
        const next = !this.state.sound;
        this.setState({ sound: next }, () => {
          if (next) {
            this.audio();
            this.playSound('toggle');
          }
        });
        try {
          localStorage.setItem('bec.sound', next ? 'on' : 'off');
        } catch (e) {}
      },
      clock: st.clock,
    };
  }
}
