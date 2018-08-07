function getUserAgentInformation() {
  if (typeof window === 'undefined') return
  const { userAgent, language } = window.navigator
  const browser = require('bowser').getParser(userAgent)

  return {
    browser: browser.getBrowser(),
    os: browser.getOS(),
    platform: browser.getPlatform(),
    //isMobile,
    language,
  }
}

function copyToBuffer({ value }) {
  let tmp = document.createElement('INPUT')
  let focus = document.activeElement
  tmp.value = value
  document.body.appendChild(tmp)
  tmp.select()
  document.execCommand('copy')
  document.body.removeChild(tmp)
  focus.focus()
}

function getIP() {
  return require('public-ip')
    .v4()
    .then(ip => ip)
}

module.exports = {
  getUserAgentInformation,
  copyToBuffer,
  getIP,
}
