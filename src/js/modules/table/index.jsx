import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import loadable from 'react-loadable'
import styles from './index.pcss'

const TableLine = loadable({
    loader: () => import('./line' /* webpackChunkName: "modules->table->line" */),
    loading: () => null,
  }),
  Button = loadable({
    loader: () => import('~modules/button' /* webpackChunkName: "modules->button" */),
    loading: () => null,
  })

export const { Provider: LineProvider, Consumer: LineConsumer } = React.createContext({
  tableColumns: [],
  lineSelectors: {},
  lineHandlers: {},
  lineClass: '',
})

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.linesMap = {}
    this.unsavedLinesMap = {}
    this.state = { hasError: false /*page: 1, pageSize: 50*/ }
  }

  componentDidMount() {
    const { tableDidMount } = this.props
    tableDidMount && tableDidMount()
  }

  componentDidUpdate(prevProps) {
    const { isSaveRun, linesList, unsavedLinesList } = this.props
    if (prevProps.isSaveRun !== this.props.isSaveRun && isSaveRun) {
      this.props.tableUpdate &&
        this.props.tableUpdate({
          updated: linesList.reduce((acc, id) => {
            const { isChanged, data } = this.linesMap[id].current.getWrappedInstance().state
            return isChanged ? [...acc, data] : acc
          }, []),
          created: unsavedLinesList.map(id => this.unsavedLinesMap[id].current.getWrappedInstance().state.data),
        })
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  getLines({ isUnsaved = false, isTitleLine = false } = {}) {
    if (isTitleLine) return <TableLine {...{ isTitleLine }} />
    if (!isUnsaved && this.props.isLoad !== false) return <div className='loader' />

    const [list, refsMap] = !isUnsaved
      ? [this.props.linesList, this.linesMap]
      : [this.props.unsavedLinesList, this.unsavedLinesMap]

    return list.map(id => {
      if (!refsMap[id]) refsMap[id] = React.createRef()
      return (
        <TableLine
          {...{
            id,
            ref: refsMap[id],
            isUnsaved,
            key: `product-${id}`,
          }}
        />
      )
    })
  }

  render() {
    const { handleLineAdd, handleTableSave } = this.props
    const { renderFilters } = this.props.renders
    return (
      <section className={styles['table-container']}>
        <header>
          {renderFilters && renderFilters()}
          {handleLineAdd && <Button onClick={handleLineAdd}>Add</Button>}
          {handleTableSave && (
            <Button onClick={handleTableSave}>
              <span>Save</span>
              {!!this.props.isSaveRun && <div className='loader' />}
            </Button>
          )}
        </header>

        <main>
          <LineProvider
            value={{
              tableColumns: this.props.tableColumns,
              lineSelectors: this.props.lineSelectors,
              lineHandlers: this.props.lineHandlers,
              lineClass: this.props.styles.lineClass,
            }}
          >
            {this.getLines({ isTitleLine: true })}
            {!this.state.hasError ? (
              <React.Fragment>
                {this.getLines({ isUnsaved: true })}
                {this.getLines()}
              </React.Fragment>
            ) : (
              <h2>An error has occurred</h2>
            )}
          </LineProvider>
        </main>
      </section>
    )
  }
}

const mapStateToProps = (store, props) => {
  const tableSelectors = props.tableSelectors || {}
  ;['isLoad', 'isSaveRun', 'linesList', 'unsavedLinesList'].forEach(selector => {
    if (typeof tableSelectors[selector] !== 'function') throw new Error(`Selector ${selector} is required`)
  })
  return {
    isLoad: tableSelectors.isLoad(store, props),
    isSaveRun: tableSelectors.isSaveRun(store, props),
    linesList: tableSelectors.linesList(store, props),
    unsavedLinesList: tableSelectors.unsavedLinesList(store, props),
  }
}

const mapDispatchToProps = (dispatch, { tableDidMount, ...props }) =>
  bindActionCreators({ tableDidMount, ...props.tableHandlers }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)
