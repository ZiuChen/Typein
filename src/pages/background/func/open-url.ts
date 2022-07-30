import { typeinClose } from './typein-close'

const openURL = (url: string, options?: any) => {
  typeinClose()
  chrome.tabs.create({ url, ...options })
}

export { openURL }
