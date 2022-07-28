import { ref, watchEffect } from 'vue'
import { useDefaultActionList } from './useDefaultActionList'
import { tableList, initTableList } from './useItemList'
import type { ITypeInAction, IMsgReq, TMsgRes } from '@/types'

const initActions = (list: ITypeInAction[]) => {
  for (const action of list) {
    /* reset active status  */
    action.isActive = false
    /* sort by weight */
    const { match } = action
    if (match.type === 'over') {
      if (match.value === undefined) {
        action.sortWeight = -1
      } else {
        action.sortWeight = 1
      }
    } else if (match.type === 'regex') {
      action.sortWeight = 0
    }
  }
  list.sort(({ sortWeight: w1 }, { sortWeight: w2 }) => {
    const hasUndefined = w1 === undefined || w2 === undefined
    return hasUndefined ? 0 : w2 - w1
  })
  return list
}

const getActionStore: () => ITypeInAction[] = () => {
  const store = useDefaultActionList()
  return initActions(store)
}

const actionFilter = (val: string, list: ITypeInAction[]) => {
  // filterValue与action.match匹配 筛选action
  const filteredList = list.filter((action) => {
    const { match } = action
    if (match.type === 'over') {
      if (match.value === undefined) {
        return true
      } else if (match.value !== undefined) {
        return match.value.indexOf(val) !== -1
      }
    } else if (match.type === 'regex') {
      return match.value.test(val)
    }
  })
  /* activate first action */
  filteredList[0].isActive = true
  return val === '' ? [] : filteredList
}

const getActiveAction = (list: ITypeInAction[]) => {
  const action = list.find((action) => action.isActive === true)
  const index = action === undefined ? -1 : list.indexOf(action)
  const length = list.length
  return { action, index, length }
}

const toggleActiveAction = (list: ITypeInAction[], type: 'up' | 'down') => {
  const { action, index, length } = getActiveAction(list)
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
      return list
    }
  } else {
    if (isLast) return list
    else {
      list[index].isActive = false
      list[index + 1].isActive = true
      return list
    }
  }
}

const filterValue = ref('')
const actionList = ref<ITypeInAction[]>()

// 每次输入框内的值发生改变, 都会触发此函数, 更新actionList的值
const stopHandler = watchEffect(() => {
  actionList.value = actionFilter(filterValue.value, getActionStore())
  tableList.value = []
})

const activateAction = (list: ITypeInAction[], filterValue: string) => {
  const { action } = getActiveAction(list)
  chrome.runtime
    .sendMessage({
      type: 'action-activate',
      payload: {
        action,
        filterValue
      }
    } as IMsgReq)
    .then((res: TMsgRes) => {
      if (res) {
        tableList.value = initTableList(res.list)
        actionList.value = []
      }
    })
}

const handleActionListKeyDown = (ev: KeyboardEvent) => {
  // 在input有焦点的情况下响应键盘事件
  const { key } = ev
  const isActivate = key === 'Enter' || key === 'NumpadEnter' // key === 'ArrowRight' ||
  if (isActivate) activateAction(actionList.value!, filterValue.value)
  else if (key === 'ArrowUp') toggleActiveAction(actionList.value!, 'up')
  else if (key === 'ArrowDown') toggleActiveAction(actionList.value!, 'down')
  else if (key === 'Escape') filterValue.value = ''
}

const handleActionListMouseOver = (ev: MouseEvent, action: ITypeInAction) => {
  // 改变当前isActive的Action
  const { index, length } = getActiveAction(actionList.value!)
  const targetIndex = actionList.value!.indexOf(action)
  if (length > 1) {
    actionList.value![index].isActive = false
    actionList.value![targetIndex].isActive = true
  }
}

const handleActionClick = (ev: MouseEvent) => {
  activateAction(actionList.value!, filterValue.value)
}

export {
  filterValue,
  actionList,
  tableList,
  handleActionListKeyDown,
  handleActionListMouseOver,
  handleActionClick
}
