import { getCurrentTab } from '@/utils'

const muteTab = (muted: boolean) => {
  getCurrentTab().then(async (response) => {
    await chrome.tabs.update(response.id!, { muted })
  })
}

export { muteTab }
