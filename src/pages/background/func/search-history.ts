import type { IMsgReq, TMsgRes, ITableListItem } from '@/types'

const searchHistory = async (
  filterValue: IMsgReq['payload']['filterValue'],
  sendResponse: (res: TMsgRes) => void
) => {
  return await chrome.history
    .search({ text: filterValue!, maxResults: 500, startTime: 0 })
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
}

export { searchHistory }
