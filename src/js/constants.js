const isDev = process.env.NODE_ENV === `development`

module.exports = {
  initialPath: '/', //'/custom-path/',
  LOCAL_STORAGE_NAME: 'REACT_PROJECT',
  API_URL: `https://example.server.ru`,
  API_URL_2: `http://111.11.111.111:808${isDev ? '1' : '0'}`,
  REQUEST: '_REQUEST',
  SUCCESS: '_SUCCESS',
  CACHE: '_CACHE',
  FAIL: '_FAIL',
  GET_REQUEST: 'GET_REQUEST',
  POST_REQUEST: 'POST_REQUEST',
  PUT_REQUEST: 'PUT_REQUEST',
  DELETE_REQUEST: 'DELETE_REQUEST',
  USER_AGENT: require('./utils/system').getUserAgentInformation(),
  isDev,
}
