import { calc } from './func'
import type { IMsgReq, TMsgRes, ITableListItem } from '@/types'

chrome.runtime.onMessage.addListener(
  ({ type, payload }: IMsgReq, sender, sendResponse: (res: TMsgRes) => void) => {
    const { action, filterValue } = payload
    if (type === 'action-activate') {
      switch (action.action) {
        case 'caculate':
          const result = calc(filterValue)
          sendResponse({
            queryValue: '',
            list: [
              {
                name: `${filterValue}=${result}`,
                description: '计算结果',
                icon: 'caculate',
                action: 'copy'
              }
            ]
          })
          break
        case 'open-url':
          switch (action.name) {
            case 'Microsoft':
              const url = 'https://edgecontest.microsoft.com/index.html'
              chrome.tabs.create({ url })
              break
          }
          break
        case 'search-query':
          switch (action.name) {
            case 'Bing搜索':
              const url = 'https://www.bing.com/search?q=' + filterValue
              chrome.tabs.create({ url })
              break
          }
          break
        case 'search-bookmark':
          break
        case 'search-history':
          chrome.history.search({ text: filterValue }).then((history) => {
            const list: ITableListItem[] = []
            history.forEach(({ title, url }) => {
              list.push({
                name: title ?? '',
                icon: 'bookmark',
                description: url ?? '',
                action: 'open-url'
              })
            })
            sendResponse({
              list,
              queryValue: ''
            })
          })
          return true
          break
        case 'translate-bing':
          break
      }
    }
  }
)
