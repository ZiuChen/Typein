import { typeinClose } from './typein-close'
import { getCurrentTab } from '@/utils'

const duplicateTab = () => {
  typeinClose()
  getCurrentTab().then((response) => {
    chrome.tabs.duplicate(response.id!)
  })
}

export { duplicateTab }
