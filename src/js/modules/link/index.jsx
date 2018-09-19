import React from 'react'

function Link({ target, children }) {
  return <a {...{ rel: target === '_blank' && 'noreferrer noopener', ...arguments }}>{children}</a>
}

export default Link
