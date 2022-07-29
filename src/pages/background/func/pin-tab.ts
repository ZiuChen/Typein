import { getCurrentTab } from '@/utils'

const pinTab = (pin: boolean) => {
  getCurrentTab().then((response) => {
    chrome.tabs.update(response.id!, { pinned: pin })
  })
}

export { pinTab }
