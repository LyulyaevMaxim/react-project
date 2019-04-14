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

  constructor(properties) {
    super(properties)
    this.state = { isLoading: properties.noLazyLoad ? false : null, isError: false }
    this.imageRef = createRef()
  }

  componentDidMount() {
    const imageObserver = new IntersectionObserver(this.observerCallback, LazyImage.observerOptions)
    imageObserver.observe(this.imageRef.current)
  }

  observerCallback = (entries, observer) =>
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.8) {
        this.setState({ isLoading: true })
        observer.unobserve(entry.target)
      }
    })

  imageLoaded = () => this.setState({ isLoading: false })

  loadError = () => this.setState({ isLoading: false, isError: true })

  getImage() {
    const { adaptiveSource, source, alt, placeholder, sourceSet, noLazyLoad, ...properties } = this.props
    const { isLoading, isError } = this.state
    if (isLoading === null || isError) return null

    return (
      <Fragment>
        {isLoading !== false && placeholder && <img alt={alt} className={styles.placeholder} src={placeholder} />}
        {adaptiveSource.map(([media, sourceSet]) => (
          <source {...{ media, sourceSet, ...properties, alt, key: `image-${sourceSet}` }} />
        ))}
        <img
          alt={alt}
          className={styles.image}
          onError={this.loadError}
          onLoad={this.imageLoaded}
          src={source}
          {...properties}
        />
      </Fragment>
    )
  }

  render() {
    const { isLoading, isLoadError } = this.state
    return (
      <picture
        ref={this.imageRef}
        className={className([
          styles.picture,
          isLoading && styles['is-loading'],
          isLoadError && styles['is-load-error'],
          this.props.className,
        ])}
        style={{
          color: 'red',
          // backgroundImage: 'url(' + this.props.placeholder + ')',
          // '--placeholder': encodeURIComponent(this.props.placeholder),
        }}
      >
        {this.getImage()}
      </picture>
    )
  }
}

export default LazyImage
