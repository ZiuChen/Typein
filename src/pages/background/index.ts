import { calc } from '@/utils'
import type { IMsgReq, TMsgRes, ITableListItem } from '@/types'

chrome.runtime.onMessage.addListener(
  ({ type, payload }: IMsgReq, sender, sendResponse: (res: TMsgRes) => void) => {
    const { action, filterValue } = payload
    if (type === 'action-activate') {
      // from actionList
      switch (action.action) {
        case 'caculate':
          const result = calc(filterValue!)
          sendResponse({
            queryValue: '',
            list: [
              {
                name: `${filterValue}=${result}`,
                description: '计算结果',
                icon: 'caculate',
                action: 'copy',
                data: result
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
          chrome.history
            .search({ text: filterValue!, maxResults: 0, startTime: 0 })
            .then((history) => {
              const list: ITableListItem[] = []
              history.forEach(({ title, url }) => {
                list.push({
                  name: title ?? '',
                  icon: 'bookmark',
                  description: url ?? '',
                  action: 'open-url',
                  data: url
                })
              })
              sendResponse({
                list,
                queryValue: ''
              })
            })
          return true
        case 'translate-bing':
          break
      }
    } else {
      // from tableList
      const { action: aName, data } = action as unknown as ITableListItem
      switch (aName) {
        // case 'copy':
        //   copyText(data)
        //   break
        case 'open-url':
          chrome.tabs.create({ url: data })
          break
      }
    }
  }
)
