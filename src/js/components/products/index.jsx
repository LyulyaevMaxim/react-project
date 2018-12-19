import React, { Component } from 'react'
import * as selectors from '~store/products/selectors'
import * as actions from '~store/products/actions'
import loadable from 'loadable-components'
import { loadHelper } from '~utils/loadHelper'

const preloadModules = [{ name: 'Table', module: loadable(() => import('~modules/table')) }],
  postModules = [{ name: 'styles', module: loadable(() => import('./index.pcss')) }]

class ProductsPage extends Component {
  componentDidMount() {
    loadHelper({ preloadModules, postModules, setState: this.setState.bind(this) })
  }

  render() {
    if (!this.state || this.state.isAsyncModulesLoading !== false)
      return (
        <main>
          <div className="loader" />
        </main>
      )
    const { Table, styles } = this.state.asyncModules
    return (
      <main className={styles['products-container']}>
        <Table
          {...{
            tableSelectors: {
              isLoad: selectors.isLoadProducts,
              isSaveRun: selectors.isSaveRun,
              linesList: selectors.productsListGetter,
              unsavedLinesList: selectors.unsavedProductsListGetter,
            },
            tableHandlers: {
              handleLineAdd: actions.addProduct,
              handleTableSave: actions.saveProducts,
              tableDidMount: () => dispatch => {
                actions.fetchProducts(dispatch)
                actions.fetchProductGroups(dispatch)
                actions.fetchPaymentTypes(dispatch)
              },
              tableUpdate: actions.updateProducts,
            },
            lineSelectors: {
              dataFactory: selectors.productFactory,
              unsavedDataFactory: selectors.unsavedProductFactory,
              paymentTypes: selectors.paymentTypesGetter,
              productGroups: selectors.productGroupsGetter,
            },
            lineHandlers: {
              handleLineDelete: actions.deleteProduct,
            },
            renders: {
              renderFilters: () => <table-filters>Filters</table-filters>,
            },
            tableColumns: [
              { title: '', type: 'img', path: 'picture', defaultValue: '' },
              { title: 'Name', type: 'text', path: 'name', defaultValue: '' },
              {
                title: 'Groups',
                type: 'select',
                path: 'productGroups',
                optionsPath: 'productGroups',
                isMulti: true,
                defaultValue: [],
              },
              {
                title: 'Types',
                type: 'select',
                path: 'paymentTypes',
                optionsPath: 'paymentTypes',
                defaultValue: [],
              },
              { title: 'Active', type: 'checkbox', path: 'active', defaultValue: false },
            ],
            styles: {
              lineClass: styles.line,
            },
          }}
        />
      </main>
    )
  }
}
export default ProductsPage
