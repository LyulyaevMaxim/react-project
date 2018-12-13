import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import loadable from 'loadable-components'
import { loadHelper } from '~utils/loadHelper'

const preloadModules = [
    { name: 'TableLine', module: loadable(() => import('./line')) },
    { name: 'Button', module: loadable(() => import('~modules/button')) },
  ],
  postModules = [{ name: 'styles', module: loadable(() => import('./index.pcss')) }]

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
    loadHelper({ preloadModules, postModules, setState: this.setState.bind(this) })
    this.props.tableDidMount && this.props.tableDidMount()
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
    const { TableLine } = this.state.asyncModules

    if (isTitleLine) return <TableLine {...{ isTitleLine }} />
    if (!isUnsaved && this.props.isLoad !== false) return <div className="loader" />

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
    if (!this.state || this.state.isAsyncModulesLoading !== false)
      return (
        <section>
          <div className="loader" />
        </section>
      )
    const { Button, styles } = this.state.asyncModules
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
              {!!this.props.isSaveRun && <div className="loader" />}
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

const mapDispatchToProps = (dispatch, props) => bindActionCreators(props.tableHandlers, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)
