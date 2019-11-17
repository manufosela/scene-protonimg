import { LitElement, html, css } from 'lit-element';
import { Proton } from './lib/proton';
import { PxLoader, PxLoaderImage} from './lib/pxlib';

/**
 * `scene-protonimg`
 * SceneProtonimg
 *
 * @customElement scene-protonimg
 * @polymer
 * @litElement
 * @demo demo/index.html
 */

class SceneProtonimg extends LitElement {
  static get is() {
    return 'scene-protonimg';
  }

  static get properties() {
    return {
      time: { type: Number },
      width: { type: Number },
      height: { type: Number },
      background: { type: String },
      imagen1: { type: String },
      imagen2: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        margin: 0px;
        overflow: hidden;
      }
      
      #container {
        overflow: hidden;
      }
    `;
  }
  constructor() {
    super();
    this.time = 2;
    this.width = 800;
    this.height = 400;
    this.background = '#000';
    this.imagen1 = '';
    this.imagen2 = '';
  }

  firstUpdated() {
    if (this.imagen1 === '' && this.imagen2 === '') {
      console.warn('Sin imagenes definidas');
    }
    if (this.imagen1 !== '' && this.imagen2 === '') {
      this.imagen2 = this.imagen1;
    }
    this.rootIndex = 1;
    this.canvas = this.shadowRoot.querySelector('#protonCanvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = this.background;

    this.imageDatas = [];
    let width = this.width;
    let height = this.height;

    // this.rect = new Proton.Rectangle((this.canvas.width - width) / 2, (this.canvas.height - height) / 2, width, height);
    // this.rect2 = new Proton.Rectangle(this.rect.x - height / 2, this.rect.y - height / 2, this.rect.width + height, this.rect.height + height);
    this.rect = new Proton.Rectangle(0, 0 , width, height);
    this.rect2 = new Proton.Rectangle(0, 0, this.rect.width + height, this.rect.height + height);
    this.randomBehaviour = new Proton.RandomDrift(0, 0, 0.05);
    var rectZone = new Proton.RectZone(this.rect2.x, this.rect2.y, this.rect2.width, this.rect2.height);
    this.crossBehaviour = new Proton.CrossZone(rectZone, 'bound');
    this.gravityWellBehaviour = new Proton.GravityWell({
      x: this.canvas.width / 2,
      y: this.canvas.height / 2
    }, 0, 0);

    if (this.time > 0) {
      setInterval(this.changeImage.bind(this), (this.time + 3) * 1000);
    } else {
      this.canvas.addEventListener('mousedown', this.changeImage.bind(this), false);
    }
    this.loadImage();
  }

  loadImage() {
    this.logoZone = [];
    var logo = [];
    var loader = new PxLoader();
    logo[0] = loader.addImage(this.imagen1);
    logo[1] = loader.addImage(this.imagen2);

    loader.addCompletionListener(function() {

      for (var i = 0; i < logo.length; i++) {
        var imagedata = Proton.Util.getImageData(this.context, logo[i], this.rect);
        this.logoZone.push(new Proton.ImageZone(imagedata, this.rect.x, this.rect.y));
        this.imageDatas.push(imagedata);
      }
      this.createProton(this.rect);
      this.tick();
    }.bind(this));
    loader.start();
  }

  createProton() {
    this.proton = new Proton;
    this.emitter = new Proton.Emitter();
    this.emitter.rate = new Proton.Rate(new Proton.Span(24000), new Proton.Span(0.1));
    this.emitter.addInitialize(new Proton.Mass(1));
    this.emitter.addInitialize(new Proton.P(new Proton.RectZone(this.rect2.x, this.rect2.y, this.rect2.width, this.rect2.height)));

    this.emitter.addBehaviour(this.randomBehaviour);
    this.emitter.addBehaviour(this.customToZoneBehaviour(this.logoZone[0], this.logoZone[1], this.logoZone[2]));
    this.emitter.addBehaviour(this.crossBehaviour);
    this.emitter.addBehaviour(this.gravityWellBehaviour);

    this.emitter.emit('once');
    this.proton.addEmitter(this.emitter);

    this.renderer = new Proton.PixelRenderer(this.canvas);
    this.renderer.createImageData(this.rect2);
    this.proton.addRenderer(this.renderer);
  }

  customToZoneBehaviour(zone1, zone2, zone3) {
    return {
      initialize: function(particle) {
        particle.R = Math.random() * 10;
        particle.Angle = Math.random() * Math.PI * 2;
        particle.speed = Math.random() * (-2) + 1;
        particle.zones = [zone1.getPosition().clone(), zone2.getPosition().clone()];
        particle.colors = this.getColor(particle.zones);
      }.bind(this),

      applyBehaviour: function(particle) {
        if (this.rootIndex % 2 !== 0) {
          particle.v.clear();
          particle.Angle += particle.speed;
          var index = (this.rootIndex % 4 + 1) / 2 - 1;
          var x = particle.zones[index].x + particle.R * Math.cos(particle.Angle);
          var y = particle.zones[index].y + particle.R * Math.sin(particle.Angle);

          particle.p.x += (x - particle.p.x) * 0.05;
          particle.p.y += (y - particle.p.y) * 0.05;
          particle.rgb.r = particle.colors[index].r;
          particle.rgb.g = particle.colors[index].g;
          particle.rgb.b = particle.colors[index].b;
        }
      }.bind(this)
    };

  }

  getColor(posArr) {
    var arr = [];
    for (var i = 0; i < posArr.length; i++) {
      arr.push(this.logoZone[i].getColor(posArr[i].x, posArr[i].y));
    }
    return arr;
  }

  changeImage(e) {
    this.rootIndex++;
    if (this.rootIndex % 2 === 0) {
      if (this.rootIndex % 4 === 2) {
        this.randomBehaviour.reset(30, 30, 0.001);
      } else {
        this.gravityWellBehaviour.reset({
          x: this.canvas.width / 2,
          y: this.canvas.height / 2
        }, 3000, 500);
      }
    } else {
      this.randomBehaviour.reset(0, 0, 0.001);
      this.gravityWellBehaviour.reset({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2
      }, 0, 0);
    }
  }

  tick() {
    requestAnimationFrame(this.tick.bind(this));
    this.proton.update();
  }

  render() {
    return html`
      <style>
        #protonCanvas {
          background: ${this.background};
        }
      </style>
      <div id="container">
        <canvas id="protonCanvas" width="1103" height="603"></canvas>
      </div>
    `;
  }
}

window.customElements.define(SceneProtonimg.is, SceneProtonimg);