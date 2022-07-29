import { typeinClose } from './typein-close'

const reloadTab = () => {
  typeinClose()
  chrome.tabs.reload()
}

export { reloadTab }
