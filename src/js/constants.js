const isDev = process.env.NODE_ENV === `development`,
  isTest = process.env.NODE_ENV === 'test'

module.exports = {
  initialPath: '/',
  LOCAL_STORAGE_NAME: 'REACT_PROJECT',
  API_URL: `https://example.server.ru`,
  API_URL_2: `http://111.11.111.111:808${isDev ? '1' : '0'}`,
  USER_AGENT: !isTest && require('./utils/system').getUserAgentInformation(),
  SCROLL_WIDTH: require('./utils/system').getScrollWidth(),
  defaultLanguage: 'en',
  isDev,
  isTest,
}
