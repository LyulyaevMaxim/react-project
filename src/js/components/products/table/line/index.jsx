import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get, set } from 'lodash'
import produce from 'immer'
import styles from './styles.scss'
import Select from '~modules/select'
import Button from '~modules/button'
import { fetchProducts } from '~store/products/actions'

const {
  productFactory,
  unsavedProductFactory,
  productGroupsGetter,
  paymentTypesGetter,
} = require('~store/products/selectors').default

const className = require('~utils/react').className({ styles })

class ProductsTableLine extends Component {
  static columns = [
    { title: 'Name', type: 'text', path: 'name', defaultValue: '' },
    {
      title: 'Groups',
      type: 'select',
      path: 'product_groups',
      optionsPath: 'productGroups',
      isMulti: true,
      defaultValue: false,
    },
    {
      title: 'Types',
      type: 'select',
      path: 'paymentTypes',
      optionsPath: 'paymentTypes',
      defaultValue: false,
    },
    { title: 'Active', type: 'checkbox', path: 'active', defaultValue: false },
  ]

  constructor(props) {
    super(props)
    if (!props.productId) return
    this.state = { isEdit: props.isUnsaved, isChanged: false, productData: props.productData }
  }

  componentDidUpdate(nextProps) {
    if (this.state.isChanged && nextProps.productData !== this.props.productData)
      this.setState({ isChanged: false, isEdit: false })
  }

  handleCancel = () => this.setState({ productData: this.props.productData, isChanged: false })

  handleEdit = event => {
    event.stopPropagation()
    const { tagName } = event.currentTarget
    this.setState(state => ({ isEdit: tagName === 'ARTICLE' || !state.isEdit }))
  }

  handleText = ({ event, path }) => {
    const { value } = event.target
    this.setState(
      produce(state => {
        set(state.productData, path, value)
        state.isChanged = true
      })
    )
  }

  handleCheckbox = ({ path }) =>
    this.setState(
      produce(state => {
        set(state.productData, path, !get(state.productData, path))
        state.isChanged = true
      })
    )

  handleSelect = ({ option, path, isMulti }) =>
    this.setState(
      produce(state => {
        if (option === null) set(state.productData, path, [])
        set(state.productData, path, option)
        state.isChanged = true
      })
    )

  getColumn({ path, defaultValue, type, optionsPath, isMulti = false }) {
    const { isEdit, productData } = this.state
    const currentValue = get(productData, path)
    switch (type) {
      case 'text': {
        if (!isEdit) return currentValue
        const onChange = event => this.handleText({ event, path })
        return <input {...{ value: currentValue, placeholder: defaultValue, onChange }} />
      }

      case 'checkbox':
        return (
          <input
            {...{
              type: 'checkbox',
              checked: currentValue || defaultValue,
              onChange: event => this.handleCheckbox({ event, path }),
              disabled: !isEdit,
            }}
          />
        )

      case 'select': {
        const { options } = get(this.props, optionsPath)
        if (!isEdit) return !isMulti ? currentValue.label : currentValue.map(el => el.name || el.label).join(', ')
        return (
          <Select
            {...{
              options,
              onChange: option => this.handleSelect({ option, path, isMulti }),
              value: currentValue,
              isMulti,
              isSearchable: true,
            }}
          />
        )
      }

      default:
        throw new Error(`${type} is undefined type for element of column in ProductsTableLine`)
    }
  }

  render() {
    const {
      state,
      props: { isTitleLine, isUnsaved },
    } = this

    if (isTitleLine)
      return (
        <article className={styles.line}>
          {ProductsTableLine.columns.map(({ title }) => (
            <div key={title}>{title}</div>
          ))}
        </article>
      )

    return (
      <article {...{ className: className(['line', isUnsaved && 'is-unsaved']), onClick: this.handleEdit }}>
        {ProductsTableLine.columns.map(column => (
          <div key={`column-${column.title}`}>{this.getColumn(column)}</div>
        ))}
        <div>
          <Button
            {...{
              className: className(['action-button', 'edit-button']),
              onClick: this.handleEdit,
            }}
          />
          <Button
            {...{
              className: className(['action-button', 'cancel-button']),
              onClick: this.handleCancel,
              isDisabled: !state.isChanged,
            }}
          />
        </div>
      </article>
    )
  }
}

const mapStateToProps = (store, { productId, isUnsaved }) => {
  if (!productId) return {}
  const productDataSelector = !isUnsaved ? productFactory() : unsavedProductFactory()
  return (store, props) => ({
    productData: productDataSelector(store, props),
    productGroups: productGroupsGetter(store),
    paymentTypes: paymentTypesGetter(store),
  })
}

const mapDispatchToProps = { fetchProducts }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(ProductsTableLine)
