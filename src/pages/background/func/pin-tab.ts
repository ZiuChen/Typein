import { getCurrentTab } from '@/utils'
import { typeinClose } from './typein-close'

const pinTab = (pin: boolean) => {
  typeinClose()
  getCurrentTab().then((response) => {
    chrome.tabs.update(response.id!, { pinned: pin })
  })
}

export { pinTab }
