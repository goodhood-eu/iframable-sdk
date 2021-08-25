import {
  DEFAULT_HOST,
  DEFAULT_WRAPPER_SELECTOR,
  VIEWPORT_S,
  VIEWPORT_M,
  VIEWPORT_L,
  BREAKPOINTS_TO_CLASS,
  WRAPPER_CLASSNAME,
  CDN,
} from './constants';

export default class GoodHoodSDK {
  constructor(config) {
    this.config = config;
    this.wrapper = null;
    this.defaultClassNames = '';
    this.resizeObserver = null;

    this._addClass = this._addClass.bind(this);
    this._resizer = this._resizer.bind(this);
  }

  _getSearchParams(params) {
    return (params
      ? `?${Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&')}`
      : '');
  }

  _addStyles() {
    const el = document.createElement('link');
    el.id = 'goodhood_styles';
    el.type = 'text/css';
    el.rel = 'stylesheet';
    el.setAttribute('href', `${CDN}/${__VERSION}/styles.css`);

    return el;
  }

  _createIFrame() {
    const host = this.config.host || DEFAULT_HOST;
    const searchParams = this._getSearchParams(this.config.params);
    const { partner } = this.config;

    const el = document.createElement('iframe');
    el.id = 'goodhood_iframe';
    el.setAttribute('src', `${host}/iframable/feed/${partner || 'public'}${searchParams}`);
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

  disconnectResizer() {
    this.resizeObserver.disconnect();
  }

  init() {
    const { selector } = this.config;
    const head = document.getElementsByTagName('head')[0];
    this.wrapper = document.querySelector(selector || DEFAULT_WRAPPER_SELECTOR);
    const iframe = this._createIFrame();

    if (!this.wrapper) {
      console.error('[GoodHood]: GoodHood widget wrapper element is not found');
      return;
    }

    if (!iframe) {
      console.error("[GoodHood]: Can't create iframe, please, check config object.");
      return;
    }

    this.wrapper.classList.add(WRAPPER_CLASSNAME);
    this.defaultClassNames = this.wrapper.className;
    this.resizeObserver = new ResizeObserver(this._resizer);
    this.resizeObserver.observe(this.wrapper);
    head.appendChild(this._addStyles());
    this.wrapper.appendChild(iframe);
  }
}
