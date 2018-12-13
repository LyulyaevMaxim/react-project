import 'intersection-observer'
import React, { Component, Fragment, createRef } from 'react'
import styles from './index.pcss'

const className = require('~utils/react').className()

class LazyImage extends Component {
  static defaultProps = {
    className: '',
    adaptiveSrc: [],
    placeholder: false,
    noLazyLoad: false,
    decoding: 'async',
    alt: '',
    /* TODO:  noRetry: false, retry : {count: 3, delay: 2} */
  }

  static observerOptions = { root: null, rootMargin: '0px', threshold: 0.8 }

  /*
    If we will scroll a long list of images it can reduce bandwidth. 
    We can limit a quantity images which will parallel downloaded with help "limitOfParallelDownload". 
    An image which not fit in the limit will check the queue on availability an empty place with the interval "delayBeforeTry", 
    then if still stay in the viewport it will be loaded.
  */
  static networkOptions = { limitOfParallelDownload: null, delayBeforeTry: 1000 }

  constructor(props) {
    super(props)
    this.state = { isLoad: true, isLoadError: false, isVisible: props.noLazyLoad }
    this.imageRef = createRef()
  }

  componentDidMount() {
    const imageObserver = new IntersectionObserver(this.observerCallback, LazyImage.observerOptions)
    imageObserver.observe(this.imageRef.current)
  }

  observerCallback = (entries, observer) =>
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.8) {
        this.setState({ isVisible: true })
        observer.unobserve(entry.target)
      }
    })

  imageLoaded = () => this.setState({ isLoad: false })

  loadError = () => this.setState({ isLoad: false, isLoadError: true })

  render() {
    const { adaptiveSrc, src, srcSet, alt, noLazyLoad, placeholder, ...props } = this.props
    const { isVisible, isLoad, isLoadError } = this.state
    // if (noLazyLoad) return <picture />
    // if (typeof placeholder === 'function' && isLoad) return <Placeholder ref={this.imageRef} />
    return (
      <picture
        ref={this.imageRef}
        className={className([
          styles.picture,
          isLoad && styles['is-load'],
          isLoadError && styles['is-load-error'],
          props.className,
        ])}
      >
        {isVisible && !isLoadError && (
          <Fragment>
            {adaptiveSrc.map(([media, srcSet]) => (
              <source {...{ media, srcSet, ...props, alt, key: `image-${srcSet}` }} />
            ))}
            <img src={src} onLoad={this.imageLoaded} onError={this.loadError} alt={alt} {...props} />
          </Fragment>
        )}
      </picture>
    )
  }
}

export default LazyImage
