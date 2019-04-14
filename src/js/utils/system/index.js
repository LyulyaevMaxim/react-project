function getUserAgentInformation() {
  if (typeof window !== 'undefined') {
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
}

function copyToBuffer({ value }) {
  const temporary = document.createElement('INPUT')
  const focus = document.activeElement
  temporary.value = value
  document.body.append(temporary)
  temporary.select()
  document.execCommand('copy')
  document.body.removeChild(temporary)
  focus.focus()
}

function getIP() {
  return require('public-ip')
    .v4()
    .then(ip => ip)
}

function getScrollWidth() {
  if (typeof window !== 'undefined') {
    const outer = document.createElement('div')
    const inner = document.createElement('div')
    outer.style.overflow = 'scroll'
    document.body.append(outer)
    outer.append(inner)
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
    document.body.removeChild(outer)
    return scrollbarWidth
  }
}

module.exports = {
  getUserAgentInformation,
  copyToBuffer,
  getIP,
  getScrollWidth,
}
