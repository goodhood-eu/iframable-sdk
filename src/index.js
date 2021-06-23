import { version } from '../package';

const NebenanInit = (config) => {
  if (!config) {
    console.error('[Nebenan]: initialisation config is missing!');
    return;
  }

  const getUTM = (utm) => (
    utm
      ? `?${Object.keys(config.utm).map(key => `${key}=${encodeURI(config.utm[key])}`).join('&')}`
      : ''
  );

  const addStyles = () => {
    const el = document.createElement('link');
    el.id = 'nebenan_styles';
    el.type = 'text/css';
    el.rel = 'stylesheet';
    el.setAttribute('href', `https://nebenan.de/iframe/main.css?v=${version}`);

    return el;
  }

  const createIFrame = (config) => {
    const UTM = getUTM(config.utm);

    const el = document.createElement('iframe');
    el.id = 'nebenan_iframe';
    el.setAttribute("src", `http://localhost:3001/iframable/feed/raiffeisen_neuulm${UTM}`);
    el.setAttribute('frameBorder', '0');

    return el;
  }

  const head = document.getElementsByTagName('head')[0];
  const wrapper = document.getElementById('nebenan-widget');

  if (!wrapper) {
    console.error('[Nebenan]: can\'t find nebenan-widget container element!');
    return;
  }

  wrapper.appendChild(createIFrame(config));
  head.appendChild(addStyles());
}

Window.NebenanInit = NebenanInit;
