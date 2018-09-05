import React, { Component } from 'react'
import loadable from 'loadable-components'
import styles from './index.scss'

const Input = loadable(() => import('~modules/input'))
const Textarea = loadable(() => import('~modules/textarea'))

class FormDemo extends Component {
  state = { textareaValue: '', customInput: '', toSendTextArea: '' }

  handleChange = ({ field, value }) => {
    this.setState({ [field]: value })
  }

  handleKeyPressTextArea = ({ value, event }) => {
    if (event.key === 'Enter' && !event.shiftKey && value !== '') {
      event.preventDefault()
      event.target.value = ''
      this.setState({ toSendTextArea: value })
    }
  }

  render() {
    const { textareaValue, customInput, toSendTextArea } = this.state
    const customInputHandle = ({ value }) => {
      this.handleChange({ field: 'customInput', value })
    }
    const textareaHandle = ({ value }) => {
      this.handleChange({ field: 'textareaValue', value })
    }

    return (
      <form className={styles.form}>
        <Input
          placeholder="Иванов Иван Иванович"
          pattern="[A-zА-я]{2,}[\ ][A-zА-я]{2,}[\ ][A-zА-я]{2,}"
          settings="isLetter"
          required
        />
        <Input
          type="email"
          placeholder="ivanovii@mail.ru"
          pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
        />
        <Input
          placeholder="8 900 000 0000"
          pattern="\d{1}[\ ]\d{3}[\ ]\d{3}[\ ]\d{4}"
          settings="isPhone"
          // data-settings={JSON.stringify({ isPhone: true })}
          required
        />
        <Input placeholder="5200 0000 000" pattern="\d{4}[\ ]\d{4}[\ ]\d{3}" settings="isInn" />
        <Input
          placeholder="ivanovivan.ru"
          pattern="^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$"
        />
        <Input placeholder="Любое число" pattern="\d{1,}" settings="isNumbers" />
        <Input placeholder="Любой текст" />

        <div>
          <Input
            pattern="\d{1,}"
            settings="isNumbers"
            placeholder="Отправляем число наружу"
            getValue={customInputHandle}
            onChange={this.handleInputChange}
          />
          <p>Значение input'a: {customInput}</p>
        </div>

        <div>
          <Textarea
            {...{
              getValue: textareaHandle,
              placeholder: 'Растягивающийся textarea',
              onKeyPress: this.handleKeyPressTextArea,
              className: styles['custom-textarea'],
            }}
          />
          <p>Значение, введённое в textarea:</p>
          <p>{!!textareaValue ? textareaValue : 'Пусто'}</p>
          <p>Значение, отправленное из textarea:</p>
          <p>{!!toSendTextArea ? toSendTextArea : 'Пусто'}</p>
        </div>
      </form>
    )
  }
}

export default FormDemo
