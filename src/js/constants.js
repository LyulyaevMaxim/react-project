const isDevelopment = process.env.NODE_ENV === `development`,
  isTest = process.env.NODE_ENV === 'test',
  isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  initialPath: '/',
  LOCAL_STORAGE_NAME: 'REACT_PROJECT',
  API_URL: `https://example.server.ru`,
  API_URL_2: `http://111.11.111.111:808${isDevelopment ? '1' : '0'}`,
  USER_AGENT: !isTest && require('./utils/system').getUserAgentInformation(),
  SCROLL_WIDTH: require('./utils/system').getScrollWidth(),
  defaultLanguage: 'en',
  isDevelopment,
  isTest,
  isProduction,
}
