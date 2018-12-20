import React from 'react'
import loadable from '@loadable/component'
import styles from './index.pcss'

const LazyImg = loadable(() => import('~modules/lazy-img'))

function LazyLoadDemo() {
  const images = [
    'cashbox-categories-placeholder-01.jpg',
    'cashbox-categories-placeholder-02.jpg',
    'cashbox-categories-placeholder-03.jpg',
    'cashbox-categories-placeholder-04.jpg',
    'cashbox-categories-placeholder-05.jpg',
    'cashbox-categories-placeholder-06.jpg',
    'cashbox-categories-placeholder-07.jpg',
    'cashbox-categories-placeholder-08.jpg',
    'cashbox-categories-placeholder-09.jpg',
    'cashbox-categories-placeholder-10.jpg',
  ]
  return (
    <section styleName="lazy-demo">
      {images.map((imgName, index) => (
        <LazyImg {...{ imgName, className: styles['lazy-img'], key: imgName }} />
      ))}
    </section>
  )
}

export default LazyLoadDemo
