import React, { Component, Fragment } from 'react'

class SwitchableBlock extends Component {
  state = { imgPatch: '' }

  async componentDidMount() {
    const { img } = this.props
    if (img.length) {
      const imgPatch = await (() => import(`~img/${img}`))()
      this.setState({ imgPatch })
    }
  }

  render() {
    const { title, description, img, other } = this.props
    const { imgPatch } = this.state
    return (
      <Fragment>
        {!!img.length && (
          <img
            alt=''
            className={`switchable-block-img ${!!imgPatch.length && 'loading'}`}
            src={imgPatch}
          />
        )}
        <switchable-block-text>
          <switchable-block-title>{title}</switchable-block-title>
          <switchable-block-description>{description}</switchable-block-description>
          {other}
        </switchable-block-text>
      </Fragment>
    )
  }
}

export default SwitchableBlock
