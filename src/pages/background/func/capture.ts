import { getCurrentTab } from '@/utils'
import { TMsgRes } from '@/types'

const capture = async (sendResponse: (res: TMsgRes) => void) => {
  // -2: current window
  // sendResponse({
  //   queryValue: '',
  //   list: [
  //     {
  //       name: '扫描结果',
  //       description: '---',
  //       icon: 'icon',
  //       action: 'copy',
  //       data: result
  //     }
  //   ]
  // })
  chrome.tabs.captureVisibleTab(-2, { format: 'png', quality: 100 }, (img_url) => {
    console.log(img_url)
    chrome.downloads.download({ url: img_url, saveAs: true }, (res) => {
      console.log(res)
    })
  })
}

export { capture }
