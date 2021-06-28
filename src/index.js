import {
  DEFAULT_HOST,
  DEFAULT_WRAPPER_SELECTOR,
  VIEWPORT_S,
  VIEWPORT_M,
  VIEWPORT_L,
  BREAKPOINTS_TO_CLASS,
  WRAPPER_CLASSNAME,
} from './constants';

export default class Nebenan {
  constructor(config) {
    this.config = config;
    this.wrapper = null;
    this.defaultClassNames = '';

    this._addClass = this._addClass.bind(this);
    this._resizer = this._resizer.bind(this);
  }

  _getUTM(utm) {
    return (utm
      ? `?${Object.keys(utm).map((key) => `${key}=${encodeURI(utm[key])}`).join('&')}`
      : '');
  }

  _addStyles() {
    const el = document.createElement('link');
    el.id = 'nebenan_styles';
    el.type = 'text/css';
    el.rel = 'stylesheet';
    el.setAttribute('href', `${this.config.host}/iframe/main-${__VERSION}.css`);

    return el;
  }

  _createIFrame() {
    const host = this.config.host || DEFAULT_HOST;
    const utm = this._getUTM(this.config.utm);
    const { partner } = this.config;

    if (!host || !utm || !partner) {
      console.error("[Nebenan]: Missing required config keys 'host', 'utm' and 'partner'");
      return;
    }

    const el = document.createElement('iframe');
    el.id = 'nebenan_iframe';
    el.setAttribute('src', `${host}/iframable/feed/${this.config.partner}${utm}`);
    el.setAttribute('frameBorder', '0');

    return el;
  }

  _addClass(size) {
    const className = BREAKPOINTS_TO_CLASS[size] || '';

    if (!className || !this.wrapper.classList.contains(className)) {
      this.wrapper.className = `${this.defaultClassNames} ${className}`;
    }
  }

  _resizer(entries) {
    for (const entry of entries) {
      const width = entry.target.offsetWidth;

      if (width <= VIEWPORT_S) {
        this._addClass(VIEWPORT_S);
      } else if (width <= VIEWPORT_M) {
        this._addClass(VIEWPORT_M);
      } else if (width <= VIEWPORT_L) {
        this._addClass(VIEWPORT_L);
      } else {
        this._addClass();
      }
    }
  }

  init() {
    const { selector } = this.config;
    const head = document.getElementsByTagName('head')[0];
    this.wrapper = document.querySelector(selector || DEFAULT_WRAPPER_SELECTOR);
    const iframe = this._createIFrame();

    if (!this.wrapper) {
      console.error('[Nebenan]: Nebenan widget wrapper element is not found');
      return;
    }

    if (!iframe) {
      console.error("[Nebenan]: Can't create iframe, please, check config object.");
      return;
    }

    this.wrapper.classList.add(WRAPPER_CLASSNAME);
    this.defaultClassNames = this.wrapper.className;
    const ro = new ResizeObserver(this._resizer);
    ro.observe(this.wrapper);
    head.appendChild(this._addStyles());
    this.wrapper.appendChild(iframe);
  }
}
