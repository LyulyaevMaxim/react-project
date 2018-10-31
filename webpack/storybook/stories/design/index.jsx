import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { color } from '@storybook/addon-knobs/react'
const styles = {}
// import styles from '../styles.pcss'

// TODO: replace "<h6>" to onclick which will copied text in clipboard
// TODO: revel-font-sample.html can be useful

storiesOf('Design', module).add('icons', () => {
  const req = require.context('~img', true, /\.svg$/)
  return (
    <Fragment>
      <h1 className={styles.h1}>Icons</h1>
      <section className={styles['icons-section']}>
        {req.keys().map(iconName => (
          <article key={`icon-${iconName}`}>
            <img src={req(iconName)} alt={req(iconName)} decoding='async' />
            <h6>{iconName.substr(2)}</h6>
          </article>
        ))}
      </section>
    </Fragment>
  )
})
// .add('colors', () => {
//   const { COLORS } = require('../../../common/theme.js')
//   return (
//     <Fragment>
//       <h1 className={styles.h1}>Colors</h1>
//       <section className={styles['colors-section']}>
//         {Object.keys(COLORS).map(color => (
//           <article {...{ className: styles['color-item'], key: `color-${color}` }}>
//             <div style={{ '--color': COLORS[color] }} />
//             <h6>{COLORS[color]}</h6>
//           </article>
//         ))}
//       </section>
//       <h6 className={styles.h6}>Into custom color:</h6>
//       <article {...{ className: styles['color-item'] }}>
//         <div style={{ '--color': color('customColor', 'white') }} />
//       </article>
//     </Fragment>
//   )
// })
