import React from 'react'
import ReactSelect from 'react-select'
import { hot } from 'react-hot-loader'
import styles from './index.scss'

function Select({ onChange, className, ...props }) {
  const handleOnChange = value => onChange(value)
  const defaultOptions = []
  return (
    <ReactSelect
      {...{
        name: 'form-field-name',
        className: `${styles['maxwell-select']} ${className}`,
        value: 'Не выбрано',
        placeholder: 'Выбрать',
        options: defaultOptions,
        onChange: handleOnChange,
        ...props,
      }}
    />
  )
}

export default hot(module)(Select)
