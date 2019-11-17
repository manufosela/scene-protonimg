function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const PI = 3.1415926;
const INFINITY = Infinity;
const MathUtil = {
  PI: PI,
  PIx2: PI * 2,
  PI_2: PI / 2,
  PI_180: PI / 180,
  N180_PI: 180 / PI,
  Infinity: -999,

  isInfinity(num) {
    return num === this.Infinity || num === INFINITY;
  },

  randomAToB(a, b, isInt = false) {
    if (!isInt) return a + Math.random() * (b - a);else return Math.floor(Math.random() * (b - a)) + a;
  },

  randomFloating(center, f, isInt) {
    return this.randomAToB(center - f, center + f, isInt);
  },

  randomColor() {
    return "#" + ("00000" + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
  },

  randomZone(display) {},

  floor(num, k = 4) {
    const digits = Math.pow(10, k);
    return Math.floor(num * digits) / digits;
  },

  degreeTransform(a) {
    return a * PI / 180;
  },

  toColor16(num) {
    return `#${num.toString(16)}`;
  }

};

class Span {
  constructor(a, b, center) {
    if (Util.isArray(a)) {
      this.isArray = true;
      this.a = a;
    } else {
      this.isArray = false;
      this.a = Util.initValue(a, 1);
      this.b = Util.initValue(b, this.a);
      this.center = Util.initValue(center, false);
    }
  }

  getValue(isInt = false) {
    if (this.isArray) {
      return Util.getRandFromArray(this.a);
    } else {
      if (!this.center) {
        return MathUtil.randomAToB(this.a, this.b, isInt);
      } else {
        return MathUtil.randomFloating(this.a, this.b, isInt);
      }
    }
  }
  /**
   * Returns a new Span object
   *
   * @memberof Proton#Proton.Util
   * @method setSpanValue
   *
   * @todo a, b and c should be 'Mixed' or 'Number'?
   *
   * @param {Mixed | Span} a
   * @param {Mixed}               b
   * @param {Mixed}               c
   *
   * @return {Span}
   */


  static setSpanValue(a, b, c) {
    if (a instanceof Span) {
      return a;
    } else {
      if (b === undefined) {
        return new Span(a);
      } else {
        if (c === undefined) return new Span(a, b);else return new Span(a, b, c);
      }
    }
  }
  /**
   * Returns the value from a Span, if the param is not a Span it will return the given parameter
   *
   * @memberof Proton#Proton.Util
   * @method getValue
   *
   * @param {Mixed | Span} pan
   *
   * @return {Mixed} the value of Span OR the parameter if it is not a Span
   */


  static getSpanValue(pan) {
    return pan instanceof Span ? pan.getValue() : pan;
  }

}

var WebGLUtil = {
  /**
   * @memberof Proton#Proton.WebGLUtil
   * @method ipot
   *
   * @todo add description
   * @todo add length description
   *
   * @param {Number} length
   *
   * @return {Boolean}
   */
  ipot(length) {
    return (length & length - 1) === 0;
  },

  /**
   * @memberof Proton#Proton.WebGLUtil
   * @method nhpot
   *
   * @todo add description
   * @todo add length description
   *
   * @param {Number} length
   *
   * @return {Number}
   */
  nhpot(length) {
    --length;

    for (let i = 1; i < 32; i <<= 1) {
      length = length | length >> i;
    }

    return length + 1;
  },

  /**
   * @memberof Proton#Proton.WebGLUtil
   * @method makeTranslation
   *
   * @todo add description
   * @todo add tx, ty description
   * @todo add return description
   *
   * @param {Number} tx either 0 or 1
   * @param {Number} ty either 0 or 1
   *
   * @return {Object}
   */
  makeTranslation(tx, ty) {
    return [1, 0, 0, 0, 1, 0, tx, ty, 1];
  },

  /**
   * @memberof Proton#Proton.WebGLUtil
   * @method makeRotation
   *
   * @todo add description
   * @todo add return description
   *
   * @param {Number} angleInRadians
   *
   * @return {Object}
   */
  makeRotation(angleInRadians) {
    let c = Math.cos(angleInRadians);
    let s = Math.sin(angleInRadians);
    return [c, -s, 0, s, c, 0, 0, 0, 1];
  },

  /**
   * @memberof Proton#Proton.WebGLUtil
   * @method makeScale
   *
   * @todo add description
   * @todo add tx, ty description
   * @todo add return description
   *
   * @param {Number} sx either 0 or 1
   * @param {Number} sy either 0 or 1
   *
   * @return {Object}
   */
  makeScale(sx, sy) {
    return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
  },

  /**
   * @memberof Proton#Proton.WebGLUtil
   * @method matrixMultiply
   *
   * @todo add description
   * @todo add a, b description
   * @todo add return description
   *
   * @param {Object} a
   * @param {Object} b
   *
   * @return {Object}
   */
  matrixMultiply(a, b) {
    let a00 = a[0 * 3 + 0];
    let a01 = a[0 * 3 + 1];
    let a02 = a[0 * 3 + 2];
    let a10 = a[1 * 3 + 0];
    let a11 = a[1 * 3 + 1];
    let a12 = a[1 * 3 + 2];
    let a20 = a[2 * 3 + 0];
    let a21 = a[2 * 3 + 1];
    let a22 = a[2 * 3 + 2];
    let b00 = b[0 * 3 + 0];
    let b01 = b[0 * 3 + 1];
    let b02 = b[0 * 3 + 2];
    let b10 = b[1 * 3 + 0];
    let b11 = b[1 * 3 + 1];
    let b12 = b[1 * 3 + 2];
    let b20 = b[2 * 3 + 0];
    let b21 = b[2 * 3 + 1];
    let b22 = b[2 * 3 + 2];
    return [a00 * b00 + a01 * b10 + a02 * b20, a00 * b01 + a01 * b11 + a02 * b21, a00 * b02 + a01 * b12 + a02 * b22, a10 * b00 + a11 * b10 + a12 * b20, a10 * b01 + a11 * b11 + a12 * b21, a10 * b02 + a11 * b12 + a12 * b22, a20 * b00 + a21 * b10 + a22 * b20, a20 * b01 + a21 * b11 + a22 * b21, a20 * b02 + a21 * b12 + a22 * b22];
  }

};

var DomUtil = {
  /**
   * Creates and returns a new canvas. The opacity is by default set to 0
   *
   * @memberof Proton#Proton.DomUtil
   * @method createCanvas
   *
   * @param {String} $id the canvas' id
   * @param {Number} $width the canvas' width
   * @param {Number} $height the canvas' height
   * @param {String} [$position=absolute] the canvas' position, default is 'absolute'
   *
   * @return {Object}
   */
  createCanvas(id, width, height, position = "absolute") {
    const dom = document.createElement("canvas");
    dom.id = id;
    dom.width = width;
    dom.height = height;
    dom.style.opacity = 0;
    dom.style.position = position;
    this.transform(dom, -500, -500, 0, 0);
    return dom;
  },

  createDiv(id, width, height) {
    const dom = document.createElement("div");
    dom.id = id;
    dom.style.position = "absolute";
    this.resize(dom, width, height);
    return dom;
  },

  resize(dom, width, height) {
    dom.style.width = width + "px";
    dom.style.height = height + "px";
    dom.style.marginLeft = -width / 2 + "px";
    dom.style.marginTop = -height / 2 + "px";
  },

  /**
   * Adds a transform: translate(), scale(), rotate() to a given div dom for all browsers
   *
   * @memberof Proton#Proton.DomUtil
   * @method transform
   *
   * @param {HTMLDivElement} div
   * @param {Number} $x
   * @param {Number} $y
   * @param {Number} $scale
   * @param {Number} $rotate
   */
  transform(div, x, y, scale, rotate) {
    div.style.willChange = "transform";
    const transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`;
    this.css3(div, "transform", transform);
  },

  transform3d(div, x, y, scale, rotate) {
    div.style.willChange = "transform";
    const transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
    this.css3(div, "backfaceVisibility", "hidden");
    this.css3(div, "transform", transform);
  },

  css3(div, key, val) {
    const bkey = key.charAt(0).toUpperCase() + key.substr(1);
    div.style[`Webkit${bkey}`] = val;
    div.style[`Moz${bkey}`] = val;
    div.style[`O${bkey}`] = val;
    div.style[`ms${bkey}`] = val;
    div.style[`${key}`] = val;
  }

};

const imgsCache = {};
const canvasCache = {};
let canvasId = 0;
var ImgUtil = {
  /**
   * This will get the image data. It could be necessary to create a Proton.Zone.
   *
   * @memberof Proton#Proton.Util
   * @method getImageData
   *
   * @param {HTMLCanvasElement}   context any canvas, must be a 2dContext 'canvas.getContext('2d')'
   * @param {Object}              image   could be any dom image, e.g. document.getElementById('thisIsAnImgTag');
   * @param {Proton.Rectangle}    rect
   */
  getImageData(context, image, rect) {
    context.drawImage(image, rect.x, rect.y);
    const imagedata = context.getImageData(rect.x, rect.y, rect.width, rect.height);
    context.clearRect(rect.x, rect.y, rect.width, rect.height);
    return imagedata;
  },

  /**
   * @memberof Proton#Proton.Util
   * @method getImgFromCache
   *
   * @todo add description
   * @todo describe func
   *
   * @param {Mixed}               img
   * @param {Proton.Particle}     particle
   * @param {Boolean}             drawCanvas  set to true if a canvas should be saved into particle.data.canvas
   * @param {Boolean}             func
   */
  getImgFromCache(img, callback, param) {
    const src = typeof img === "string" ? img : img.src;

    if (imgsCache[src]) {
      callback(imgsCache[src], param);
    } else {
      const image = new Image();

      image.onload = e => {
        imgsCache[src] = e.target;
        callback(imgsCache[src], param);
      };

      image.src = src;
    }
  },

  getCanvasFromCache(img, callback, param) {
    const src = img.src;

    if (!canvasCache[src]) {
      const width = WebGLUtil.nhpot(img.width);
      const height = WebGLUtil.nhpot(img.height);
      const canvas = DomUtil.createCanvas(`proton_canvas_cache_${++canvasId}`, width, height);
      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, img.width, img.height);
      canvasCache[src] = canvas;
    }

    callback && callback(canvasCache[src], param);
    return canvasCache[src];
  }

};

var Util = {
  /**
   * Returns the default if the value is null or undefined
   *
   * @memberof Proton#Proton.Util
   * @method initValue
   *
   * @param {Mixed} value a specific value, could be everything but null or undefined
   * @param {Mixed} defaults the default if the value is null or undefined
   */
  initValue(value, defaults) {
    value = value !== null && value !== undefined ? value : defaults;
    return value;
  },

  /**
   * Checks if the value is a valid array
   *
   * @memberof Proton#Proton.Util
   * @method isArray
   *
   * @param {Array} value Any array
   *
   * @returns {Boolean}
   */
  isArray(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  },

  /**
   * Destroyes the given array
   *
   * @memberof Proton#Proton.Util
   * @method emptyArray
   *
   * @param {Array} array Any array
   */
  emptyArray(arr) {
    if (arr) arr.length = 0;
  },

  toArray(arr) {
    return this.isArray(arr) ? arr : [arr];
  },

  getRandFromArray(arr) {
    if (!arr) return null;
    return arr[Math.floor(arr.length * Math.random())];
  },

  /**
   * Destroyes the given object
   *
   * @memberof Proton#Proton.Util
   * @method emptyObject
   *
   * @param {Object} obj Any object
   */
  emptyObject(obj, ignore = null) {
    for (let key in obj) {
      if (ignore && ignore.indexOf(key) > -1) continue;
      delete obj[key];
    }
  },

  /**
   * Makes an instance of a class and binds the given array
   *
   * @memberof Proton#Proton.Util
   * @method classApply
   *
   * @param {Function} constructor A class to make an instance from
   * @param {Array} [args] Any array to bind it to the constructor
   *
   * @return {Object} The instance of constructor, optionally bind with args
   */
  classApply(constructor, args = null) {
    if (!args) {
      return new constructor();
    } else {
      const FactoryFunc = constructor.bind.apply(constructor, [null].concat(args));
      return new FactoryFunc();
    }
  },

  /**
   * @memberof Proton#Proton.Util
   * @method setVectorVal
   *
   * @todo add description for param `target`
   * @todo add description for param `conf`
   * @todo add description for function
   *
   * @param {Object} target
   * @param {Object} conf
   */
  setVectorVal(particle, conf = null) {
    if (!conf) return;
    if (this.hasProp(conf, "x")) particle.p.x = conf["x"];
    if (this.hasProp(conf, "y")) particle.p.y = conf["y"];
    if (this.hasProp(conf, "vx")) particle.v.x = conf["vx"];
    if (this.hasProp(conf, "vy")) particle.v.y = conf["vy"];
    if (this.hasProp(conf, "ax")) particle.a.x = conf["ax"];
    if (this.hasProp(conf, "ay")) particle.a.y = conf["ay"];
    if (this.hasProp(conf, "p")) particle.p.copy(conf["p"]);
    if (this.hasProp(conf, "v")) particle.v.copy(conf["v"]);
    if (this.hasProp(conf, "a")) particle.a.copy(conf["a"]);
    if (this.hasProp(conf, "position")) particle.p.copy(conf["position"]);
    if (this.hasProp(conf, "velocity")) particle.v.copy(conf["velocity"]);
    if (this.hasProp(conf, "accelerate")) particle.a.copy(conf["accelerate"]);
  },

  hasProp(target, key) {
    if (!target) return false;
    return target[key] !== undefined; // return obj.hasOwnProperty(key);
  },

  /**
   * set the prototype in a given prototypeObject
   *
   * @memberof Proton#Proton.Util
   * @method setProp
   *
   * @todo add description for param `target`
   * @todo translate desription from chinese to english
   *
   * @param {Object} target
   * @param {Object} prototypeObject An object of single prototypes
   *
   * @return {Object} target
   */
  setProp(target, props) {
    for (let prop in props) {
      if (target.hasOwnProperty(prop)) {
        target[prop] = Span.getSpanValue(props[prop]);
      }
    }

    return target;
  },

  /**
   * This will get the image data. It could be necessary to create a Proton.Zone.
   *
   * @memberof Proton#Proton.Util
   * @method getImageData
   *
   * @param {HTMLCanvasElement}   context any canvas, must be a 2dContext 'canvas.getContext('2d')'
   * @param {Object}              image   could be any dom image, e.g. document.getElementById('thisIsAnImgTag');
   * @param {Proton.Rectangle}    rect
   */
  getImageData(context, image, rect) {
    return ImgUtil.getImageData(context, image, rect);
  },

  destroyAll(arr, param = null) {
    let i = arr.length;

    while (i--) {
      try {
        arr[i].destroy(param);
      } catch (e) {}

      delete arr[i];
    }

    arr.length = 0;
  }

};

const idsMap = {};
const Puid = {
  _index: 0,
  _cache: {},

  id(type) {
    if (idsMap[type] === undefined || idsMap[type] === null) idsMap[type] = 0;
    return `${type}_${idsMap[type]++}`;
  },

  getId(target) {
    let uid = this.getIdFromCache(target);
    if (uid) return uid;
    uid = `PUID_${this._index++}`;
    this._cache[uid] = target;
    return uid;
  },

  getIdFromCache(target) {
    let obj, id;

    for (id in this._cache) {
      obj = this._cache[id];
      if (obj === target) return id;
      if (this.isBody(obj, target) && obj.src === target.src) return id;
    }

    return null;
  },

  isBody(obj, target) {
    return typeof obj === "object" && typeof target === "object" && obj.isInner && target.isInner;
  },

  getTarget(uid) {
    return this._cache[uid];
  }

};

/**
 * Pool is the cache pool of the proton engine, it is very important.
 *
 * get(target, params, uid)
 *  Class
 *    uid = Puid.getId -> Puid save target cache
 *    target.__puid = uid
 *
 *  body
 *    uid = Puid.getId -> Puid save target cache
 *
 *
 * expire(target)
 *  cache[target.__puid] push target
 *
 */
class Pool {
  /**
   * @memberof! Proton#
   * @constructor
   * @alias Proton.Pool
   *
   * @todo add description
   * @todo add description of properties
   *
   * @property {Number} total
   * @property {Object} cache
   */
  constructor(num) {
    this.total = 0;
    this.cache = {};
  }
  /**
   * @todo add description
   *
   * @method get
   * @memberof Proton#Proton.Pool
   *
   * @param {Object|Function} target
   * @param {Object} [params] just add if `target` is a function
   *
   * @return {Object}
   */


  get(target, params, uid) {
    let p;
    uid = uid || target.__puid || Puid.getId(target);

    if (this.cache[uid] && this.cache[uid].length > 0) {
      p = this.cache[uid].pop();
    } else {
      p = this.createOrClone(target, params);
    }

    p.__puid = target.__puid || uid;
    return p;
  }
  /**
   * @todo add description
   *
   * @method set
   * @memberof Proton#Proton.Pool
   *
   * @param {Object} target
   *
   * @return {Object}
   */


  expire(target) {
    return this.getCache(target.__puid).push(target);
  }
  /**
   * Creates a new class instance
   *
   * @todo add more documentation
   *
   * @method create
   * @memberof Proton#Proton.Pool
   *
   * @param {Object|Function} target any Object or Function
   * @param {Object} [params] just add if `target` is a function
   *
   * @return {Object}
   */


  createOrClone(target, params) {
    this.total++;

    if (this.create) {
      return this.create(target, params);
    } else if (typeof target === "function") {
      return Util.classApply(target, params);
    } else {
      return target.clone();
    }
  }
  /**
   * @todo add description - what is in the cache?
   *
   * @method getCount
   * @memberof Proton#Proton.Pool
   *
   * @return {Number}
   */


  getCount() {
    let count = 0;

    for (let id in this.cache) count += this.cache[id].length;

    return count++;
  }
  /**
   * Destroyes all items from Pool.cache
   *
   * @method destroy
   * @memberof Proton#Proton.Pool
   */


  destroy() {
    for (let id in this.cache) {
      this.cache[id].length = 0;
      delete this.cache[id];
    }
  }
  /**
   * Returns Pool.cache
   *
   * @method getCache
   * @memberof Proton#Proton.Pool
   * @private
   *
   * @param {Number} uid the unique id
   *
   * @return {Object}
   */


  getCache(uid = "default") {
    if (!this.cache[uid]) this.cache[uid] = [];
    return this.cache[uid];
  }

}

class Stats {
  constructor(proton) {
    this.proton = proton;
    this.container = null;
    this.type = 1;
    this.emitterIndex = 0;
    this.rendererIndex = 0;
  }

  update(style, body) {
    this.add(style, body);
    const emitter = this.getEmitter();
    const renderer = this.getRenderer();
    let str = "";

    switch (this.type) {
      case 2:
        str += "emitter:" + this.proton.emitters.length + "<br>";
        if (emitter) str += "em speed:" + emitter.emitSpeed + "<br>";
        if (emitter) str += "pos:" + this.getEmitterPos(emitter);
        break;

      case 3:
        if (emitter) str += "initializes:" + emitter.initializes.length + "<br>";
        if (emitter) str += '<span style="display:inline-block;">' + this.concatArr(emitter.initializes) + "</span><br>";
        if (emitter) str += "behaviours:" + emitter.behaviours.length + "<br>";
        if (emitter) str += '<span style="display:inline-block;">' + this.concatArr(emitter.behaviours) + "</span><br>";
        break;

      case 4:
        if (renderer) str += renderer.name + "<br>";
        if (renderer) str += "body:" + this.getCreatedNumber(renderer) + "<br>";
        break;

      default:
        str += "particles:" + this.proton.getCount() + "<br>";
        str += "pool:" + this.proton.pool.getCount() + "<br>";
        str += "total:" + this.proton.pool.total;
    }

    this.container.innerHTML = str;
  }

  add(style, body) {
    if (!this.container) {
      this.type = 1;
      this.container = document.createElement("div");
      this.container.style.cssText = ["position:absolute;bottom:0px;left:0;cursor:pointer;", "opacity:0.9;z-index:10000;padding:10px;font-size:12px;font-family:Helvetica,Arial,sans-serif;", "width:120px;height:50px;background-color:#002;color:#0ff;"].join("");
      this.container.addEventListener("click", e => {
        this.type++;
        if (this.type > 4) this.type = 1;
      }, false);
      let bg, color;

      switch (style) {
        case 2:
          bg = "#201";
          color = "#f08";
          break;

        case 3:
          bg = "#020";
          color = "#0f0";
          break;

        default:
          bg = "#002";
          color = "#0ff";
      }

      this.container.style["background-color"] = bg;
      this.container.style["color"] = color;
    }

    if (!this.container.parentNode) {
      body = body || this.body || document.body;
      body.appendChild(this.container);
    }
  }

  getEmitter() {
    return this.proton.emitters[this.emitterIndex];
  }

  getRenderer() {
    return this.proton.renderers[this.rendererIndex];
  }

  concatArr(arr) {
    let result = "";
    if (!arr || !arr.length) return result;

    for (let i = 0; i < arr.length; i++) {
      result += (arr[i].name || "").substr(0, 1) + ".";
    }

    return result;
  }

  getCreatedNumber(renderer) {
    return renderer.pool.total || renderer.cpool && renderer.cpool.total || 0;
  }

  getEmitterPos(e) {
    return Math.round(e.p.x) + "," + Math.round(e.p.y);
  }

}

/*
 * EventDispatcher
 * This code reference since http://createjs.com/.
 *
 **/
class EventDispatcher {
  constructor() {
    this._listeners = null;
  }

  static bind(target) {
    target.prototype.dispatchEvent = EventDispatcher.prototype.dispatchEvent;
    target.prototype.hasEventListener = EventDispatcher.prototype.hasEventListener;
    target.prototype.addEventListener = EventDispatcher.prototype.addEventListener;
    target.prototype.removeEventListener = EventDispatcher.prototype.removeEventListener;
    target.prototype.removeAllEventListeners = EventDispatcher.prototype.removeAllEventListeners;
  }

  addEventListener(type, listener) {
    if (!this._listeners) {
      this._listeners = {};
    } else {
      this.removeEventListener(type, listener);
    }

    if (!this._listeners[type]) this._listeners[type] = [];

    this._listeners[type].push(listener);

    return listener;
  }

  removeEventListener(type, listener) {
    if (!this._listeners) return;
    if (!this._listeners[type]) return;
    const arr = this._listeners[type];
    const length = arr.length;

    for (let i = 0; i < length; i++) {
      if (arr[i] === listener) {
        if (length === 1) {
          delete this._listeners[type];
        } // allows for faster checks.
        else {
          arr.splice(i, 1);
        }

        break;
      }
    }
  }

  removeAllEventListeners(type) {
    if (!type) this._listeners = null;else if (this._listeners) delete this._listeners[type];
  }

  dispatchEvent(type, args) {
    let result = false;
    const listeners = this._listeners;

    if (type && listeners) {
      let arr = listeners[type];
      if (!arr) return result; // arr = arr.slice();
      // to avoid issues with items being removed or added during the dispatch

      let handler;
      let i = arr.length;

      while (i--) {
        handler = arr[i];
        result = result || handler(args);
      }
    }

    return !!result;
  }

  hasEventListener(type) {
    const listeners = this._listeners;
    return !!(listeners && listeners[type]);
  }

}

class Integration {
  constructor(type) {
    this.type = type;
  }

  calculate(particles, time, damping) {
    this.eulerIntegrate(particles, time, damping);
  } // Euler Integrate
  // https://rosettacode.org/wiki/Euler_method


  eulerIntegrate(particle, time, damping) {
    if (!particle.sleep) {
      particle.old.p.copy(particle.p);
      particle.old.v.copy(particle.v);
      particle.a.multiplyScalar(1 / particle.mass);
      particle.v.add(particle.a.multiplyScalar(time));
      particle.p.add(particle.old.v.multiplyScalar(time));
      if (damping) particle.v.multiplyScalar(damping);
      particle.a.clear();
    }
  }

}

class Proton {
  // measure 1:100
  // event name

  /**
   * The constructor to add emitters
   *
   * @constructor Proton
   *
   * @todo proParticleCount is not in use
   * @todo add more documentation of the single properties and parameters
   *
   * @param {Number} [proParticleCount] not in use?
   * @param {Number} [integrationType=Proton.EULER]
   *
   * @property {String} [integrationType=Proton.EULER]
   * @property {Array} emitters   All added emitter
   * @property {Array} renderers  All added renderer
   * @property {Number} time      The active time
   * @property {Number} oldtime   The old time
   */
  constructor(integrationType) {
    this.emitters = [];
    this.renderers = [];
    this.time = 0;
    this.now = 0;
    this.then = 0;
    this.elapsed = 0;
    this.stats = new Stats(this);
    this.pool = new Pool(80);
    this.integrationType = Util.initValue(integrationType, Proton.EULER);
    this.integrator = new Integration(this.integrationType);
    this._fps = "auto";
    this._interval = Proton.DEFAULT_INTERVAL;
  }

  set fps(fps) {
    this._fps = fps;
    this._interval = fps === "auto" ? Proton.DEFAULT_INTERVAL : MathUtil.floor(1 / fps, 7);
  }

  get fps() {
    return this._fps;
  }
  /**
   * add a type of Renderer
   *
   * @method addRenderer
   * @memberof Proton
   * @instance
   *
   * @param {Renderer} render
   */


  addRenderer(render) {
    render.init(this);
    this.renderers.push(render);
  }
  /**
   * @name add a type of Renderer
   *
   * @method addRenderer
   * @param {Renderer} render
   */


  removeRenderer(render) {
    const index = this.renderers.indexOf(render);
    this.renderers.splice(index, 1);
    render.remove(this);
  }
  /**
   * add the Emitter
   *
   * @method addEmitter
   * @memberof Proton
   * @instance
   *
   * @param {Emitter} emitter
   */


  addEmitter(emitter) {
    this.emitters.push(emitter);
    emitter.parent = this;
    this.dispatchEvent(Proton.EMITTER_ADDED, emitter);
  }
  /**
   * Removes an Emitter
   *
   * @method removeEmitter
   * @memberof Proton
   * @instance
   *
   * @param {Proton.Emitter} emitter
   */


  removeEmitter(emitter) {
    const index = this.emitters.indexOf(emitter);
    this.emitters.splice(index, 1);
    emitter.parent = null;
    this.dispatchEvent(Proton.EMITTER_REMOVED, emitter);
  }
  /**
   * Updates all added emitters
   *
   * @method update
   * @memberof Proton
   * @instance
   */


  update() {
    // 'auto' is the default browser refresh rate, the vast majority is 60fps
    if (this._fps === "auto") {
      this.dispatchEvent(Proton.PROTON_UPDATE);

      if (Proton.USE_CLOCK) {
        if (!this.then) this.then = new Date().getTime();
        this.now = new Date().getTime();
        this.elapsed = (this.now - this.then) * 0.001; // Fix bugs such as chrome browser switching tabs causing excessive time difference

        this.amendChangeTabsBug();
        if (this.elapsed > 0) this.emittersUpdate(this.elapsed);
        this.then = this.now;
      } else {
        this.emittersUpdate(Proton.DEFAULT_INTERVAL);
      }

      this.dispatchEvent(Proton.PROTON_UPDATE_AFTER);
    } // If the fps frame rate is set
    else {
      if (!this.then) this.then = new Date().getTime();
      this.now = new Date().getTime();
      this.elapsed = (this.now - this.then) * 0.001;

      if (this.elapsed > this._interval) {
        this.dispatchEvent(Proton.PROTON_UPDATE);
        this.emittersUpdate(this._interval); // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

        this.then = this.now - this.elapsed % this._interval * 1000;
        this.dispatchEvent(Proton.PROTON_UPDATE_AFTER);
      }
    }
  }

  emittersUpdate(elapsed) {
    let i = this.emitters.length;

    while (i--) this.emitters[i].update(elapsed);
  }
  /**
   * @todo add description
   *
   * @method amendChangeTabsBug
   * @memberof Proton
   * @instance
   */


  amendChangeTabsBug() {
    if (!Proton.amendChangeTabsBug) return;

    if (this.elapsed > 0.5) {
      this.then = new Date().getTime();
      this.elapsed = 0;
    }
  }
  /**
   * Counts all particles from all emitters
   *
   * @method getCount
   * @memberof Proton
   * @instance
   */


  getCount() {
    let total = 0;
    let i = this.emitters.length;

    while (i--) total += this.emitters[i].particles.length;

    return total;
  }

  getAllParticles() {
    let particles = [];
    let i = this.emitters.length;

    while (i--) particles = particles.concat(this.emitters[i].particles);

    return particles;
  }

  destroyAllEmitters() {
    Util.destroyAll(this.emitters);
  }
  /**
   * Destroys everything related to this Proton instance. This includes all emitters, and all properties
   *
   * @method destroy
   * @memberof Proton
   * @instance
   */


  destroy(remove = false) {
    const destroyOther = () => {
      this.time = 0;
      this.then = 0;
      this.pool.destroy();
      Util.destroyAll(this.emitters);
      Util.destroyAll(this.renderers, this.getAllParticles());
    };

    if (remove) {
      setTimeout(destroyOther, 200);
    } else {
      destroyOther();
    }
  }

}

_defineProperty(Proton, "USE_CLOCK", false);

_defineProperty(Proton, "MEASURE", 100);

_defineProperty(Proton, "EULER", "euler");

_defineProperty(Proton, "RK2", "runge-kutta2");

_defineProperty(Proton, "PARTICLE_CREATED", "PARTICLE_CREATED");

_defineProperty(Proton, "PARTICLE_UPDATE", "PARTICLE_UPDATE");

_defineProperty(Proton, "PARTICLE_SLEEP", "PARTICLE_SLEEP");

_defineProperty(Proton, "PARTICLE_DEAD", "PARTICLE_DEAD");

_defineProperty(Proton, "EMITTER_ADDED", "EMITTER_ADDED");

_defineProperty(Proton, "EMITTER_REMOVED", "EMITTER_REMOVED");

_defineProperty(Proton, "PROTON_UPDATE", "PROTON_UPDATE");

_defineProperty(Proton, "PROTON_UPDATE_AFTER", "PROTON_UPDATE_AFTER");

_defineProperty(Proton, "DEFAULT_INTERVAL", 0.0167);

_defineProperty(Proton, "amendChangeTabsBug", true);

EventDispatcher.bind(Proton);

class Rgb {
  constructor(r = 255, g = 255, b = 255) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  reset() {
    this.r = 255;
    this.g = 255;
    this.b = 255;
  }

}

var ease = {
  easeLinear(value) {
    return value;
  },

  easeInQuad(value) {
    return Math.pow(value, 2);
  },

  easeOutQuad(value) {
    return -(Math.pow(value - 1, 2) - 1);
  },

  easeInOutQuad(value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 2);
    return -0.5 * ((value -= 2) * value - 2);
  },

  easeInCubic(value) {
    return Math.pow(value, 3);
  },

  easeOutCubic(value) {
    return Math.pow(value - 1, 3) + 1;
  },

  easeInOutCubic(value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 3);
    return 0.5 * (Math.pow(value - 2, 3) + 2);
  },

  easeInQuart(value) {
    return Math.pow(value, 4);
  },

  easeOutQuart(value) {
    return -(Math.pow(value - 1, 4) - 1);
  },

  easeInOutQuart(value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 4);
    return -0.5 * ((value -= 2) * Math.pow(value, 3) - 2);
  },

  easeInSine(value) {
    return -Math.cos(value * MathUtil.PI_2) + 1;
  },

  easeOutSine(value) {
    return Math.sin(value * MathUtil.PI_2);
  },

  easeInOutSine(value) {
    return -0.5 * (Math.cos(Math.PI * value) - 1);
  },

  easeInExpo(value) {
    return value === 0 ? 0 : Math.pow(2, 10 * (value - 1));
  },

  easeOutExpo(value) {
    return value === 1 ? 1 : -Math.pow(2, -10 * value) + 1;
  },

  easeInOutExpo(value) {
    if (value === 0) return 0;
    if (value === 1) return 1;
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (value - 1));
    return 0.5 * (-Math.pow(2, -10 * --value) + 2);
  },

  easeInCirc(value) {
    return -(Math.sqrt(1 - value * value) - 1);
  },

  easeOutCirc(value) {
    return Math.sqrt(1 - Math.pow(value - 1, 2));
  },

  easeInOutCirc(value) {
    if ((value /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - value * value) - 1);
    return 0.5 * (Math.sqrt(1 - (value -= 2) * value) + 1);
  },

  easeInBack(value) {
    let s = 1.70158;
    return value * value * ((s + 1) * value - s);
  },

  easeOutBack(value) {
    let s = 1.70158;
    return (value = value - 1) * value * ((s + 1) * value + s) + 1;
  },

  easeInOutBack(value) {
    let s = 1.70158;
    if ((value /= 0.5) < 1) return 0.5 * (value * value * (((s *= 1.525) + 1) * value - s));
    return 0.5 * ((value -= 2) * value * (((s *= 1.525) + 1) * value + s) + 2);
  },

  getEasing(ease) {
    if (typeof ease === "function") return ease;else return this[ease] || this.easeLinear;
  }

};

class Vector2D {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  setX(x) {
    this.x = x;
    return this;
  }

  setY(y) {
    this.y = y;
    return this;
  }

  getGradient() {
    if (this.x !== 0) return Math.atan2(this.y, this.x);else if (this.y > 0) return MathUtil.PI_2;else if (this.y < 0) return -MathUtil.PI_2;
  }

  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  add(v, w) {
    if (w !== undefined) {
      return this.addVectors(v, w);
    }

    this.x += v.x;
    this.y += v.y;
    return this;
  }

  addXY(a, b) {
    this.x += a;
    this.y += b;
    return this;
  }

  addVectors(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
  }

  sub(v, w) {
    if (w !== undefined) {
      return this.subVectors(v, w);
    }

    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  subVectors(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  }

  divideScalar(s) {
    if (s !== 0) {
      this.x /= s;
      this.y /= s;
    } else {
      this.set(0, 0);
    }

    return this;
  }

  multiplyScalar(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  negate() {
    return this.multiplyScalar(-1);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    return this.divideScalar(this.length());
  }

  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }

  rotate(tha) {
    const x = this.x;
    const y = this.y;
    this.x = x * Math.cos(tha) + y * Math.sin(tha);
    this.y = -x * Math.sin(tha) + y * Math.cos(tha);
    return this;
  }

  distanceToSquared(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx * dx + dy * dy;
  }

  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    return this;
  }

  equals(v) {
    return v.x === this.x && v.y === this.y;
  }

  clear() {
    this.x = 0.0;
    this.y = 0.0;
    return this;
  }

  clone() {
    return new Vector2D(this.x, this.y);
  }

}

class Particle {
  /**
   * the Particle class
   *
   * @class Proton.Particle
   * @constructor
   * @param {Object} pObj the parameters object;
   * for example {life:3,dead:false}
   */
  constructor(conf) {
    /**
     * The particle's id;
     * @property id
     * @type {string}
     */
    this.name = "Particle";
    this.id = Puid.id(this.name);
    this.old = {};
    this.data = {};
    this.behaviours = [];
    this.p = new Vector2D();
    this.v = new Vector2D();
    this.a = new Vector2D();
    this.old.p = new Vector2D();
    this.old.v = new Vector2D();
    this.old.a = new Vector2D();
    this.rgb = new Rgb();
    this.reset();
    conf && Util.setProp(this, conf);
  }

  getDirection() {
    return Math.atan2(this.v.x, -this.v.y) * MathUtil.N180_PI;
  }

  reset() {
    this.life = Infinity;
    this.age = 0;
    this.dead = false;
    this.sleep = false;
    this.body = null;
    this.sprite = null;
    this.parent = null;
    this.energy = 1; // Energy Loss

    this.mass = 1;
    this.radius = 10;
    this.alpha = 1;
    this.scale = 1;
    this.rotation = 0;
    this.color = null;
    this.p.set(0, 0);
    this.v.set(0, 0);
    this.a.set(0, 0);
    this.old.p.set(0, 0);
    this.old.v.set(0, 0);
    this.old.a.set(0, 0);
    this.easing = ease.easeLinear;
    this.rgb.reset();
    Util.emptyObject(this.data);
    this.removeAllBehaviours();
    return this;
  }

  update(time, index) {
    if (!this.sleep) {
      this.age += time;
      this.applyBehaviours(time, index);
    }

    if (this.age < this.life) {
      const scale = this.easing(this.age / this.life);
      this.energy = Math.max(1 - scale, 0);
    } else {
      this.destroy();
    }
  }

  applyBehaviours(time, index) {
    const length = this.behaviours.length;
    let i;

    for (i = 0; i < length; i++) {
      this.behaviours[i] && this.behaviours[i].applyBehaviour(this, time, index);
    }
  }

  addBehaviour(behaviour) {
    this.behaviours.push(behaviour);
    if (behaviour.hasOwnProperty("parents")) behaviour.parents.push(this);
    behaviour.initialize(this);
  }

  addBehaviours(behaviours) {
    const length = behaviours.length;
    let i;

    for (i = 0; i < length; i++) {
      this.addBehaviour(behaviours[i]);
    }
  }

  removeBehaviour(behaviour) {
    const index = this.behaviours.indexOf(behaviour);

    if (index > -1) {
      const behaviour = this.behaviours.splice(index, 1);
      behaviour.parents = null;
    }
  }

  removeAllBehaviours() {
    Util.emptyArray(this.behaviours);
  }
  /**
   * Destory this particle
   * @method destroy
   */


  destroy() {
    this.removeAllBehaviours();
    this.energy = 0;
    this.dead = true;
    this.parent = null;
  }

}

var ColorUtil = {
  /**
   * @typedef  {Object} rgbObject
   * @property {Number} r red value
   * @property {Number} g green value
   * @property {Number} b blue value
   */

  /**
   * converts a hex value to a rgb object
   *
   * @memberof Proton#Proton.Util
   * @method hexToRgb
   *
   * @param {String} h any hex value, e.g. #000000 or 000000 for black
   *
   * @return {rgbObject}
   */
  hexToRgb(h) {
    const hex16 = h.charAt(0) === "#" ? h.substring(1, 7) : h;
    const r = parseInt(hex16.substring(0, 2), 16);
    const g = parseInt(hex16.substring(2, 4), 16);
    const b = parseInt(hex16.substring(4, 6), 16);
    return {
      r,
      g,
      b
    };
  },

  /**
   * converts a rgb value to a rgb string
   *
   * @memberof Proton#Proton.Util
   * @method rgbToHex
   *
   * @param {Object | Proton.hexToRgb} rgb a rgb object like in {@link Proton#Proton.}
   *
   * @return {String} rgb()
   */
  rgbToHex(rbg) {
    return `rgb(${rbg.r}, ${rbg.g}, ${rbg.b})`;
  },

  getHex16FromParticle(p) {
    return Number(p.rgb.r) * 65536 + Number(p.rgb.g) * 256 + Number(p.rgb.b);
  }

};

class Polar2D {
  constructor(r, tha) {
    this.r = Math.abs(r) || 0;
    this.tha = tha || 0;
  }

  set(r, tha) {
    this.r = r;
    this.tha = tha;
    return this;
  }

  setR(r) {
    this.r = r;
    return this;
  }

  setTha(tha) {
    this.tha = tha;
    return this;
  }

  copy(p) {
    this.r = p.r;
    this.tha = p.tha;
    return this;
  }

  toVector() {
    return new Vector2D(this.getX(), this.getY());
  }

  getX() {
    return this.r * Math.sin(this.tha);
  }

  getY() {
    return -this.r * Math.cos(this.tha);
  }

  normalize() {
    this.r = 1;
    return this;
  }

  equals(v) {
    return v.r === this.r && v.tha === this.tha;
  }

  clear() {
    this.r = 0.0;
    this.tha = 0.0;
    return this;
  }

  clone() {
    return new Polar2D(this.r, this.tha);
  }

}

const Mat3 = {
  create(mat3) {
    const mat = new Float32Array(9);
    if (mat3) this.set(mat3, mat);
    return mat;
  },

  set(mat1, mat2) {
    for (let i = 0; i < 9; i++) mat2[i] = mat1[i];

    return mat2;
  },

  multiply(mat, mat2, mat3) {
    let a00 = mat[0],
      a01 = mat[1],
      a02 = mat[2],
      a10 = mat[3],
      a11 = mat[4],
      a20 = mat[6],
      a21 = mat[7],
      b00 = mat2[0],
      b01 = mat2[1],
      b02 = mat2[2],
      b10 = mat2[3],
      b11 = mat2[4],
      b20 = mat2[6],
      b21 = mat2[7];
    mat3[0] = b00 * a00 + b01 * a10;
    mat3[1] = b00 * a01 + b01 * a11;
    mat3[2] = a02 * b02;
    mat3[3] = b10 * a00 + b11 * a10;
    mat3[4] = b10 * a01 + b11 * a11;
    mat3[6] = b20 * a00 + b21 * a10 + a20;
    mat3[7] = b20 * a01 + b21 * a11 + a21;
    return mat3;
  },

  inverse(mat, mat3) {
    let a00 = mat[0],
      a01 = mat[1],
      a10 = mat[3],
      a11 = mat[4],
      a20 = mat[6],
      a21 = mat[7],
      b01 = a11,
      b11 = -a10,
      b21 = a21 * a10 - a11 * a20,
      d = a00 * b01 + a01 * b11,
      id;
    id = 1 / d;
    mat3[0] = b01 * id;
    mat3[1] = -a01 * id;
    mat3[3] = b11 * id;
    mat3[4] = a00 * id;
    mat3[6] = b21 * id;
    mat3[7] = (-a21 * a00 + a01 * a20) * id;
    return mat3;
  },

  multiplyVec2(m, vec, mat3) {
    let x = vec[0],
      y = vec[1];
    mat3[0] = x * m[0] + y * m[3] + m[6];
    mat3[1] = x * m[1] + y * m[4] + m[7];
    return mat3;
  }

};

class ArraySpan extends Span {
  constructor(color) {
    super();
    this._arr = Util.toArray(color);
  }

  getValue() {
    const val = Util.getRandFromArray(this._arr);
    return val === "random" || val === "Random" ? MathUtil.randomColor() : val;
  }
  /**
   * Make sure that the color is an instance of Proton.ArraySpan, if not it makes a new instance
   *
   * @method setSpanValue
   * @memberof Proton#Proton.Color
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} the integrate time 1/ms
   * @param {Int} the particle index
   */


  static createArraySpan(arr) {
    if (!arr) return null;
    if (arr instanceof ArraySpan) return arr;else return new ArraySpan(arr);
  }

}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.bottom = this.y + this.height;
    this.right = this.x + this.width;
  }

  contains(x, y) {
    if (x <= this.right && x >= this.x && y <= this.bottom && y >= this.y) return true;else return false;
  }

}

class Rate {
  /**
   * The number of particles per second emission (a [particle]/b [s]);
   * @namespace
   * @memberof! Proton#
   * @constructor
   * @alias Rate
   *
   * @param {Array | Number | Span} numpan the number of each emission;
   * @param {Array | Number | Span} timepan the time of each emission;
   * for example: new Rate(new Span(10, 20), new Span(.1, .25));
   */
  constructor(numpan, timepan) {
    this.numPan = Span.setSpanValue(Util.initValue(numpan, 1));
    this.timePan = Span.setSpanValue(Util.initValue(timepan, 1));
    this.startTime = 0;
    this.nextTime = 0;
    this.init();
  }

  init() {
    this.startTime = 0;
    this.nextTime = this.timePan.getValue();
  }

  getValue(time) {
    this.startTime += time;

    if (this.startTime >= this.nextTime) {
      this.startTime = 0;
      this.nextTime = this.timePan.getValue();

      if (this.numPan.b === 1) {
        if (this.numPan.getValue(false) > 0.5) return 1;else return 0;
      } else {
        return this.numPan.getValue(true);
      }
    }

    return 0;
  }

}

class Initialize {
  reset() {}

  init(emitter, particle) {
    if (particle) {
      this.initialize(particle);
    } else {
      this.initialize(emitter);
    }
  } // sub class init


  initialize(target) {}

}

class Life extends Initialize {
  constructor(a, b, c) {
    super();
    this.lifePan = Span.setSpanValue(a, b, c);
    this.name = "Life";
  }

  initialize(target) {
    if (this.lifePan.a === Infinity) target.life = Infinity;else target.life = this.lifePan.getValue();
  }

}

class Zone {
  constructor() {
    this.vector = new Vector2D(0, 0);
    this.random = 0;
    this.crossType = "dead";
    this.alert = true;
  }

  getPosition() {}

  crossing(particle) {}

}

class PointZone extends Zone {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }

  getPosition() {
    this.vector.x = this.x;
    this.vector.y = this.y;
    return this.vector;
  }

  crossing(particle) {
    if (this.alert) {
      console.error("Sorry, PointZone does not support crossing method!");
      this.alert = false;
    }
  }

}

class Position extends Initialize {
  constructor(zone) {
    super();
    this.zone = Util.initValue(zone, new PointZone());
    this.name = "Position";
  }

  reset(zone) {
    this.zone = Util.initValue(zone, new PointZone());
  }

  initialize(target) {
    this.zone.getPosition();
    target.p.x = this.zone.vector.x;
    target.p.y = this.zone.vector.y;
  }

}

class Velocity extends Initialize {
  constructor(rpan, thapan, type) {
    super();
    this.rPan = Span.setSpanValue(rpan);
    this.thaPan = Span.setSpanValue(thapan);
    this.type = Util.initValue(type, "vector");
    this.name = "Velocity";
  }

  reset(rpan, thapan, type) {
    this.rPan = Span.setSpanValue(rpan);
    this.thaPan = Span.setSpanValue(thapan);
    this.type = Util.initValue(type, "vector");
  }

  normalizeVelocity(vr) {
    return vr * Proton.MEASURE;
  }

  initialize(target) {
    if (this.type === "p" || this.type === "P" || this.type === "polar") {
      const polar2d = new Polar2D(this.normalizeVelocity(this.rPan.getValue()), this.thaPan.getValue() * MathUtil.PI_180);
      target.v.x = polar2d.getX();
      target.v.y = polar2d.getY();
    } else {
      target.v.x = this.normalizeVelocity(this.rPan.getValue());
      target.v.y = this.normalizeVelocity(this.thaPan.getValue());
    }
  }

}

class Mass extends Initialize {
  constructor(a, b, c) {
    super();
    this.massPan = Span.setSpanValue(a, b, c);
    this.name = "Mass";
  }

  initialize(target) {
    target.mass = this.massPan.getValue();
  }

}

class Radius extends Initialize {
  constructor(a, b, c) {
    super();
    this.radius = Span.setSpanValue(a, b, c);
    this.name = "Radius";
  }

  reset(a, b, c) {
    this.radius = Span.setSpanValue(a, b, c);
  }

  initialize(particle) {
    particle.radius = this.radius.getValue();
    particle.data.oldRadius = particle.radius;
  }

}

class Body extends Initialize {
  constructor(image, w, h) {
    super();
    this.image = this.setSpanValue(image);
    this.w = Util.initValue(w, 20);
    this.h = Util.initValue(h, this.w);
    this.name = "Body";
  }

  initialize(particle) {
    const imageTarget = this.image.getValue();

    if (typeof imageTarget === "string") {
      particle.body = {
        width: this.w,
        height: this.h,
        src: imageTarget,
        isInner: true,
        inner: true
      };
    } else {
      particle.body = imageTarget;
    }
  }

  setSpanValue(image) {
    return image instanceof ArraySpan ? image : new ArraySpan(image);
  }

}

class Behaviour {
  /**
   * The Behaviour class is the base for the other Behaviour
   *
   * @memberof! -
   * @interface
   * @alias Proton.Behaviour
   *
   * @param {Number} life 	the behaviours life
   * @param {String} easing 	The behaviour's decaying trend, for example ease.easeOutQuart
   *
   * @property {String}  id 		The behaviours id
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   * @property {Number}  age=0 	How long the particle should be 'alife'
   * @property {Number}  energy=1
   * @property {Boolean} dead=false The particle is dead at first
   * @property {Array}   parents 	The behaviour's parents array
   * @property {String}  name 	The behaviour name
   */
  constructor(life, easing) {
    this.life = Util.initValue(life, Infinity);
    this.easing = ease.getEasing(easing);
    this.age = 0;
    this.energy = 1;
    this.dead = false;
    this.parents = [];
    this.id = `Behaviour_${Behaviour.id++}`;
    this.name = 'Behaviour';
  }
  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton.Behaviour
   * @instance
   *
   * @param {Number} [life=Infinity] 		this behaviour's life
   * @param {String} [easing=easeLinear] 	this behaviour's easing
   */


  reset(life, easing) {
    this.life = Util.initValue(life, Infinity);
    this.easing = ease.getEasing(easing);
  }
  /**
   * Normalize a force by 1:100;
   *
   * @method normalizeForce
   * @memberof Proton.Behaviour
   * @instance
   *
   * @param {Proton.Vector2D} force
   */


  normalizeForce(force) {
    return force.multiplyScalar(Proton.MEASURE);
  }
  /**
   * Normalize a value by 1:100;
   *
   * @method normalizeValue
   * @memberof Proton.Behaviour
   * @instance
   *
   * @param {Number} value
   */


  normalizeValue(value) {
    return value * Proton.MEASURE;
  }
  /**
   * Initialize the behaviour's parameters for all particles
   *
   * @method initialize
   * @memberof Proton.Behaviour
   * @instance
   *
   * @param {Proton.Particle} particle
   */


  initialize(particle) {}
  /**
   * Apply this behaviour for all particles every time
   *
   * @method applyBehaviour
   * @memberof Proton.Behaviour
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} 			time the integrate time 1/ms
   * @param {Int} 			index the particle index
   */


  calculate(particle, time, index) {
    this.age += time;

    if (this.age >= this.life || this.dead) {
      this.energy = 0;
      this.dead = true;
      this.destroy();
    } else {
      const scale = this.easing(particle.age / particle.life);
      this.energy = Math.max(1 - scale, 0);
    }
  }
  /**
   * Destory this behaviour
   *
   * @method destroy
   * @memberof Proton.Behaviour
   * @instance
   */


  destroy() {
    let i = this.parents.length;

    while (i--) {
      this.parents[i].removeBehaviour(this);
    }

    this.parents.length = 0;
  }

}

_defineProperty(Behaviour, "id", 0);

class Force extends Behaviour {
  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Force
   *
   * @param {Number} fx
   * @param {Number} fy
   * @param {Number} [life=Infinity] 			this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  constructor(fx, fy, life, easing) {
    super(life, easing);
    this.force = this.normalizeForce(new Vector2D(fx, fy));
    this.name = 'Force';
  }
  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Force
   * @instance
   *
   * @param {Number} fx
   * @param {Number} fy
   * @param {Number} [life=Infinity] 			this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  reset(fx, fy, life, easing) {
    this.force = this.normalizeForce(new Vector2D(fx, fy));
    life && super.reset(life, easing);
  }
  /**
   * Apply this behaviour for all particles every time
   *
   * @method applyBehaviour
   * @memberof Proton#Proton.Force
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} the integrate time 1/ms
   * @param {Int} the particle index
   */


  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);
    particle.a.add(this.force);
  }

}

class Attraction extends Behaviour {
  /**
   * This behaviour let the particles follow one specific Proton.Vector2D
   *
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Attraction
   *
   * @todo add description for 'force' and 'radius'
   *
   * @param {Proton.Vector2D} targetPosition the attraction point coordinates
   * @param {Number} [force=100]
   * @param {Number} [radius=1000]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {Proton.Vector2D} targetPosition
   * @property {Number} radius
   * @property {Number} force
   * @property {Number} radiusSq
   * @property {Proton.Vector2D} attractionForce
   * @property {Number} lengthSq
   * @property {String} name The Behaviour name
   */
  constructor(targetPosition, force, radius, life, easing) {
    super(life, easing);
    this.targetPosition = Util.initValue(targetPosition, new Vector2D());
    this.radius = Util.initValue(radius, 1000);
    this.force = Util.initValue(this.normalizeValue(force), 100);
    this.radiusSq = this.radius * this.radius;
    this.attractionForce = new Vector2D();
    this.lengthSq = 0;
    this.name = "Attraction";
  }
  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Attraction
   * @instance
   *
   * @todo add description for 'force' and 'radius'
   *
   * @param {Proton.Vector2D} targetPosition the attraction point coordinates
   * @param {Number} [force=100]
   * @param {Number} [radius=1000]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  reset(targetPosition, force, radius, life, easing) {
    this.targetPosition = Util.initValue(targetPosition, new Vector2D());
    this.radius = Util.initValue(radius, 1000);
    this.force = Util.initValue(this.normalizeValue(force), 100);
    this.radiusSq = this.radius * this.radius;
    this.attractionForce = new Vector2D();
    this.lengthSq = 0;
    life && super.reset(life, easing);
  }
  /**
   * Apply this behaviour for all particles every time
   *
   * @memberof Proton#Proton.Attraction
   * @method applyBehaviour
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} 			time the integrate time 1/ms
   * @param {Int} 			index the particle index
   */


  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);
    this.attractionForce.copy(this.targetPosition);
    this.attractionForce.sub(particle.p);
    this.lengthSq = this.attractionForce.lengthSq();

    if (this.lengthSq > 0.00004 && this.lengthSq < this.radiusSq) {
      this.attractionForce.normalize();
      this.attractionForce.multiplyScalar(1 - this.lengthSq / this.radiusSq);
      this.attractionForce.multiplyScalar(this.force);
      particle.a.add(this.attractionForce);
    }
  }

}

class RandomDrift extends Behaviour {
  /**
   * @memberof! Proton#
   * @augments Behaviour
   * @constructor
   * @alias RandomDrift
   *
   * @param {Number} driftX 				X value of the new Vector2D
   * @param {Number} driftY  				Y value of the new Vector2D
   * @param {Number} delay 				How much delay the drift should have
   * @param {Number} [life=Infinity] 		this behaviour's life
   * @param {String} [easing=easeLinear] 	this behaviour's easing
   *
   * @property {Number} time The time of the drift
   * @property {String} name The Behaviour name
   */
  constructor(driftX, driftY, delay, life, easing) {
    super(life, easing);
    this.reset(driftX, driftY, delay);
    this.time = 0;
    this.name = "RandomDrift";
  }
  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#RandomDrift
   * @instance
   *
   * @param {Number} driftX 				X value of the new Vector2D
   * @param {Number} driftY  				Y value of the new Vector2D
   * @param {Number} delay 				How much delay the drift should have
   * @param {Number} [life=Infinity] 		this behaviour's life
   * @param {String} [easing=easeLinear] 	this behaviour's easing
   */


  reset(driftX, driftY, delay, life, easing) {
    this.panFoce = new Vector2D(driftX, driftY);
    this.panFoce = this.normalizeForce(this.panFoce);
    this.delay = delay;
    life && super.reset(life, easing);
  }

  initialize(particle) {
    particle.data.time = 0;
  }
  /**
   * Apply this behaviour for all particles every time
   *
   * @method applyBehaviour
   * @memberof Proton#RandomDrift
   * @instance
   *
   * @param {Particle} particle
   * @param {Number} 			time the integrate time 1/ms
   * @param {Int} 			index the particle index
   */


  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);
    particle.data.time += time;

    if (particle.data.time >= this.delay) {
      particle.a.addXY(MathUtil.randomAToB(-this.panFoce.x, this.panFoce.x), MathUtil.randomAToB(-this.panFoce.y, this.panFoce.y));
      particle.data.time = 0;
    }
  }

}

class Gravity extends Force {
  /**
   * @memberof! Proton#
   * @augments Proton#Proton.Force
   * @constructor
   * @alias Proton.Gravity
   *
   * @param {Number} g 							Gravity
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  constructor(g, life, easing) {
    super(0, g, life, easing);
    this.name = 'Gravity';
  }
  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Gravity
   * @instance
   *
   * @param {Number} g 							Gravity
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  reset(g, life, easing) {
    super.reset(0, g, life, easing);
  }

}

class Collision extends Behaviour {
  /**
   * The callback after collision
   *
   * @callback Callback
   *
   * @param {Proton.Particle} particle
   * @param {Proton.Paritcle} otherParticle
   */

  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Collision
   *
   * @todo add description to mass
   *
   * @param {Proton.Emitter} 	[emitter=null] 		the attraction point coordinates
   * @param {Boolean} 		[mass=true]
   * @param {Callback}	 	[callback=null]		the callback after the collision
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  constructor(emitter, mass, callback, life, easing) {
    super(life, easing);
    this.reset(emitter, mass, callback);
    this.name = 'Collision';
  }
  /**
   * Reset this behaviour's parameters
   *
   * @memberof Proton#Proton.Collision
   * @method reset
   * @instance
   *
   * @todo add description to mass
   *
   * @param {Proton.Emitter} 	[emitter=null] 		the attraction point coordinates
   * @param {Boolean} 		[mass=true]
   * @param {Callback}	 	[callback=null]		the callback after the collision
   * @param {Number} 			[life=Infinity] 	this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  reset(emitter, mass, callback, life, easing) {
    this.emitter = Util.initValue(emitter, null);
    this.mass = Util.initValue(mass, true);
    this.callback = Util.initValue(callback, null);
    this.collisionPool = [];
    this.delta = new Vector2D();
    life && super.reset(life, easing);
  }
  /**
   * Apply this behaviour for all particles every time
   *
   * @memberof Proton#Proton.Collision
   * @method applyBehaviour
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} 			time the integrate time 1/ms
   * @param {Int} 			index the particle index
   */


  applyBehaviour(particle, time, index) {
    const newPool = this.emitter ? this.emitter.particles.slice(index) : this.pool.slice(index);
    const length = newPool.length;
    let otherParticle;
    let lengthSq;
    let overlap;
    let totalMass;
    let averageMass1, averageMass2;
    let i;

    for (i = 0; i < length; i++) {
      otherParticle = newPool[i];

      if (otherParticle !== particle) {
        this.delta.copy(otherParticle.p);
        this.delta.sub(particle.p);
        lengthSq = this.delta.lengthSq();
        const distance = particle.radius + otherParticle.radius;

        if (lengthSq <= distance * distance) {
          overlap = distance - Math.sqrt(lengthSq);
          overlap += 0.5;
          totalMass = particle.mass + otherParticle.mass;
          averageMass1 = this.mass ? otherParticle.mass / totalMass : 0.5;
          averageMass2 = this.mass ? particle.mass / totalMass : 0.5;
          particle.p.add(this.delta.clone().normalize().multiplyScalar(overlap * -averageMass1));
          otherParticle.p.add(this.delta.normalize().multiplyScalar(overlap * averageMass2));
          this.callback && this.callback(particle, otherParticle);
        }
      }
    }
  }

}

class CrossZone extends Behaviour {
  /**
   * Defines what happens if the particles come to the end of the specified zone
   *
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.CrossZone
   *
   * @param {Proton.Zone} zone 						can be any Proton.Zone - e.g. Proton.RectZone()
   * @param {String} 		[crossType=dead] 			what happens if the particles pass the zone - allowed strings: dead | bound | cross
   * @param {Number} 		[life=Infinity] 			this behaviour's life
   * @param {String} 		[easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  constructor(zone, crossType, life, easing) {
    super(life, easing);
    this.reset(zone, crossType);
    this.name = 'CrossZone';
  }
  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.CrossZone
   * @instance
   *
   * @param {Proton.Zone} zone 				can be any Proton.Zone - e.g. Proton.RectZone()
   * @param {String} 		[crossType=dead] 	what happens if the particles pass the zone - allowed strings: dead | bound | cross
   * @param {Number} 		[life=Infinity] 	this behaviour's life
   * @param {String} 		[easing=easeLinear]	this behaviour's easing
   */


  reset(zone, crossType, life, easing) {
    this.zone = zone;
    this.zone.crossType = Util.initValue(crossType, 'dead');
    life && super.reset(life, easing);
  }
  /**
   * Apply this behaviour for all particles every time
   *
   * @method applyBehaviour
   * @memberof Proton#Proton.CrossZone
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} the integrate time 1/ms
   * @param {Int} the particle index
   */


  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);
    this.zone.crossing(particle);
  }

}

class Alpha extends Behaviour {
  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Alpha
   *
   * @todo add description for 'a' and 'b'
   *
   * @param {Number} a
   * @param {String} b
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  constructor(a, b, life, easing) {
    super(life, easing);
    this.reset(a, b);
    this.name = 'Alpha';
  }
  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Alpha
   * @instance
   *
   * @todo add description for 'a' and 'b'
   *
   * @param {Number} a
   * @param {String} b
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  reset(a, b, life, easing) {
    this.same = b === null || b === undefined ? true : false;
    this.a = Span.setSpanValue(Util.initValue(a, 1));
    this.b = Span.setSpanValue(b);
    life && super.reset(life, easing);
  }
  /**
   * Sets the new alpha value of the particle
   *
   * @method initialize
   * @memberof Proton#Proton.Alpha
   * @instance
   *
   * @param {Proton.Particle} particle A single Proton generated particle
   */


  initialize(particle) {
    particle.data.alphaA = this.a.getValue();
    if (this.same) particle.data.alphaB = particle.data.alphaA;else particle.data.alphaB = this.b.getValue();
  }
  /**
   * @method applyBehaviour
   * @memberof Proton#Proton.Alpha
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} 			time the integrate time 1/ms
   * @param {Int} 			index the particle index
   */


  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);
    particle.alpha = particle.data.alphaB + (particle.data.alphaA - particle.data.alphaB) * this.energy;
    if (particle.alpha < 0.001) particle.alpha = 0;
  }

}

class Scale extends Behaviour {
  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Scale
   *
   * @todo add description for 'a' and 'b'
   *
   * @param {Number} a
   * @param {String} b
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  constructor(a, b, life, easing) {
    super(life, easing);
    this.reset(a, b);
    this.name = 'Scale';
  }
  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Scale
   * @instance
   *
   * @param {Number} a
   * @param {String} b
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  reset(a, b, life, easing) {
    this.same = b === null || b === undefined ? true : false;
    this.a = Span.setSpanValue(Util.initValue(a, 1));
    this.b = Span.setSpanValue(b);
    life && super.reset(life, easing);
  }
  /**
   * Initialize the behaviour's parameters for all particles
   *
   * @method initialize
   * @memberof Proton#Proton.Scale
   * @instance
   *
   * @param {Proton.Particle} particle
   */


  initialize(particle) {
    particle.data.scaleA = this.a.getValue();
    particle.data.oldRadius = particle.radius;
    particle.data.scaleB = this.same ? particle.data.scaleA : this.b.getValue();
  }

  /**
   * Apply this behaviour for all particles every time
   *
   * @method applyBehaviour
   * @memberof Proton#Proton.Scale
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} 			time the integrate time 1/ms
   * @param {Int} 			index the particle index
   */
  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);
    particle.scale = particle.data.scaleB + (particle.data.scaleA - particle.data.scaleB) * this.energy;
    if (particle.scale < 0.0001) particle.scale = 0;
    particle.radius = particle.data.oldRadius * particle.scale;
  }

}

class Rotate extends Behaviour {
  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Rotate
   *
   * @todo add description for 'a', 'b' and 'style'
   *
   * @param {String} [influence=Velocity] The rotation's influence
   * @param {String} b
   * @param {String} [style=to]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  constructor(influence, b, style, life, easing) {
    super(life, easing);
    this.reset(influence, b, style);
    this.name = 'Rotate';
  }
  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Rotate
   * @instance
   *
   * @todo add description for 'a', 'b' and 'style'
   *
   * @param {String} a
   * @param {String} b
   * @param {String} [style=to]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  reset(a, b, style, life, easing) {
    this.same = b === null || b === undefined ? true : false;
    this.a = Span.setSpanValue(Util.initValue(a, 'Velocity'));
    this.b = Span.setSpanValue(Util.initValue(b, 0));
    this.style = Util.initValue(style, 'to');
    life && super.reset(life, easing);
  }
  /**
   * Initialize the behaviour's parameters for all particles
   *
   * @method initialize
   * @memberof Proton#Proton.Rotate
   * @instance
   *
   * @param {Proton.Particle} particle
   */


  initialize(particle) {
    particle.rotation = this.a.getValue();
    particle.data.rotationA = this.a.getValue();
    if (!this.same) particle.data.rotationB = this.b.getValue();
  }

  /**
   * Apply this behaviour for all particles every time
   *
   * @method applyBehaviour
   * @memberof Proton#Proton.Rotate
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} 			time the integrate time 1/ms
   * @param {Int} 			index the particle index
   */
  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);

    if (!this.same) {
      if (this.style === 'to' || this.style === 'TO' || this.style === '_') {
        particle.rotation += particle.data.rotationB + (particle.data.rotationA - particle.data.rotationB) * this.energy;
      } else {
        particle.rotation += particle.data.rotationB;
      }
    } else if (this.a.a === 'V' || this.a.a === 'Velocity' || this.a.a === 'v') {
      // beta...
      particle.rotation = particle.getDirection();
    }
  }

}

class Color extends Behaviour {
  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Color
   *
   * @param {Proton.ArraySpan | String} a the string should be a hex e.g. #000000 for black
   * @param {Proton.ArraySpan | String} b the string should be a hex e.g. #000000 for black
   * @param {Number} [life=Infinity] 	this behaviour's life
   * @param {String} [easing=easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  constructor(a, b, life, easing) {
    super(life, easing);
    this.reset(a, b);
    this.name = "Color";
  }
  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Color
   * @instance
   *
   * @param {Proton.ArraySpan | String} a the string should be a hex e.g. #000000 for black
   * @param {Proton.ArraySpan | String} b the string should be a hex e.g. #000000 for black
   * @param {Number} [life=Infinity] 	this behaviour's life
   * @param {String} [easing=easeLinear] 	this behaviour's easing
   */


  reset(a, b, life, easing) {
    this.a = ArraySpan.createArraySpan(a);
    this.b = ArraySpan.createArraySpan(b);
    life && super.reset(life, easing);
  }
  /**
   * Initialize the behaviour's parameters for all particles
   *
   * @method initialize
   * @memberof Proton#Proton.Color
   * @instance
   *
   * @param {Proton.Particle} particle
   */


  initialize(particle) {
    particle.color = this.a.getValue();
    particle.data.colorA = ColorUtil.hexToRgb(particle.color);
    if (this.b) particle.data.colorB = ColorUtil.hexToRgb(this.b.getValue());
  }
  /**
   * Apply this behaviour for all particles every time
   *
   * @method applyBehaviour
   * @memberof Proton#Proton.Color
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} the integrate time 1/ms
   * @param {Int} the particle index
   */


  applyBehaviour(particle, time, index) {
    if (this.b) {
      this.calculate(particle, time, index);
      particle.rgb.r = particle.data.colorB.r + (particle.data.colorA.r - particle.data.colorB.r) * this.energy;
      particle.rgb.g = particle.data.colorB.g + (particle.data.colorA.g - particle.data.colorB.g) * this.energy;
      particle.rgb.b = particle.data.colorB.b + (particle.data.colorA.b - particle.data.colorB.b) * this.energy;
      particle.rgb.r = Math.floor(particle.rgb.r);
      particle.rgb.g = Math.floor(particle.rgb.g);
      particle.rgb.b = Math.floor(particle.rgb.b);
    } else {
      particle.rgb.r = particle.data.colorA.r;
      particle.rgb.g = particle.data.colorA.g;
      particle.rgb.b = particle.data.colorA.b;
    }
  }

}

const CHANGING = "changing";
class Cyclone extends Behaviour {
  /**
   * @memberof! Proton#
   * @augments Proton.Behaviour
   * @constructor
   * @alias Proton.Cyclone
   *
   * @param {Number} angle
   * @param {Number} force
   * @param {Number} [life=Infinity] 			this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  constructor(angle, force, life, easing) {
    super(life, easing);
    this.setAngleAndForce(angle, force);
    this.name = "Cyclone";
  }

  setAngleAndForce(angle, force) {
    this.force = CHANGING;
    this.angle = MathUtil.PI / 2;

    if (angle === "right") {
      this.angle = MathUtil.PI / 2;
    } else if (angle === "left") {
      this.angle = -MathUtil.PI / 2;
    } else if (angle === "random") {
      this.angle = "random";
    } else if (angle instanceof Span) {
      this.angle = "span";
      this.span = angle;
    } else if (angle) {
      this.angle = angle;
    }

    if (String(force).toLowerCase() === "changing" || String(force).toLowerCase() === "chang" || String(force).toLowerCase() === "auto") {
      this.force = CHANGING;
    } else if (force) {
      this.force = force;
    }
  }
  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Cyclone
   * @instance
   *
   * @param {Number} angle
   * @param {Number} force
   * @param {Number} [life=Infinity] 			this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  reset(angle, force, life, easing) {
    this.angle = MathUtil.PI / 2;
    this.setAngleAndForce(angle, force);
    life && super.reset(life, easing);
  }

  initialize(particle) {
    if (this.angle === "random") {
      particle.data.cangle = MathUtil.randomAToB(-MathUtil.PI, MathUtil.PI);
    } else if (this.angle === "span") {
      particle.data.cangle = this.span.getValue();
    }

    particle.data.cyclone = new Vector2D(0, 0);
  }
  /**
   * Apply this behaviour for all particles every time
   *
   * @method applyBehaviour
   * @memberof Proton#Proton.Cyclone
   * @instance
   *
   * @param {Proton.Particle} particle
   * @param {Number} the integrate time 1/ms
   * @param {Int} the particle index
   */


  applyBehaviour(particle, time, index) {
    this.calculate(particle, time, index);
    let length;
    let gradient = particle.v.getGradient();

    if (this.angle === "random" || this.angle === "span") {
      gradient += particle.data.cangle;
    } else {
      gradient += this.angle;
    }

    if (this.force === CHANGING) {
      length = particle.v.length() / 100;
    } else {
      length = this.force;
    }

    particle.data.cyclone.x = length * Math.cos(gradient);
    particle.data.cyclone.y = length * Math.sin(gradient);
    particle.data.cyclone = this.normalizeForce(particle.data.cyclone);
    particle.a.add(particle.data.cyclone);
  }

}

class Repulsion extends Attraction {
  /**
   * The oppisite of Proton.Attraction - turns the force
   *
   * @memberof! Proton#
   * @augments Proton#Proton.Attraction
   * @constructor
   * @alias Proton.Repulsion
   *
   * @todo add description for 'force' and 'radius'
   *
   * @param {Proton.Vector2D} targetPosition the attraction point coordinates
   * @param {Number} [force=100]
   * @param {Number} [radius=1000]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   *
   * @property {Number} force
   * @property {String} name The Behaviour name
   */
  constructor(targetPosition, force, radius, life, easing) {
    super(targetPosition, force, radius, life, easing);
    this.force *= -1;
    this.name = 'Repulsion';
  }
  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#Proton.Repulsion
   * @instance
   *
   * @todo add description for 'force' and 'radius'
   *
   * @param {Proton.Vector2D} targetPosition the attraction point coordinates
   * @param {Number} [force=100]
   * @param {Number} [radius=1000]
   * @param {Number} [life=Infinity] 				this behaviour's life
   * @param {String} [easing=ease.easeLinear] 	this behaviour's easing
   */


  reset(targetPosition, force, radius, life, easing) {
    super.reset(targetPosition, force, radius, life, easing);
    this.force *= -1;
  }

}

class GravityWell extends Behaviour {
  /**
   * @memberof! Proton#
   * @augments Behaviour
   * @constructor
   * @alias GravityWell
   *
   * @param {Vector2D} [centerPoint=new Vector2D] The point in the center
   * @param {Number} [force=100]					The force
   * @param {Number} [life=Infinity]				this behaviour's life
   * @param {String} [easing=easeLinear]	this behaviour's easing
   *
   * @property {String} name The Behaviour name
   */
  constructor(centerPoint, force, life, easing) {
    super(life, easing);
    this.distanceVec = new Vector2D();
    this.centerPoint = Util.initValue(centerPoint, new Vector2D());
    this.force = Util.initValue(this.normalizeValue(force), 100);
    this.name = 'GravityWell';
  }
  /**
   * Reset this behaviour's parameters
   *
   * @method reset
   * @memberof Proton#GravityWell
   * @instance
   *
   * @param {Vector2D} [centerPoint=new Vector2D] The point in the center
   * @param {Number} [force=100]					The force
   * @param {Number} [life=Infinity]				this behaviour's life
   * @param {String} [easing=easeLinear]	this behaviour's easing
   */


  reset(centerPoint, force, life, easing) {
    this.distanceVec = new Vector2D();
    this.centerPoint = Util.initValue(centerPoint, new Vector2D());
    this.force = Util.initValue(this.normalizeValue(force), 100);
    life && super.reset(life, easing);
  }

  /**
   * @inheritdoc
   */
  initialize(particle) {}

  /**
   * Apply this behaviour for all particles every time
   *
   * @method applyBehaviour
   * @memberof Proton#GravityWell
   * @instance
   *
   * @param {Particle} particle
   * @param {Number} the integrate time 1/ms
   * @param {Int} the particle index
   */
  applyBehaviour(particle, time, index) {
    this.distanceVec.set(this.centerPoint.x - particle.p.x, this.centerPoint.y - particle.p.y);
    const distanceSq = this.distanceVec.lengthSq();

    if (distanceSq !== 0) {
      const distance = this.distanceVec.length();
      const factor = this.force * time / (distanceSq * distance);
      particle.v.x += factor * this.distanceVec.x;
      particle.v.y += factor * this.distanceVec.y;
    }
  }

}

var InitializeUtil = {
  initialize(emitter, particle, initializes) {
    const length = initializes.length;
    let i;

    for (i = 0; i < length; i++) {
      if (initializes[i] instanceof Initialize) {
        initializes[i].init(emitter, particle);
      } else {
        this.init(emitter, particle, initializes[i]);
      }
    }

    this.bindEmitter(emitter, particle);
  },

  // init
  init(emitter, particle, initialize) {
    Util.setProp(particle, initialize);
    Util.setVectorVal(particle, initialize);
  },

  bindEmitter(emitter, particle) {
    if (emitter.bindEmitter) {
      particle.p.add(emitter.p);
      particle.v.add(emitter.v);
      particle.a.add(emitter.a);
      particle.v.rotate(MathUtil.degreeTransform(emitter.rotation));
    }
  }

};

class Emitter extends Particle {
  /**
   * You can use this emit particles.
   *
   * It will dispatch follow events:
   * PARTICLE_CREATED
   * PARTICLE_UPDATA
   * PARTICLE_DEAD
   *
   * @class Emitter
   * @constructor
   * @param {Object} conf the parameters object;
   * for example {damping:0.01,bindEmitter:false}
   */
  constructor(conf = {}) {
    super(conf);
    this.particles = [];
    this.behaviours = [];
    this.initializes = [];
    this.emitTime = 0;
    this.emitSpeed = 0;
    this.totalTime = -1;
    /**
     * The friction coefficient for all particle emit by This;
     * @property damping
     * @type {Number}
     * @default 0.006
     */

    this.damping = 0.006;
    /**
     * If bindEmitter the particles can bind this emitter's property;
     * @property bindEmitter
     * @type {Boolean}
     * @default true
     */

    this.bindEmitter = true;
    /**
     * The number of particles per second emit (a [particle]/b [s]);
     * @property rate
     * @type {Rate}
     * @default Rate(1, .1)
     */

    this.rate = new Rate(1, 0.1);
    this.name = "Emitter";
    this.id = Puid.id(this.name);
  }
  /**
   * start emit particle
   * @method emit
   * @param {Number} emitTime begin emit time;
   * @param {String} life the life of this emitter
   */


  emit(totalTime, life) {
    this.stoped = false;
    this.emitTime = 0;
    this.totalTime = Util.initValue(totalTime, Infinity);

    if (life === true || life === "life" || life === "destroy") {
      this.life = totalTime === "once" ? 1 : this.totalTime;
    } else if (!isNaN(life)) {
      this.life = life;
    }

    this.rate.init();
  }
  /**
   * stop emiting
   * @method stop
   */


  stop() {
    this.totalTime = -1;
    this.emitTime = 0;
    this.stoped = true;
  }

  preEmit(time) {
    let oldStoped = this.stoped;
    let oldEmitTime = this.emitTime;
    let oldTotalTime = this.totalTime;
    this.stoped = false;
    this.emitTime = 0;
    this.totalTime = time;
    this.rate.init();
    const step = 0.0167;

    while (time > step) {
      time -= step;
      this.update(step);
    }

    this.stoped = oldStoped;
    this.emitTime = oldEmitTime + Math.max(time, 0);
    this.totalTime = oldTotalTime;
  }
  /**
   * remove current all particles
   * @method removeAllParticles
   */


  removeAllParticles() {
    let i = this.particles.length;

    while (i--) this.particles[i].dead = true;
  }
  /**
   * add initialize to this emitter
   * @method addSelfInitialize
   */


  addSelfInitialize(initialize) {
    if (initialize["init"]) {
      initialize.init(this);
    } else {
      this.initAll();
    }
  }
  /**
   * add the Initialize to particles;
   *
   * you can use initializes array:for example emitter.addInitialize(initialize1,initialize2,initialize3);
   * @method addInitialize
   * @param {Initialize} initialize like this new Radius(1, 12)
   */


  addInitialize(...rest) {
    let i = rest.length;

    while (i--) this.initializes.push(rest[i]);
  }
  /**
   * remove the Initialize
   * @method removeInitialize
   * @param {Initialize} initialize a initialize
   */


  removeInitialize(initializer) {
    const index = this.initializes.indexOf(initializer);
    if (index > -1) this.initializes.splice(index, 1);
  }
  /**
   * remove all Initializes
   * @method removeInitializers
   */


  removeAllInitializers() {
    Util.emptyArray(this.initializes);
  }
  /**
   * add the Behaviour to particles;
   *
   * you can use Behaviours array:emitter.addBehaviour(Behaviour1,Behaviour2,Behaviour3);
   * @method addBehaviour
   * @param {Behaviour} behaviour like this new Color('random')
   */


  addBehaviour(...rest) {
    let i = arguments.length;

    while (i--) {
      let behaviour = rest[i];
      this.behaviours.push(behaviour);
      if (behaviour.parents) behaviour.parents.push(this);
    }
  }
  /**
   * remove the Behaviour
   * @method removeBehaviour
   * @param {Behaviour} behaviour a behaviour
   */


  removeBehaviour(behaviour) {
    let index = this.behaviours.indexOf(behaviour);
    this.behaviours.splice(index, 1);

    if (behaviour.parents) {
      index = behaviour.parents.indexOf(behaviour);
      behaviour.parents.splice(index, 1);
    }

    return index;
  }
  /**
   * remove all behaviours
   * @method removeAllBehaviours
   */


  removeAllBehaviours() {
    Util.emptyArray(this.behaviours);
  } // emitter update


  update(time) {
    this.age += time;
    if (this.age >= this.life || this.dead) this.destroy();
    this.emitting(time);
    this.integrate(time);
  }

  integrate(time) {
    if (!this.parent) return;
    const damping = 1 - this.damping;
    this.parent.integrator.calculate(this, time, damping);
    const length = this.particles.length;
    let i, particle;

    for (i = length - 1; i >= 0; i--) {
      particle = this.particles[i]; // particle update

      particle.update(time, i);
      this.parent.integrator.calculate(particle, time, damping);
      this.dispatch("PARTICLE_UPDATE", particle); // check dead

      if (particle.dead) {
        this.dispatch("PARTICLE_DEAD", particle);
        this.parent.pool.expire(particle);
        this.particles.splice(i, 1);
      }
    }
  }

  dispatch(event, target) {
    this.parent && this.parent.dispatchEvent(event, target);
    this.bindEvent && this.dispatchEvent(event, target);
  }

  emitting(time) {
    if (this.totalTime === "once") {
      let i;
      const length = this.rate.getValue(99999);
      if (length > 0) this.emitSpeed = length;

      for (i = 0; i < length; i++) this.createParticle();

      this.totalTime = "none";
    } else {
      this.emitTime += time;

      if (this.emitTime < this.totalTime) {
        const length = this.rate.getValue(time);
        let i;
        if (length > 0) this.emitSpeed = length;

        for (i = 0; i < length; i++) this.createParticle();
      }
    }
  }
  /**
   * create single particle;
   *
   * can use emit({x:10},new Gravity(10),{'particleUpdate',fun}) or emit([{x:10},new Initialize],new Gravity(10),{'particleUpdate',fun})
   * @method removeAllParticles
   */


  createParticle(initialize, behaviour) {
    const particle = this.parent.pool.get(Particle);
    this.setupParticle(particle, initialize, behaviour);
    this.dispatch("PARTICLE_CREATED", particle);
    return particle;
  }

  setupParticle(particle, initialize, behaviour) {
    let initializes = this.initializes;
    let behaviours = this.behaviours;
    if (initialize) initializes = Util.toArray(initialize);
    if (behaviour) behaviours = Util.toArray(behaviour);
    particle.reset();
    InitializeUtil.initialize(this, particle, initializes);
    particle.addBehaviours(behaviours);
    particle.parent = this;
    this.particles.push(particle);
  }

  remove() {
    this.stop();
    Util.destroyAll(this.particles);
  }
  /**
   * Destory this Emitter
   * @method destroy
   */


  destroy() {
    this.dead = true;
    this.remove();
    this.removeAllInitializers();
    this.removeAllBehaviours();
    this.parent && this.parent.removeEmitter(this);
  }

}
EventDispatcher.bind(Emitter);

class BehaviourEmitter extends Emitter {
  /**
   * The BehaviourEmitter class inherits from Proton.Emitter
   *
   * use the BehaviourEmitter you can add behaviours to self;
   * @class Proton.BehaviourEmitter
   * @constructor
   * @param {Object} conf the parameters object;
   */
  constructor(conf) {
    super(conf);
    this.selfBehaviours = [];
  }
  /**
   * add the Behaviour to emitter;
   *
   * you can use Behaviours array:emitter.addSelfBehaviour(Behaviour1,Behaviour2,Behaviour3);
   * @method addSelfBehaviour
   * @param {Proton.Behaviour} behaviour like this new Proton.Color('random')
   */


  addSelfBehaviour(...rest) {
    let i,
      length = rest.length;

    for (i = 0; i < length; i++) {
      let behaviour = rest[i];
      this.selfBehaviours.push(behaviour);
      behaviour.initialize(this);
    }
  }
  /**
   * remove the Behaviour for self
   * @method removeSelfBehaviour
   * @param {Proton.Behaviour} behaviour a behaviour
   */


  removeSelfBehaviour(behaviour) {
    const index = this.selfBehaviours.indexOf(behaviour);
    if (index > -1) this.selfBehaviours.splice(index, 1);
  }

  update(time) {
    super.update(time);

    if (!this.sleep) {
      const length = this.selfBehaviours.length;
      let i;

      for (i = 0; i < length; i++) {
        this.selfBehaviours[i].applyBehaviour(this, time, i);
      }
    }
  }

}

class FollowEmitter extends Emitter {
  /**
   * The FollowEmitter class inherits from Proton.Emitter
   *
   * use the FollowEmitter will emit particle when mousemoving
   *
   * @class Proton.FollowEmitter
   * @constructor
   * @param {Element} mouseTarget mouseevent's target;
   * @param {Number} ease the easing of following speed;
   * @default 0.7
   * @param {Object} conf the parameters object;
   */
  constructor(mouseTarget, ease, conf) {
    super(conf);
    this.mouseTarget = Util.initValue(mouseTarget, window);
    this.ease = Util.initValue(ease, 0.7);
    this._allowEmitting = false;
    this.initEventHandler();
  }

  initEventHandler() {
    this.mousemoveHandler = e => this.mousemove.call(this, e);

    this.mousedownHandler = e => this.mousedown.call(this, e);

    this.mouseupHandler = e => this.mouseup.call(this, e);

    this.mouseTarget.addEventListener("mousemove", this.mousemoveHandler, false);
  }
  /**
   * start emit particle
   * @method emit
   */


  emit() {
    this._allowEmitting = true;
  }
  /**
   * stop emiting
   * @method stop
   */


  stop() {
    this._allowEmitting = false;
  }

  mousemove(e) {
    if (e.layerX || e.layerX === 0) {
      this.p.x += (e.layerX - this.p.x) * this.ease;
      this.p.y += (e.layerY - this.p.y) * this.ease;
    } else if (e.offsetX || e.offsetX === 0) {
      this.p.x += (e.offsetX - this.p.x) * this.ease;
      this.p.y += (e.offsetY - this.p.y) * this.ease;
    }

    if (this._allowEmitting) super.emit("once");
  }
  /**
   * Destory this Emitter
   * @method destroy
   */


  destroy() {
    super.destroy();
    this.mouseTarget.removeEventListener("mousemove", this.mousemoveHandler, false);
  }

}

class BaseRenderer {
  constructor(element, stroke) {
    this.pool = new Pool();
    this.element = element;
    this.stroke = stroke;
    this.circleConf = {
      isCircle: true
    };
    this.initHandler();
    this.name = "BaseRenderer";
  }

  setStroke(color = "#000000", thinkness = 1) {
    this.stroke = {
      color,
      thinkness
    };
  }

  initHandler() {
    this._protonUpdateHandler = () => {
      this.onProtonUpdate.call(this);
    };

    this._protonUpdateAfterHandler = () => {
      this.onProtonUpdateAfter.call(this);
    };

    this._emitterAddedHandler = emitter => {
      this.onEmitterAdded.call(this, emitter);
    };

    this._emitterRemovedHandler = emitter => {
      this.onEmitterRemoved.call(this, emitter);
    };

    this._particleCreatedHandler = particle => {
      this.onParticleCreated.call(this, particle);
    };

    this._particleUpdateHandler = particle => {
      this.onParticleUpdate.call(this, particle);
    };

    this._particleDeadHandler = particle => {
      this.onParticleDead.call(this, particle);
    };
  }

  init(proton) {
    this.parent = proton;
    proton.addEventListener("PROTON_UPDATE", this._protonUpdateHandler);
    proton.addEventListener("PROTON_UPDATE_AFTER", this._protonUpdateAfterHandler);
    proton.addEventListener("EMITTER_ADDED", this._emitterAddedHandler);
    proton.addEventListener("EMITTER_REMOVED", this._emitterRemovedHandler);
    proton.addEventListener("PARTICLE_CREATED", this._particleCreatedHandler);
    proton.addEventListener("PARTICLE_UPDATE", this._particleUpdateHandler);
    proton.addEventListener("PARTICLE_DEAD", this._particleDeadHandler);
  }

  resize(width, height) {}

  destroy() {
    this.remove();
  }

  remove(proton) {
    this.parent.removeEventListener("PROTON_UPDATE", this._protonUpdateHandler);
    this.parent.removeEventListener("PROTON_UPDATE_AFTER", this._protonUpdateAfterHandler);
    this.parent.removeEventListener("EMITTER_ADDED", this._emitterAddedHandler);
    this.parent.removeEventListener("EMITTER_REMOVED", this._emitterRemovedHandler);
    this.parent.removeEventListener("PARTICLE_CREATED", this._particleCreatedHandler);
    this.parent.removeEventListener("PARTICLE_UPDATE", this._particleUpdateHandler);
    this.parent.removeEventListener("PARTICLE_DEAD", this._particleDeadHandler);
    this.parent = null;
  }

  onProtonUpdate() {}

  onProtonUpdateAfter() {}

  onEmitterAdded(emitter) {}

  onEmitterRemoved(emitter) {}

  onParticleCreated(particle) {}

  onParticleUpdate(particle) {}

  onParticleDead(particle) {}

}

class CanvasRenderer extends BaseRenderer {
  constructor(element) {
    super(element);
    this.stroke = null;
    this.context = this.element.getContext("2d");
    this.bufferCache = {};
    this.name = "CanvasRenderer";
  }

  resize(width, height) {
    this.element.width = width;
    this.element.height = height;
  }

  onProtonUpdate() {
    this.context.clearRect(0, 0, this.element.width, this.element.height);
  }

  onParticleCreated(particle) {
    if (particle.body) {
      ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
    } else {
      particle.color = particle.color || "#ff0000";
    }
  }

  onParticleUpdate(particle) {
    if (particle.body) {
      if (particle.body instanceof Image) this.drawImage(particle);
    } else {
      this.drawCircle(particle);
    }
  }

  onParticleDead(particle) {
    particle.body = null;
  } // private


  addImg2Body(img, particle) {
    particle.body = img;
  } // private drawCircle


  drawImage(particle) {
    const w = particle.body.width * particle.scale | 0;
    const h = particle.body.height * particle.scale | 0;
    const x = particle.p.x - w / 2;
    const y = particle.p.y - h / 2;

    if (!!particle.color) {
      if (!particle.data["buffer"]) particle.data.buffer = this.createBuffer(particle.body);
      const bufContext = particle.data.buffer.getContext("2d");
      bufContext.clearRect(0, 0, particle.data.buffer.width, particle.data.buffer.height);
      bufContext.globalAlpha = particle.alpha;
      bufContext.drawImage(particle.body, 0, 0);
      bufContext.globalCompositeOperation = "source-atop";
      bufContext.fillStyle = ColorUtil.rgbToHex(particle.rgb);
      bufContext.fillRect(0, 0, particle.data.buffer.width, particle.data.buffer.height);
      bufContext.globalCompositeOperation = "source-over";
      bufContext.globalAlpha = 1;
      this.context.drawImage(particle.data.buffer, 0, 0, particle.data.buffer.width, particle.data.buffer.height, x, y, w, h);
    } else {
      this.context.save();
      this.context.globalAlpha = particle.alpha;
      this.context.translate(particle.p.x, particle.p.y);
      this.context.rotate(MathUtil.degreeTransform(particle.rotation));
      this.context.translate(-particle.p.x, -particle.p.y);
      this.context.drawImage(particle.body, 0, 0, particle.body.width, particle.body.height, x, y, w, h);
      this.context.globalAlpha = 1;
      this.context.restore();
    }
  } // private drawCircle --


  drawCircle(particle) {
    if (particle.rgb) {
      this.context.fillStyle = `rgba(${particle.rgb.r},${particle.rgb.g},${particle.rgb.b},${particle.alpha})`;
    } else {
      this.context.fillStyle = particle.color;
    } // draw circle


    this.context.beginPath();
    this.context.arc(particle.p.x, particle.p.y, particle.radius, 0, Math.PI * 2, true);

    if (this.stroke) {
      this.context.strokeStyle = this.stroke.color;
      this.context.lineWidth = this.stroke.thinkness;
      this.context.stroke();
    }

    this.context.closePath();
    this.context.fill();
  } // private createBuffer


  createBuffer(image) {
    if (image instanceof Image) {
      const size = image.width + "_" + image.height;
      let canvas = this.bufferCache[size];

      if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        this.bufferCache[size] = canvas;
      }

      return canvas;
    }
  }

}

class DomRenderer extends BaseRenderer {
  constructor(element) {
    super(element);
    this.stroke = null;

    this.pool.create = (body, particle) => this.createBody(body, particle);

    this.addImg2Body = this.addImg2Body.bind(this);
    this.transform3d = false;
    this.name = "DomRenderer";
  }

  onParticleCreated(particle) {
    if (particle.body) {
      ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
    } else {
      particle.body = this.pool.get(this.circleConf, particle);
      this.element.appendChild(particle.body);
    }
  }

  onParticleUpdate(particle) {
    if (this.bodyReady(particle)) {
      if (this.transform3d) DomUtil.transform3d(particle.body, particle.p.x, particle.p.y, particle.scale, particle.rotation);else DomUtil.transform(particle.body, particle.p.x, particle.p.y, particle.scale, particle.rotation);
      particle.body.style.opacity = particle.alpha;

      if (particle.body.isCircle) {
        particle.body.style.backgroundColor = particle.color || "#ff0000";
      }
    }
  }

  onParticleDead(particle) {
    if (this.bodyReady(particle)) {
      this.element.removeChild(particle.body);
      this.pool.expire(particle.body);
      particle.body = null;
    }
  }

  bodyReady(particle) {
    return typeof particle.body === "object" && particle.body && !particle.body.isInner;
  } // private


  addImg2Body(img, particle) {
    if (particle.dead) return;
    particle.body = this.pool.get(img, particle);
    DomUtil.resize(particle.body, img.width, img.height);
    this.element.appendChild(particle.body);
  }

  createBody(body, particle) {
    if (body.isCircle) return this.createCircle(particle);else return this.createSprite(body, particle);
  } // private --


  createCircle(particle) {
    const dom = DomUtil.createDiv(`${particle.id}_dom`, 2 * particle.radius, 2 * particle.radius);
    dom.style.borderRadius = `${particle.radius}px`;

    if (this.stroke) {
      dom.style.borderColor = this.stroke.color;
      dom.style.borderWidth = `${this.stroke.thinkness}px`;
    }

    dom.isCircle = true;
    return dom;
  }

  createSprite(body, particle) {
    const url = typeof body === "string" ? body : body.src;
    const dom = DomUtil.createDiv(`${particle.id}_dom`, body.width, body.height);
    dom.style.backgroundImage = `url(${url})`;
    return dom;
  }

}

class EaselRenderer extends BaseRenderer {
  constructor(element, stroke) {
    super(element);
    this.stroke = stroke;
    this.name = "EaselRenderer";
  }

  onParticleCreated(particle) {
    if (particle.body) {
      this.createSprite(particle);
    } else {
      this.createCircle(particle);
    }

    this.element.addChild(particle.body);
  }

  onParticleUpdate(particle) {
    if (particle.body) {
      particle.body.x = particle.p.x;
      particle.body.y = particle.p.y;
      particle.body.alpha = particle.alpha;
      particle.body.scaleX = particle.body.scaleY = particle.scale;
      particle.body.rotation = particle.rotation;
    }
  }

  onParticleDead(particle) {
    if (particle.body) {
      particle.body.parent && particle.body.parent.removeChild(particle.body);
      this.pool.expire(particle.body);
      particle.body = null;
    }

    if (particle.graphics) this.pool.expire(particle.graphics);
  } // private


  createSprite(particle) {
    particle.body = this.pool.get(particle.body);
    if (particle.body.parent) return;

    if (particle.body["image"]) {
      particle.body.regX = particle.body.image.width / 2;
      particle.body.regY = particle.body.image.height / 2;
    }
  }

  createCircle(particle) {
    const graphics = this.pool.get(createjs.Graphics);

    if (this.stroke) {
      if (this.stroke instanceof String) graphics.beginStroke(this.stroke);else graphics.beginStroke("#000000");
    }

    graphics.beginFill(particle.color || "#ff0000").drawCircle(0, 0, particle.radius);
    const shape = this.pool.get(createjs.Shape, [graphics]);
    particle.body = shape;
    particle.graphics = graphics;
  }

}

class PixelRenderer extends BaseRenderer {
  constructor(element, rectangle) {
    super(element);
    this.context = this.element.getContext("2d");
    this.imageData = null;
    this.rectangle = null;
    this.rectangle = rectangle;
    this.createImageData(rectangle);
    this.name = "PixelRenderer";
  }

  resize(width, height) {
    this.element.width = width;
    this.element.height = height;
  }

  createImageData(rectangle) {
    this.rectangle = rectangle ? rectangle : new Rectangle(0, 0, this.element.width, this.element.height);
    this.imageData = this.context.createImageData(this.rectangle.width, this.rectangle.height);
    this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
  }

  onProtonUpdate() {
    this.context.clearRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
    this.imageData = this.context.getImageData(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
  }

  onProtonUpdateAfter() {
    this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y);
  }

  onParticleCreated(particle) {}

  onParticleUpdate(particle) {
    if (this.imageData) {
      this.setPixel(this.imageData, Math.floor(particle.p.x - this.rectangle.x), Math.floor(particle.p.y - this.rectangle.y), particle);
    }
  }

  setPixel(imagedata, x, y, particle) {
    const rgb = particle.rgb;
    if (x < 0 || x > this.element.width || y < 0 || y > this.elementwidth) return;
    const i = ((y >> 0) * imagedata.width + (x >> 0)) * 4;
    imagedata.data[i] = rgb.r;
    imagedata.data[i + 1] = rgb.g;
    imagedata.data[i + 2] = rgb.b;
    imagedata.data[i + 3] = particle.alpha * 255;
  }

  onParticleDead(particle) {}

}

let PIXIClass;
class PixiRenderer extends BaseRenderer {
  constructor(element, stroke) {
    super(element);
    this.stroke = stroke;
    this.color = false;
    this.setColor = false;
    this.blendMode = null;

    this.pool.create = (body, particle) => this.createBody(body, particle);

    this.setPIXI(window.PIXI);
    this.name = "PixiRenderer";
  }

  setPIXI(PIXI) {
    try {
      PIXIClass = PIXI || {
        Sprite: {}
      };
      this.createFromImage = PIXIClass.Sprite.from || PIXIClass.Sprite.fromImage;
    } catch (e) {}
  }

  onProtonUpdate() {}
  /**
   * @param particle
   */


  onParticleCreated(particle) {
    if (particle.body) {
      particle.body = this.pool.get(particle.body, particle);
    } else {
      particle.body = this.pool.get(this.circleConf, particle);
    }

    if (this.blendMode) {
      particle.body.blendMode = this.blendMode;
    }

    this.element.addChild(particle.body);
  }
  /**
   * @param particle
   */


  onParticleUpdate(particle) {
    this.transform(particle, particle.body);

    if (this.setColor === true || this.color === true) {
      particle.body.tint = ColorUtil.getHex16FromParticle(particle);
    }
  }
  /**
   * @param particle
   */


  onParticleDead(particle) {
    this.element.removeChild(particle.body);
    this.pool.expire(particle.body);
    particle.body = null;
  }

  destroy(particles) {
    super.destroy();
    this.pool.destroy();
    let i = particles.length;

    while (i--) {
      let particle = particles[i];

      if (particle.body) {
        this.element.removeChild(particle.body);
      }
    }
  }

  transform(particle, target) {
    target.x = particle.p.x;
    target.y = particle.p.y;
    target.alpha = particle.alpha;
    target.scale.x = particle.scale;
    target.scale.y = particle.scale; // using cached version of MathUtil.PI_180 for slight performance increase.

    target.rotation = particle.rotation * MathUtil.PI_180; // MathUtil.PI_180;
  }

  createBody(body, particle) {
    if (body.isCircle) return this.createCircle(particle);else return this.createSprite(body);
  }

  createSprite(body) {
    const sprite = body.isInner ? this.createFromImage(body.src) : new PIXIClass.Sprite(body);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    return sprite;
  }

  createCircle(particle) {
    const graphics = new PIXIClass.Graphics();

    if (this.stroke) {
      const stroke = this.stroke instanceof String ? this.stroke : 0x000000;
      graphics.beginStroke(stroke);
    }

    graphics.beginFill(particle.color || 0x008ced);
    graphics.drawCircle(0, 0, particle.radius);
    graphics.endFill();
    return graphics;
  }

}

class MStack {
  constructor() {
    this.mats = [];
    this.size = 0;

    for (let i = 0; i < 20; i++) this.mats.push(Mat3.create([0, 0, 0, 0, 0, 0, 0, 0, 0]));
  }

  set(m, i) {
    if (i === 0) Mat3.set(m, this.mats[0]);else Mat3.multiply(this.mats[i - 1], m, this.mats[i]);
    this.size = Math.max(this.size, i + 1);
  }

  push(m) {
    if (this.size === 0) Mat3.set(m, this.mats[0]);else Mat3.multiply(this.mats[this.size - 1], m, this.mats[this.size]);
    this.size++;
  }

  pop() {
    if (this.size > 0) this.size--;
  }

  top() {
    return this.mats[this.size - 1];
  }

}

class WebGLRenderer extends BaseRenderer {
  constructor(element) {
    super(element);
    this.gl = this.element.getContext('experimental-webgl', {
      antialias: true,
      stencil: false,
      depth: false
    });
    if (!this.gl) alert('Sorry your browser do not suppest WebGL!');
    this.initVar();
    this.setMaxRadius();
    this.initShaders();
    this.initBuffers();
    this.gl.blendEquation(this.gl.FUNC_ADD);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);
    this.addImg2Body = this.addImg2Body.bind(this);
    this.name = 'WebGLRenderer';
  }

  init(proton) {
    super.init(proton);
    this.resize(this.element.width, this.element.height);
  }

  resize(width, height) {
    this.umat[4] = -2;
    this.umat[7] = 1;
    this.smat[0] = 1 / width;
    this.smat[4] = 1 / height;
    this.mstack.set(this.umat, 0);
    this.mstack.set(this.smat, 1);
    this.gl.viewport(0, 0, width, height);
    this.element.width = width;
    this.element.height = height;
  }

  setMaxRadius(radius) {
    this.circleCanvasURL = this.createCircle(radius);
  }

  getVertexShader() {
    const vsSource = ['uniform vec2 viewport;', 'attribute vec2 aVertexPosition;', 'attribute vec2 aTextureCoord;', 'uniform mat3 tMat;', 'varying vec2 vTextureCoord;', 'varying float alpha;', 'void main() {', 'vec3 v = tMat * vec3(aVertexPosition, 1.0);', 'gl_Position = vec4(v.x, v.y, 0, 1);', 'vTextureCoord = aTextureCoord;', 'alpha = tMat[0][2];', '}'].join('\n');
    return vsSource;
  }

  getFragmentShader() {
    const fsSource = ['precision mediump float;', 'varying vec2 vTextureCoord;', 'varying float alpha;', 'uniform sampler2D uSampler;', 'uniform vec4 color;', 'uniform bool useTexture;', 'uniform vec3 uColor;', 'void main() {', 'vec4 textureColor = texture2D(uSampler, vTextureCoord);', 'gl_FragColor = textureColor * vec4(uColor, 1.0);', 'gl_FragColor.w *= alpha;', '}'].join('\n');
    return fsSource;
  }

  initVar() {
    this.mstack = new MStack();
    this.umat = Mat3.create([2, 0, 1, 0, -2, 0, -1, 1, 1]);
    this.smat = Mat3.create([1 / 100, 0, 1, 0, 1 / 100, 0, 0, 0, 1]);
    this.texturebuffers = {};
  }

  blendEquation(A) {
    this.gl.blendEquation(this.gl[A]);
  }

  blendFunc(A, B) {
    this.gl.blendFunc(this.gl[A], this.gl[B]);
  }

  getShader(gl, str, fs) {
    const shader = fs ? gl.createShader(gl.FRAGMENT_SHADER) : gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }

  initShaders() {
    const fragmentShader = this.getShader(this.gl, this.getFragmentShader(), true);
    const vertexShader = this.getShader(this.gl, this.getVertexShader(), false);
    this.sprogram = this.gl.createProgram();
    this.gl.attachShader(this.sprogram, vertexShader);
    this.gl.attachShader(this.sprogram, fragmentShader);
    this.gl.linkProgram(this.sprogram);
    if (!this.gl.getProgramParameter(this.sprogram, this.gl.LINK_STATUS)) alert('Could not initialise shaders');
    this.gl.useProgram(this.sprogram);
    this.sprogram.vpa = this.gl.getAttribLocation(this.sprogram, 'aVertexPosition');
    this.sprogram.tca = this.gl.getAttribLocation(this.sprogram, 'aTextureCoord');
    this.gl.enableVertexAttribArray(this.sprogram.tca);
    this.gl.enableVertexAttribArray(this.sprogram.vpa);
    this.sprogram.tMatUniform = this.gl.getUniformLocation(this.sprogram, 'tMat');
    this.sprogram.samplerUniform = this.gl.getUniformLocation(this.sprogram, 'uSampler');
    this.sprogram.useTex = this.gl.getUniformLocation(this.sprogram, 'useTexture');
    this.sprogram.color = this.gl.getUniformLocation(this.sprogram, 'uColor');
    this.gl.uniform1i(this.sprogram.useTex, 1);
  }

  initBuffers() {
    const vs = [0, 3, 1, 0, 2, 3];
    let idx;
    this.unitIBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vs), this.gl.STATIC_DRAW);
    let i;
    let ids = [];

    for (i = 0; i < 100; i++) ids.push(i);

    idx = new Uint16Array(ids);
    this.unitI33 = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitI33);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
    ids = [];

    for (i = 0; i < 100; i++) ids.push(i, i + 1, i + 2);

    idx = new Uint16Array(ids);
    this.stripBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.stripBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
  }

  createCircle(raidus) {
    this.circleCanvasRadius = WebGLUtil.nhpot(Util.initValue(raidus, 32));
    const canvas = DomUtil.createCanvas('circle_canvas', this.circleCanvasRadius * 2, this.circleCanvasRadius * 2);
    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(this.circleCanvasRadius, this.circleCanvasRadius, this.circleCanvasRadius, 0, Math.PI * 2, true);
    context.closePath();
    context.fillStyle = '#FFF';
    context.fill();
    return canvas.toDataURL();
  }

  drawImg2Canvas(particle) {
    const _w = particle.body.width;
    const _h = particle.body.height;

    const _width = WebGLUtil.nhpot(particle.body.width);

    const _height = WebGLUtil.nhpot(particle.body.height);

    const _scaleX = particle.body.width / _width;

    const _scaleY = particle.body.height / _height;

    if (!this.texturebuffers[particle.data.src]) this.texturebuffers[particle.data.src] = [this.gl.createTexture(), this.gl.createBuffer(), this.gl.createBuffer()];
    particle.data.texture = this.texturebuffers[particle.data.src][0];
    particle.data.vcBuffer = this.texturebuffers[particle.data.src][1];
    particle.data.tcBuffer = this.texturebuffers[particle.data.src][2];
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.tcBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _scaleX, 0.0, 0.0, _scaleY, _scaleY, _scaleY]), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.vcBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _w, 0.0, 0.0, _h, _w, _h]), this.gl.STATIC_DRAW);
    const context = particle.data.canvas.getContext('2d');
    const data = context.getImageData(0, 0, _width, _height);
    this.gl.bindTexture(this.gl.TEXTURE_2D, particle.data.texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    particle.data.textureLoaded = true;
    particle.data.textureWidth = _w;
    particle.data.textureHeight = _h;
  }

  onProtonUpdate() {// this.gl.clearColor(0, 0, 0, 1);
    // this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  onParticleCreated(particle) {
    particle.data.textureLoaded = false;
    particle.data.tmat = Mat3.create();
    particle.data.tmat[8] = 1;
    particle.data.imat = Mat3.create();
    particle.data.imat[8] = 1;

    if (particle.body) {
      ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
    } else {
      ImgUtil.getImgFromCache(this.circleCanvasURL, this.addImg2Body, particle);
      particle.data.oldScale = particle.radius / this.circleCanvasRadius;
    }
  } // private


  addImg2Body(img, particle) {
    if (particle.dead) return;
    particle.body = img;
    particle.data.src = img.src;
    particle.data.canvas = ImgUtil.getCanvasFromCache(img);
    particle.data.oldScale = 1;
    this.drawImg2Canvas(particle);
  }

  onParticleUpdate(particle) {
    if (particle.data.textureLoaded) {
      this.updateMatrix(particle);
      this.gl.uniform3f(this.sprogram.color, particle.rgb.r / 255, particle.rgb.g / 255, particle.rgb.b / 255);
      this.gl.uniformMatrix3fv(this.sprogram.tMatUniform, false, this.mstack.top());
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.vcBuffer);
      this.gl.vertexAttribPointer(this.sprogram.vpa, 2, this.gl.FLOAT, false, 0, 0);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.tcBuffer);
      this.gl.vertexAttribPointer(this.sprogram.tca, 2, this.gl.FLOAT, false, 0, 0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, particle.data.texture);
      this.gl.uniform1i(this.sprogram.samplerUniform, 0);
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
      this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
      this.mstack.pop();
    }
  }

  onParticleDead(particle) {}

  updateMatrix(particle) {
    const moveOriginMatrix = WebGLUtil.makeTranslation(-particle.data.textureWidth / 2, -particle.data.textureHeight / 2);
    const translationMatrix = WebGLUtil.makeTranslation(particle.p.x, particle.p.y);
    const angel = particle.rotation * MathUtil.PI_180;
    const rotationMatrix = WebGLUtil.makeRotation(angel);
    const scale = particle.scale * particle.data.oldScale;
    const scaleMatrix = WebGLUtil.makeScale(scale, scale);
    let matrix = WebGLUtil.matrixMultiply(moveOriginMatrix, scaleMatrix);
    matrix = WebGLUtil.matrixMultiply(matrix, rotationMatrix);
    matrix = WebGLUtil.matrixMultiply(matrix, translationMatrix);
    Mat3.inverse(matrix, particle.data.imat);
    matrix[2] = particle.alpha;
    this.mstack.push(matrix);
  }

}

class CustomRenderer extends BaseRenderer {
  constructor(element) {
    super(element);
    this.name = "CustomRenderer";
  }

}

class LineZone extends Zone {
  constructor(x1, y1, x2, y2, direction) {
    super();

    if (x2 - x1 >= 0) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
    } else {
      this.x1 = x2;
      this.y1 = y2;
      this.x2 = x1;
      this.y2 = y1;
    }

    this.dx = this.x2 - this.x1;
    this.dy = this.y2 - this.y1;
    this.minx = Math.min(this.x1, this.x2);
    this.miny = Math.min(this.y1, this.y2);
    this.maxx = Math.max(this.x1, this.x2);
    this.maxy = Math.max(this.y1, this.y2);
    this.dot = this.x2 * this.y1 - this.x1 * this.y2;
    this.xxyy = this.dx * this.dx + this.dy * this.dy;
    this.gradient = this.getGradient();
    this.length = this.getLength();
    this.direction = Util.initValue(direction, ">");
  }

  getPosition() {
    this.random = Math.random();
    this.vector.x = this.x1 + this.random * this.length * Math.cos(this.gradient);
    this.vector.y = this.y1 + this.random * this.length * Math.sin(this.gradient);
    return this.vector;
  }

  getDirection(x, y) {
    const A = this.dy;
    const B = -this.dx;
    const C = this.dot;
    const D = B === 0 ? 1 : B;
    if ((A * x + B * y + C) * D > 0) return true;else return false;
  }

  getDistance(x, y) {
    const A = this.dy;
    const B = -this.dx;
    const C = this.dot;
    const D = A * x + B * y + C;
    return D / Math.sqrt(this.xxyy);
  }

  getSymmetric(v) {
    const tha2 = v.getGradient();
    const tha1 = this.getGradient();
    const tha = 2 * (tha1 - tha2);
    const oldx = v.x;
    const oldy = v.y;
    v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
    v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
    return v;
  }

  getGradient() {
    return Math.atan2(this.dy, this.dx);
  }

  rangeOut(particle) {
    const angle = Math.abs(this.getGradient());

    if (angle <= MathUtil.PI / 4) {
      if (particle.p.x <= this.maxx && particle.p.x >= this.minx) return true;
    } else {
      if (particle.p.y <= this.maxy && particle.p.y >= this.miny) return true;
    }

    return false;
  }

  getLength() {
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
  }

  crossing(particle) {
    if (this.crossType === "dead") {
      if (this.direction === ">" || this.direction === "R" || this.direction === "right" || this.direction === "down") {
        if (!this.rangeOut(particle)) return;
        if (this.getDirection(particle.p.x, particle.p.y)) particle.dead = true;
      } else {
        if (!this.rangeOut(particle)) return;
        if (!this.getDirection(particle.p.x, particle.p.y)) particle.dead = true;
      }
    } else if (this.crossType === "bound") {
      if (!this.rangeOut(particle)) return;

      if (this.getDistance(particle.p.x, particle.p.y) <= particle.radius) {
        if (this.dx === 0) {
          particle.v.x *= -1;
        } else if (this.dy === 0) {
          particle.v.y *= -1;
        } else {
          this.getSymmetric(particle.v);
        }
      }
    } else if (this.crossType === "cross") {
      if (this.alert) {
        console.error("Sorry, LineZone does not support cross method!");
        this.alert = false;
      }
    }
  }

}

class CircleZone extends Zone {
  constructor(x, y, radius) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = 0;
    this.center = {
      x,
      y
    };
  }

  getPosition() {
    this.angle = MathUtil.PIx2 * Math.random();
    this.randomRadius = Math.random() * this.radius;
    this.vector.x = this.x + this.randomRadius * Math.cos(this.angle);
    this.vector.y = this.y + this.randomRadius * Math.sin(this.angle);
    return this.vector;
  }

  setCenter(x, y) {
    this.center.x = x;
    this.center.y = y;
  }

  crossing(particle) {
    const d = particle.p.distanceTo(this.center);

    if (this.crossType === "dead") {
      if (d - particle.radius > this.radius) particle.dead = true;
    } else if (this.crossType === "bound") {
      if (d + particle.radius >= this.radius) this.getSymmetric(particle);
    } else if (this.crossType === "cross") {
      if (this.alert) {
        console.error("Sorry, CircleZone does not support cross method!");
        this.alert = false;
      }
    }
  }

  getSymmetric(particle) {
    let tha2 = particle.v.getGradient();
    let tha1 = this.getGradient(particle);
    let tha = 2 * (tha1 - tha2);
    let oldx = particle.v.x;
    let oldy = particle.v.y;
    particle.v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
    particle.v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
  }

  getGradient(particle) {
    return -MathUtil.PI_2 + Math.atan2(particle.p.y - this.center.y, particle.p.x - this.center.x);
  }

}

class RectZone extends Zone {
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getPosition() {
    this.vector.x = this.x + Math.random() * this.width;
    this.vector.y = this.y + Math.random() * this.height;
    return this.vector;
  }

  crossing(particle) {
    // particle dead zone
    if (this.crossType === "dead") {
      if (particle.p.x + particle.radius < this.x) particle.dead = true;else if (particle.p.x - particle.radius > this.x + this.width) particle.dead = true;
      if (particle.p.y + particle.radius < this.y) particle.dead = true;else if (particle.p.y - particle.radius > this.y + this.height) particle.dead = true;
    } // particle bound zone
    else if (this.crossType === "bound") {
      if (particle.p.x - particle.radius < this.x) {
        particle.p.x = this.x + particle.radius;
        particle.v.x *= -1;
      } else if (particle.p.x + particle.radius > this.x + this.width) {
        particle.p.x = this.x + this.width - particle.radius;
        particle.v.x *= -1;
      }

      if (particle.p.y - particle.radius < this.y) {
        particle.p.y = this.y + particle.radius;
        particle.v.y *= -1;
      } else if (particle.p.y + particle.radius > this.y + this.height) {
        particle.p.y = this.y + this.height - particle.radius;
        particle.v.y *= -1;
      }
    } // particle cross zone
    else if (this.crossType === "cross") {
      if (particle.p.x + particle.radius < this.x && particle.v.x <= 0) particle.p.x = this.x + this.width + particle.radius;else if (particle.p.x - particle.radius > this.x + this.width && particle.v.x >= 0) particle.p.x = this.x - particle.radius;
      if (particle.p.y + particle.radius < this.y && particle.v.y <= 0) particle.p.y = this.y + this.height + particle.radius;else if (particle.p.y - particle.radius > this.y + this.height && particle.v.y >= 0) {particle.p.y = this.y - particle.radius;}
    }
  }

}

class ImageZone extends Zone {
  constructor(imageData, x, y, d) {
    super();
    this.reset(imageData, x, y, d);
  }

  reset(imageData, x, y, d) {
    this.imageData = imageData;
    this.x = Util.initValue(x, 0);
    this.y = Util.initValue(y, 0);
    this.d = Util.initValue(d, 2);
    this.vectors = [];
    this.setVectors();
  }

  setVectors() {
    let i, j;
    const length1 = this.imageData.width;
    const length2 = this.imageData.height;

    for (i = 0; i < length1; i += this.d) {
      for (j = 0; j < length2; j += this.d) {
        let index = ((j >> 0) * length1 + (i >> 0)) * 4;

        if (this.imageData.data[index + 3] > 0) {
          this.vectors.push({
            x: i + this.x,
            y: j + this.y
          });
        }
      }
    }

    return this.vector;
  }

  getBound(x, y) {
    var index = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
    if (this.imageData.data[index + 3] > 0) return true;else return false;
  }

  getPosition() {
    const vector = Util.getRandFromArray(this.vectors);
    return this.vector.copy(vector);
  }

  getColor(x, y) {
    x -= this.x;
    y -= this.y;
    var i = ((y >> 0) * this.imageData.width + (x >> 0)) * 4;
    return {
      r: this.imageData.data[i],
      g: this.imageData.data[i + 1],
      b: this.imageData.data[i + 2],
      a: this.imageData.data[i + 3]
    };
  }

  crossing(particle) {
    if (this.crossType === "dead") {
      if (this.getBound(particle.p.x - this.x, particle.p.y - this.y)) particle.dead = true;else particle.dead = false;
    } else if (this.crossType === "bound") {
      if (!this.getBound(particle.p.x - this.x, particle.p.y - this.y)) particle.v.negate();
    }
  }

}

var Debug = {
  addEventListener(proton, func) {
    proton.addEventListener("PROTON_UPDATE_AFTER", () => func());
  },

  getStyle(color = "#ff0000") {
    const rgb = ColorUtil.hexToRgb(color);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
  },

  drawZone(proton, canvas, zone, clear) {
    const context = canvas.getContext("2d");
    const style = this.getStyle();
    this.addEventListener(proton, () => {
      if (clear) context.clearRect(0, 0, canvas.width, canvas.height);

      if (zone instanceof PointZone) {
        context.beginPath();
        context.fillStyle = style;
        context.arc(zone.x, zone.y, 10, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
      } else if (zone instanceof LineZone) {
        context.beginPath();
        context.strokeStyle = style;
        context.moveTo(zone.x1, zone.y1);
        context.lineTo(zone.x2, zone.y2);
        context.stroke();
        context.closePath();
      } else if (zone instanceof RectZone) {
        context.beginPath();
        context.strokeStyle = style;
        context.drawRect(zone.x, zone.y, zone.width, zone.height);
        context.stroke();
        context.closePath();
      } else if (zone instanceof CircleZone) {
        context.beginPath();
        context.strokeStyle = style;
        context.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2, true);
        context.stroke();
        context.closePath();
      }
    });
  },

  drawEmitter(proton, canvas, emitter, clear) {
    const context = canvas.getContext("2d");
    const style = this.getStyle();
    this.addEventListener(proton, () => {
      if (clear) context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.fillStyle = style;
      context.arc(emitter.p.x, emitter.p.y, 10, 0, Math.PI * 2, true);
      context.fill();
      context.closePath();
    });
  }

};

Proton.Particle = Proton.P = Particle;
Proton.Pool = Pool;
Proton.Util = Util;
Proton.ColorUtil = ColorUtil;
Proton.MathUtil = MathUtil;
Proton.Vector2D = Proton.Vector = Vector2D;
Proton.Polar2D = Proton.Polar = Polar2D;
Proton.ArraySpan = ArraySpan;
Proton.Rectangle = Rectangle;
Proton.Rate = Rate;
Proton.ease = ease;
Proton.Span = Span;
Proton.Mat3 = Mat3;

Proton.getSpan = (a, b, center) => new Span(a, b, center);

Proton.createArraySpan = ArraySpan.createArraySpan;
Proton.Initialize = Proton.Init = Initialize;
Proton.Life = Proton.L = Life;
Proton.Position = Proton.P = Position;
Proton.Velocity = Proton.V = Velocity;
Proton.Mass = Proton.M = Mass;
Proton.Radius = Proton.R = Radius;
Proton.Body = Proton.B = Body;
Proton.Behaviour = Behaviour;
Proton.Force = Proton.F = Force;
Proton.Attraction = Proton.A = Attraction;
Proton.RandomDrift = Proton.RD = RandomDrift;
Proton.Gravity = Proton.G = Gravity;
Proton.Collision = Collision;
Proton.CrossZone = CrossZone;
Proton.Alpha = Proton.A = Alpha;
Proton.Scale = Proton.S = Scale;
Proton.Rotate = Rotate;
Proton.Color = Color;
Proton.Repulsion = Repulsion;
Proton.Cyclone = Cyclone;
Proton.GravityWell = GravityWell;
Proton.Emitter = Emitter;
Proton.BehaviourEmitter = BehaviourEmitter;
Proton.FollowEmitter = FollowEmitter;
Proton.Zone = Zone;
Proton.LineZone = LineZone;
Proton.CircleZone = CircleZone;
Proton.PointZone = PointZone;
Proton.RectZone = RectZone;
Proton.ImageZone = ImageZone;
Proton.CanvasRenderer = CanvasRenderer;
Proton.DomRenderer = DomRenderer;
Proton.EaselRenderer = EaselRenderer;
Proton.PixiRenderer = PixiRenderer;
Proton.PixelRenderer = PixelRenderer;
Proton.WebGLRenderer = Proton.WebGlRenderer = WebGLRenderer;
Proton.CustomRenderer = CustomRenderer;
Proton.Debug = Debug;
Object.assign(Proton, ease); // export

export { Proton };