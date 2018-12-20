import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import styles from './index.pcss'

class Textarea extends React.Component {
  static defaultProps = { className: '' }

  handleFocusOut = event => {
    event.preventDefault()
    this.props.getValue({ value: event.target.value })
  }

  handleKeyPress = event => {
    const { value } = event.target
    if (event.key === 'Enter' && !event.shiftKey && value !== '') {
      event.preventDefault()
      this.props.getValue({ value })
    }
  }

  render() {
    const { getValue, className, ...otherProps } = this.props
    return (
      <div {...{ className: `${styles['maxwell-textarea-container']} ${className}` }}>
        <TextareaAutosize
          {...{
            className: styles['maxwell-textarea'],
            placeholder: '',
            defaultValue: '',
            rows: 3,
            maxRows: 10,
            onBlur: this.handleFocusOut,
            onKeyPress: this.handleKeyPress,
            ...otherProps,
          }}
        />
      </div>
    )
  }
}

export default Textarea
