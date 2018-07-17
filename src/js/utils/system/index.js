import publicIp from 'public-ip'
import bowser from 'bowser'

export function getUserAgentInformation() {
  const { userAgent, language } = window.navigator
  const browser = bowser.getParser(userAgent)

  return {
    browser: browser.getBrowser(),
    os: browser.getOS(),
    platform: browser.getPlatform(),
    //, isMobile,
    language,
  }
}

export function copyToBuffer({ value }) {
  let tmp = document.createElement('INPUT')
  let focus = document.activeElement
  tmp.value = value
  document.body.appendChild(tmp)
  tmp.select()
  document.execCommand('copy')
  document.body.removeChild(tmp)
  focus.focus()
}

export const getIP = () => publicIp.v4().then(ip => ip)
