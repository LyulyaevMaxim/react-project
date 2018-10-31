import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { requestCreator, GET_REQUEST, POST_REQUEST, DELETE_REQUEST } from '~utils/request-creator'

const getItems = ({ itemId = '' } = {}) => dispatch =>
  requestCreator(dispatch, {
    type: 'ITEMS_GET',
    requestType: GET_REQUEST,
    requestUrl: '/items', // will used API_URL which we set by default in axios
    [itemId && 'sendObject']: { itemId },
  })

const createItem = ({ itemData }) => dispatch =>
  requestCreator(dispatch, {
    type: 'ITEMS_CREATE',
    requestUrl: 'http://localhost:9001/items', // API_URL will replaced to 'http://localhost:9001'
    requestType: POST_REQUEST,
    sendObject: itemData,
    toReducer: { itemData },
    callbacks: {
      successful: () => ({
        /* after a successful creation - redirect to item's list */
      }),
    },
  })

const deleteItem = ({ itemId = '' }) => (dispatch, getState) => {
  if (!get(getState(), `items.data[${itemId}]`)) throw new Error("item don't exist")
  return requestCreator(dispatch, {
    type: 'ITEMS_DELETE',
    requestUrl: 'http://localhost:9001/items',
    requestType: DELETE_REQUEST,
    sendObject: { itemId },
    toReducer: { itemId },
  })
}

@connect(
  state => state,
  { getItems, createItem, deleteItem }
)
class RequestCreatorDemo extends Component {
  render() {
    const { getItems, createItem, deleteItem } = this.props
    return (
      <Fragment>
        <button onClick={getItems}>Get all</button>
        <button onClick={() => getItems({ id: 2 })}>Get with id=2</button>
        <button onClick={() => createItem({ itemData: { name: '1', price: 2 } })}>Create item</button>
        <button onClick={() => deleteItem({ id: 3 })}>Delete with id=3</button>
      </Fragment>
    )
  }
}

export default RequestCreatorDemo
