import type { IMsgReq, TMsgRes, ITableListItem } from '@/types'

const searchBookmarks = async (
  filterValue: IMsgReq['payload']['filterValue'],
  sendResponse: (res: TMsgRes) => void
) => {
  return await chrome.bookmarks.search({ query: filterValue }).then((data) => {
    const list: ITableListItem[] = []
    data
      .filter((x) => x.index == 0)
      .forEach((action, index) => {
        if (!action.url) {
          data.splice(index, 1)
        }
      })
    data.forEach(({ title, url }) => {
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

export { searchBookmarks }
