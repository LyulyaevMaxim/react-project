import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import './index.pcss'

class Switches extends Component {
  static propTypes = {
    calcMinHeight: PropTypes.bool,
  }

  state = {
    activeIndex: 0,
  }

  handleSwitch = ({ index }) => this.setState({ activeIndex: index })

  componentDidMount() {
    if (this.props.calcMinHeight) {
      /*const all = this.equipmentBlocks.querySelectorAll('switchable-block')
			let maxHeight = 0
			all.forEach(({ scrollHeight }) => {
				if (scrollHeight > maxHeight) maxHeight = scrollHeight
			})
			this.equipmentBlocks.style.minHeight = `${maxHeight}px`*/
    }
  }

  render() {
    const { data, className } = this.props
    const { activeIndex } = this.state
    const switches = data.map(({ title }, index) => {
      const handleClick = () => this.handleSwitch({ index })
      return (
        <label
          key={`equipment-${index}`}
          htmlFor={`equipment-${index}`}
          onClick={handleClick}
          styleName={activeIndex === index ? 'active' : ''}
        >
          {title}
        </label>
      )
    })

    return (
      <switches-container styleName={className}>
        <switches-content>
          <aside>{switches}</aside>
          <section ref={e => (this.equipmentBlocks = e)}>
            {data.map(({ content, className }, index) => (
              <Fragment key={`equipment-${index}`}>
                {switches[index]}
                <input defaultChecked={!index} id={`equipment-${index}`} name='equipment' type='radio' />
                <switchable-block class={className}>{content}</switchable-block>
              </Fragment>
            ))}
          </section>
        </switches-content>
      </switches-container>
    )
  }
}

export default Switches
