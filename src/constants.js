export const DEFAULT_HOST = 'https://nebenan.de';
export const DEFAULT_WRAPPER_SELECTOR = '#nebenan-widget';
export const WRAPPER_CLASSNAME = 'nebenan-widget-wrapper';

export const VIEWPORT_L = 745;
export const VIEWPORT_M = 620;
export const VIEWPORT_S = 350;

export const BREAKPOINTS_TO_CLASS = {
  [VIEWPORT_S]: `${WRAPPER_CLASSNAME}--s`,
  [VIEWPORT_M]: `${WRAPPER_CLASSNAME}--m`,
  [VIEWPORT_L]: `${WRAPPER_CLASSNAME}--l`,
};
