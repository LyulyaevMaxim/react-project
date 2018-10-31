import React from 'react'
import ReactSelect from 'react-select'
import styles from './index.pcss'

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

export default Select
