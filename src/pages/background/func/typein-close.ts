import { getCurrentTab } from '@/utils'

const typeinClose = () => {
  getCurrentTab().then((response: any) => {
    chrome.tabs.sendMessage(response.id, { request: 'open-typein' })
  })
}

export { typeinClose }
