import React, { Component } from 'react'
import loadable from 'loadable-components'
import { loadHelper } from '~utils/loadHelper'

const preloadModules = [{ name: 'styles', module: loadable(() => import('./index.pcss')) }],
  postModules = [
    { name: 'Input', module: loadable(() => import('~modules/input')) },
    { name: 'Textarea', module: loadable(() => import('~modules/textarea')) },
  ]

class FormDemo extends Component {
  state = { textareaValue: '', customInput: '', toSendTextArea: '' }

  componentDidMount() {
    loadHelper({ preloadModules, postModules, setState: this.setState.bind(this) })
  }

  handleChange = ({ field, value }) => this.setState({ [field]: value })

  handleKeyPressTextArea = ({ value, event }) => {
    if (event.key === 'Enter' && !event.shiftKey && value !== '') {
      event.preventDefault()
      // event.target.value = ''
      this.setState({ toSendTextArea: value })
    }
  }

  render() {
    if (this.state.isAsyncModulesLoading !== false) return <main />
    const { textareaValue, customInput, toSendTextArea } = this.state
    const { Input, Textarea, styles } = this.state.asyncModules

    return (
      <main>
        <form className={styles.form}>
          <Input
            placeholder="Иванов Иван Иванович"
            pattern="[A-zА-я]{2,}[\ ][A-zА-я]{2,}[\ ][A-zА-я]{2,}"
            settings="isLetter"
            required
          />
          <Input type="email" placeholder="ivanovii@mail.ru" pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$" />
          <Input placeholder="8 900 000 0000" pattern="\d{1}[\ ]\d{3}[\ ]\d{3}[\ ]\d{4}" settings="isPhone" required />
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
              getValue={({ value }) => this.handleChange({ field: 'customInput', value })}
              onChange={this.handleInputChange}
            />
            <p>Значение: {customInput}</p>
          </div>

          <div>
            <Textarea
              {...{
                getValue: ({ value }) => this.handleChange({ field: 'textareaValue', value }),
                placeholder: 'Растягивающийся textarea',
                onKeyPress: this.handleKeyPressTextArea,
                className: styles['custom-textarea'],
              }}
            />
            <p>Значение, введённое в textarea:</p>
            <p>{textareaValue || 'Пусто'}</p>
            <p>Значение, отправленное из textarea:</p>
            <p>{toSendTextArea || 'Пусто'}</p>
          </div>
        </form>
      </main>
    )
  }
}

export default FormDemo
