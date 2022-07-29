import { getCurrentTab } from '@/utils'
import { typeinClose } from './typein-close'

const muteTab = (muted: boolean) => {
  typeinClose()
  getCurrentTab().then(async (response) => {
    await chrome.tabs.update(response.id!, { muted })
  })
}

export { muteTab }
