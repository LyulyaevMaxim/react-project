# Request creator

### Usage

`import {requestCreator, GET_REQUEST, POST_REQUEST, PUT_REQUEST, DELETE_REQUEST, REQUEST, SUCCESS, FAIL} from 'components/button';`

### Properties

- **type** - action type, e.g. _GET_ITEMS_
- **requestType** - one of _\*\_REQUEST_ constants
- **sendObject** - this will be sent to the server
- **meta** - this will be additional sent to the reducer
- **callbacks** - successful and unfortunate callbacks after completion of the function
- **resultField** - field with valuable content from server's answer
- **headers** - custom settings

| propName    | propType | defaultValue | isRequired |
| ----------- | -------- | ------------ | ---------- |
| type        | string   | -            | +          |
| requestType | string   | -            | +          |
| sendObject  | object   | -            | -          |
| meta        | object   | -            | -          |
| callbacks   | object   | {}           | -          |
| resultField | string   | data         | -          |
| headers     | object   | {}           | -          |

### Examples

#### Get items or item

`import {requestCreator, GET_REQUEST} from '**/requestCreator';`

`import {API_URL_2} from '**/global_constants';`

`import {ITEMS_GET} from './constants';`

`export const getItem = ({ itemId = '' } = {}) => (dispatch, getState) => requestCreator(dispatch, { type: ITEMS_GET, requestType: GET_REQUEST, requestUrl: 'API_URL_2/items', [itemId && 'sendObject']: { itemId }, })`
