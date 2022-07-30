import {
  caculate,
  searchBookmarks,
  searchHistory,
  translate,
  muteTab,
  pinTab,
  reloadTab,
  duplicateTab,
  openURL
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
        /* inner action */
        case 'caculate':
          caculate(filterValue, sendResponse)
          break
        case 'translate-google':
          translate(filterValue!, sendResponse)
          return true
        /* new tab related */
        case 'open-url':
          switch (action.name) {
            case 'Microsoft':
              openURL('https://edgecontest.microsoft.com/index.html')
              break
            case 'Photoshop':
              openURL('https://ps.gaoding.com/')
              break
            case 'VideoCutter':
              openURL('https://online-video-cutter.com/cn/')
              break
            case 'AudioEditor':
              openURL('https://www.xaudiopro.com/cn/')
              break
            case 'Apifox':
              openURL('https://www.apifox.cn/web/main')
              break
            case 'Markdown':
              openURL('https://markdown.lovejade.cn/')
              break
            case 'CTool':
              openURL('https://baiy.github.io/Ctool/tool.html')
              break
            case 'Excalidraw':
              openURL('https://excalidraw.com/')
              break
          }
          break
        case 'search-query':
          switch (action.name) {
            case 'Bing搜索':
              openURL('https://www.bing.com/search?q=' + filterValue)
              break
            case 'Google搜索':
              openURL('https://www.google.com.hk/search?q=' + filterValue)
              break
          }
          break
        /* bookmark & history */
        case 'search-bookmark':
          searchBookmarks(filterValue, sendResponse)
          return true
        case 'search-history':
          searchHistory(filterValue, sendResponse)
          return true
        /* tab related */
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
        case 'tab-duplicate':
          duplicateTab()
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
