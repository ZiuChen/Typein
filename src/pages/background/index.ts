import {
  caculate,
  searchBookmarks,
  searchHistory,
  translate,
  muteTab,
  pinTab,
  reloadTab
} from './func'
import { getCurrentTab } from '@/utils'
import type { IMsgReq, TMsgRes, ITableListItem } from '@/types'

chrome.runtime.onMessage.addListener(
  ({ type, payload }: IMsgReq, sender, sendResponse: (res: TMsgRes) => void) => {
    console.log('onMessage: ' + type + JSON.stringify(payload))
    const { action, filterValue } = payload
    if (type === 'action-activate') {
      // from actionList
      switch (action.action) {
        case 'caculate':
          caculate(filterValue, sendResponse)
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
          let url = ''
          switch (action.name) {
            case 'Bing搜索':
              url = 'https://www.bing.com/search?q=' + filterValue
              chrome.tabs.create({ url })
              break
            case 'Google搜索':
              url = 'https://www.google.com.hk/search?q=' + filterValue
              chrome.tabs.create({ url })
              break
          }
          break
        case 'search-bookmark':
          searchBookmarks(filterValue, sendResponse)
          return true
        case 'search-history':
          searchHistory(filterValue, sendResponse)
          return true
        case 'tab-mute':
          muteTab(true)
          return true
        case 'tab-unmute':
          muteTab(false)
          return true
        case 'tab-pin':
          pinTab(true)
          return true
        case 'tab-unpin':
          pinTab(false)
          return true
        case 'tab-reload':
          reloadTab()
          return true
        case 'translate-google':
          translate(filterValue!, sendResponse)
          return true
      }
    } else {
      // from tableList
      const { action: aName, data } = action as unknown as ITableListItem
      switch (aName) {
        case 'copy':
          getCurrentTab().then((response: any) => {
            chrome.tabs.sendMessage(response.id, { request: 'close-typein' })
          })
          // TODO: add optional setting to this
          // chrome.notifications.create('', {
          //   type: 'basic',
          //   title: 'TypeIn',
          //   message: '已复制到剪切板',
          //   iconUrl: chrome.runtime.getURL('static/img/icon.png')
          // })
          break
        case 'open-url':
          chrome.tabs.create({ url: data })
          break
      }
    }
  }
)

chrome.commands.onCommand.addListener((command) => {
  console.log('onCommand: ' + command)
  if (command === 'open-typein') {
    getCurrentTab().then((response: any) => {
      if (!response.url.includes('chrome://') && !response.url.includes('chrome.google.com')) {
        chrome.tabs.sendMessage(response.id, { request: 'open-typein' })
      } else {
        chrome.tabs.create({
          url: './newtab.html'
        })
      }
    })
  }
})
