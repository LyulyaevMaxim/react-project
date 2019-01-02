/* Modernizr is the industry standard for feature detection tests — MDN */
import Modernizr from 'modernizr'
declare var window: any

export default [
  !window.IntersectionObserver &&
    import('intersection-observer' /* webpackChunkName: "polyfill->intersection-observer" */),
  !Modernizr.testProp('position', 'sticky ') &&
    import('stickyfilljs' /* webpackChunkName: "polyfill->position-sticky" */),
  !Modernizr.details && import('details-element-polyfill' /* webpackChunkName: "polyfill->detailsElem" */),
  typeof HTMLDialogElement !== 'function' &&
    import('dialog-polyfill' /*or react-a11y-dialog */ /* webpackChunkName: "polyfill->dialogElem" */).then(module => {
      window.dialogPolyfill = module.default
    }),
  !Modernizr.fetch && import('whatwg-fetch' /* webpackChunkName: "polyfill->fetch" */),
].filter(Boolean)
