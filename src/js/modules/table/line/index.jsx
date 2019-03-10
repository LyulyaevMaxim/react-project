import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { get, set } from 'lodash-es'
import produce from 'immer'
import loadable from 'react-loadable'
import { LineConsumer } from '../index'
import styles from './index.pcss'

const Select = loadable({
    loader: () => import('~modules/select' /* webpackChunkName: "modules->select" */),
    loading: () => null,
  }),
  Button = loadable({
    loader: () => import('~modules/button' /* webpackChunkName: "modules->button" */),
    loading: () => null,
  }),
  LazyImage = loadable({
    loader: () => import('~modules/lazyImage' /* webpackChunkName: "modules->lazyImage" */),
    loading: () => null,
  })

const className = require('~utils/react').className({ styles })

const mapStateToProps = (_, props) => {
  if (props.isTitleLine) return {}
  ;['dataFactory', 'unsavedDataFactory'].forEach(selector => {
    if (typeof props.lineSelectors[selector] !== 'function') throw new Error(`Selector ${selector} is required`)
  })
  const { lineSelectors: { dataFactory, unsavedDataFactory, ...lineSelectors } = {}, isUnsaved, id } = props
  const dataSelector = !isUnsaved ? dataFactory() : unsavedDataFactory()
  return store => ({
    data: dataSelector(store, { id }),
    ...Object.keys(lineSelectors).reduce(
      (acc, selectorName) => ({ ...acc, [selectorName]: lineSelectors[selectorName](_, props) }),
      {}
    ),
  })
}
const mapDispatchToProps = (dispatch, props) =>
  props.isTitleLine ? {} : bindActionCreators(props.lineHandlers, dispatch)

@connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)
class TableLine extends React.Component {
  constructor(props) {
    super(props)
    if (props.isTitleLine) return
    this.state = {
      isEdit: props.isUnsaved,
      isChanged: false,
      data: props.data,
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.state && !this.state.isEdit && this.props.isSaved !== nextProps.isSaved) return null
    return true
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isSaved && this.props.isSaved) {
      this.setState({ isChanged: false, isEdit: false })
    }
  }

  handleEdit = event => {
    event.stopPropagation()
    if (!this.state.isEdit && event.currentTarget.tagName === 'ARTICLE') {
      this.setState({ isEdit: true })
    } else if (!this.state.isChanged && event.target.tagName === 'ARTICLE') {
      this.setState({ isEdit: false })
    }
  }

  handleCancel = event => {
    event.stopPropagation()
    this.setState({ data: this.props.data, isChanged: false, isEdit: false })
  }

  handleDelete = () => this.props.handleLineDelete({ id: this.props.id, isUnsaved: this.props.isUnsaved })

  setStateProxy = func => this.setState(produce(func))

  handleText = ({ event, path }) => {
    const { value } = event.target
    this.setStateProxy(state => {
      set(state.data, `${path}.value`, value)
      state.isChanged = true
    })
  }

  handleCheckbox = ({ path }) =>
    this.setStateProxy(state => {
      set(state.data, `${path}.value`, !get(state.data, `${path}.value`))
      state.isChanged = true
    })

  handleSelect = ({ option, path, isMulti }) =>
    this.setStateProxy(state => {
      if (option === null) set(state.data, `${path}.value`, [])
      set(state.data, `${path}.value`, !isMulti ? [option.value] : option.map(({ value }) => value))
      state.isChanged = true
    })

  getColumn({ path, defaultValue, type, optionsPath, isMulti = false, isClearable = false, dateSettings }) {
    const { isEdit, data } = this.state,
      columnValue = get(data, `${path}.value`, defaultValue),
      isReadOnly = get(data, `${path}.readonly`)

    switch (type) {
      case 'text': {
        if (isReadOnly || !isEdit) return columnValue
        const onChange = event => this.handleText({ event, path })
        return <input {...{ value: columnValue, onChange }} />
      }

      case 'img': {
        if (!columnValue) return null
        return (
          <LazyImage
            {...{
              src: columnValue.src || columnValue,
              placeholder: columnValue.preview,
              sizes: columnValue.dimensions,
            }}
          />
        )
      }

      case 'checkbox':
        return (
          <input
            {...{
              type: 'checkbox',
              checked: columnValue || defaultValue,
              onChange: event => this.handleCheckbox({ event, path }),
              disabled: isReadOnly || !isEdit,
            }}
          />
        )

      case 'select': {
        const { options, optionsMap } = get(this.props, optionsPath),
          labels = columnValue.map(optionId => optionsMap[optionId])
        if (isReadOnly || !isEdit) return !isMulti ? labels : labels.join(', ')
        return (
          <Select
            {...{
              options,
              onChange: option => this.handleSelect({ option, path, isMulti }),
              value: columnValue.map(optionId => ({ value: optionId, label: optionsMap[optionId] })),
              isMulti,
              isSearchable: true,
            }}
          />
        )
      }

      /*case 'date': {
        if (isReadOnly || !isEdit) return columnValue
        return (
          <DatePicker
            {...{
              currentValue: columnValue,
              pathForChange: path,
              dateSettings,
              onChange: this.handleDate,
              dataForValidation: data,
            }}
          />
        )
      }*/

      default:
        throw new Error(`${type} is undefined type for element of column in TableLine`)
    }
  }

  renderErrors() {
    const { errors = [] } = this.props.data
    if (!errors.length) return null

    /*return (
      <ErrorsSection>
        {errors.map(({ field, value }) => (
          <article key={field}>
            <h6>{field}:</h6>
            <span>{value}</span>
          </article>
        ))}
      </ErrorsSection>
    )*/
  }

  render() {
    const { isTitleLine, isUnsaved, tableColumns = [], lineClass } = this.props
    if (isTitleLine)
      return (
        <article className={className(['line', lineClass])}>
          {tableColumns.map(({ title }) => (
            <div key={title}>{title}</div>
          ))}
        </article>
      )

    return (
      <React.Fragment>
        {this.renderErrors()}
        <article
          className={className(['line', isUnsaved && 'is-unsaved', this.state.isChanged && 'is-changed', lineClass])}
          onClick={this.handleEdit}
        >
          {tableColumns.map(column => (
            <div key={`column-${column.title}`}>{this.getColumn(column)}</div>
          ))}
          <div>
            <Button
              className={className(['action-button', 'cancel-button'])}
              onClick={this.handleCancel}
              isDisabled={!this.state.isChanged}
            />
            <Button className={className(['action-button', 'delete-button'])} onClick={this.handleDelete} />
          </div>
        </article>
      </React.Fragment>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <LineConsumer>{lineContext => <TableLine {...{ ...props, ...lineContext, ref }} />}</LineConsumer>
))
