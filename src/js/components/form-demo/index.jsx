import React, { Component } from 'react'
import Loadable from 'react-loadable'
import styles from './index.pcss'

const Input = Loadable({
    loader: () => import('~modules/input' /* webpackChunkName: "modules->input" */),
    loading: () => null,
  }),
  Textarea = Loadable({
    loader: () => import('~modules/textarea' /* webpackChunkName: "modules->textarea" */),
    loading: () => null,
  })

class FormDemo extends Component {
  state = { textareaValue: '', customInput: '', toSendTextArea: '' }

  handleChange = ({ field, value }) => this.setState({ [field]: value })

  render() {
    const { textareaValue, customInput, toSendTextArea } = this.state

    return (
      <main>
        <form className={styles.form}>
          <Input
            pattern="[A-zА-я]{2,}[\ ][A-zА-я]{2,}[\ ][A-zА-я]{2,}"
            placeholder="Иванов Иван Иванович"
            required
            settings="isLetter"
          />
          <Input pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$" placeholder="ivanovii@mail.ru" type="email" />
          <Input pattern="\d{1}[\ ]\d{3}[\ ]\d{3}[\ ]\d{4}" placeholder="8 900 000 0000" required settings="isPhone" />
          <Input pattern="\d{4}[\ ]\d{4}[\ ]\d{3}" placeholder="5200 0000 000" settings="isInn" />
          <Input
            pattern="^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$"
            placeholder="ivanovivan.ru"
          />
          <Input pattern="\d{1,}" placeholder="Любое число" settings="isNumbers" />
          <Input placeholder="Любой текст" />

          <div>
            <Input
              getValue={({ value }) => this.handleChange({ field: 'customInput', value })}
              pattern="\d{1,}"
              placeholder="Отправляем число наружу"
              settings="isNumbers"
            />
            <p>Значение: {customInput}</p>
          </div>

          <div>
            <Textarea
              {...{
                getValue: ({ value }) => this.handleChange({ field: 'textareaValue', value }),
                placeholder: 'Растягивающийся textarea',
                className: styles.customTextarea,
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
