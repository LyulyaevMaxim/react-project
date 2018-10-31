import React, { Component, Fragment, createRef } from 'react'
import { connect } from 'react-redux'
import styles from './styles.pcss'
import ProductTableLine from './line'
import Button from '~modules/button'
import {
  fetchProducts,
  addProduct,
  saveProducts,
  createProducts,
  updateProducts,
  fetchProductGroups,
} from '~store/products/actions'

const { productsListGetter, unsavedProductsListGetter } = require('~store/products/selectors').default

class ProductsTable extends Component {
  constructor(props) {
    super(props)
    this.productsMap = {}
    this.unsavedProductsMap = {}
    this.state = { isError: false }
  }

  componentDidMount() {
    this.props.fetchProducts()
    this.props.fetchProductGroups()
  }

  componentDidUpdate() {
    const { isSaveRun, productsList, unsavedProductsList } = this.props
    if (isSaveRun) {
      this.props.updateProducts({
        productsData: productsList.reduce((acc, productId) => {
          const { isChanged, productData } = this.productsMap[productId].current.getWrappedInstance().state
          return isChanged ? [...acc, productData] : acc
        }, []),
      })
      this.props.createProducts({
        productsData: unsavedProductsList.map(
          productId => this.unsavedProductsMap[productId].current.getWrappedInstance().state.productData
        ),
      })
    }
  }

  componentDidCatch() {
    this.setState({ isError: true })
  }

  getProducts({ isUnsaved = false } = {}) {
    if (!isUnsaved && this.props.isLoadProducts) return <div className="loader" />
    const [list, refsMap] = !isUnsaved
      ? [this.props.productsList, this.productsMap]
      : [this.props.unsavedProductsList, this.unsavedProductsMap]
    return list.map(productId => {
      if (!refsMap[productId]) refsMap[productId] = createRef()
      return (
        <ProductTableLine
          {...{
            productId,
            isUnsaved,
            ref: refsMap[productId],
            key: `product-${productId}`,
          }}
        />
      )
    })
  }

  handleAdd = () => this.props.addProduct()

  handleSave = () => this.props.saveProducts()

  render() {
    return (
      <section className={styles['table-container']}>
        <header>
          <Button onClick={this.handleAdd}>Add New Product</Button>
          <Button onClick={this.handleSave}>
            Save
            {!!this.props.isSaveRun && ' Run'}
          </Button>
        </header>

        <main>
          <ProductTableLine isTitleLine />
          {!this.state.isError ? (
            <Fragment>
              {this.getProducts()}
              {this.getProducts({ isUnsaved: true })}
            </Fragment>
          ) : (
            <h2>An error has occurred</h2>
          )}
        </main>
      </section>
    )
  }
}

const mapStateToProps = store => ({
  isLoadProducts: store.products.isLoadProducts,
  isSaveRun: store.products.isSaveRun,
  productsList: productsListGetter(store),
  unsavedProductsList: unsavedProductsListGetter(store),
})

const mapDispatchToProps = {
  fetchProducts,
  addProduct,
  saveProducts,
  createProducts,
  updateProducts,
  fetchProductGroups,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsTable)
