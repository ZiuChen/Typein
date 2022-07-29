import { ref } from 'vue'
import { copyText } from '@/utils'
import type { ITableListItem, IMsgReq } from '@/types'

const tableList = ref<ITableListItem[]>()

const initTableList = (list: ITableListItem[] | []) => {
  for (const action of list) {
    /* reset active status  */
    action.isActive = false
  }
  /* activate first action */
  if (list.length === 0) {
    return []
  } else {
    list[0].isActive = true
  }
  return list
}

const getActiveItem = (list: ITableListItem[]) => {
  const item = list.find((item) => item.isActive === true)
  const index = item === undefined ? -1 : list.indexOf(item)
  const length = list.length
  return { item, index, length }
}

const activateItem = (list: ITableListItem[]) => {
  const { item } = getActiveItem(list)
  if (item?.action === 'copy') {
    // 处理action为copy需要使用document对象 特殊处理
    copyText(item.data)
  }
  chrome.runtime.sendMessage({
    type: 'item-activate',
    payload: {
      action: item
    }
  } as IMsgReq)
}

const toggleActiveItem = (list: ITableListItem[], type: 'up' | 'down') => {
  const { item, index, length } = getActiveItem(list)
  if (length === 0) return list
  const isOnly = length === 1
  const isFirst = index === 0
  const isLast = index === length - 1
  if (isOnly) return list
  if (type === 'up') {
    if (isFirst) return list
    else {
      list[index].isActive = false
      list[index - 1].isActive = true
      const activeNode = document.querySelector('.typein-action-active')
      activeNode?.previousElementSibling?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
      return list
    }
  } else {
    if (isLast) return list
    else {
      list[index].isActive = false
      list[index + 1].isActive = true
      document
        .querySelector('.typein-action-active+.typein-action')
        ?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
      return list
    }
  }
}

const handleItemListKeyDown = (ev: KeyboardEvent) => {
  // 在input有焦点的情况下响应键盘事件
  if (tableList.value?.length === 0) return
  const { key } = ev
  const isActivate = key === 'Enter' || key === 'NumpadEnter' // key === 'ArrowRight' ||
  if (isActivate) activateItem(tableList.value!)
  else if (key === 'ArrowUp') toggleActiveItem(tableList.value!, 'up')
  else if (key === 'ArrowDown') toggleActiveItem(tableList.value!, 'down')
  else if (key === 'Escape') console.log('escape') // TODO:
}

const handleTableListMouseOver = (ev: MouseEvent, action: ITableListItem) => {
  // 改变当前isActive的Action
  const { index, length } = getActiveItem(tableList.value!)
  const targetIndex = tableList.value!.indexOf(action)
  if (length > 1) {
    tableList.value![index].isActive = false
    tableList.value![targetIndex].isActive = true
  }
}

const handleItemClick = (ev: MouseEvent) => {
  activateItem(tableList.value!)
}

export {
  tableList,
  handleItemListKeyDown,
  handleTableListMouseOver,
  handleItemClick,
  initTableList
}
