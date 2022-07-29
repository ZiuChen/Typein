import { getCurrentTab } from '@/utils'
import { TMsgRes } from '@/types'

const capture = async () => {
  // -2: current window
  return chrome.tabs.captureVisibleTab(-2, { format: 'png', quality: 100 }, (img_url) => {
    console.log(img_url)
    chrome.downloads.download({ url: img_url, saveAs: true }, (res) => {
      console.log(res)
    })
  })
}

export { capture }
