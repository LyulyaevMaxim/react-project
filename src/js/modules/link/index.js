import React from 'react'

function Link(props) {
  return (
    <a {...{ rel: props.target === '_blank' && 'noreferrer noopener', ...props }}>
      {props.children}
    </a>
  )
}

export default Link
