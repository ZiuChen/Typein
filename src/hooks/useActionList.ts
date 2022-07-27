import { ref, watchEffect } from 'vue'
import type { ITypeInAction } from '@/types'

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
  const store: ITypeInAction[] = [
    {
      name: 'Microsoft',
      match: { type: 'over', value: 'ms' },
      icon: 'icon',
      description: '打开Microsoft Edge 浏览器开拓者大赛官网'
    },
    {
      name: '搜索历史记录',
      match: { type: 'over' },
      icon: 'icon',
      description: '在浏览器历史记录中搜索'
    },
    {
      name: '搜索书签',
      match: { type: 'over' },
      icon: 'icon',
      description: '在浏览器书签中搜索'
    },
    {
      name: '翻译',
      match: { type: 'over' },
      icon: 'icon',
      description: '使用Bing Micosoft Translator翻译'
    },
    {
      name: '计算',
      match: { type: 'regex', value: /^(?:\(*-?\d+(\.\d+)?\)* ?[+\-*/%^] ?)+\(*-?\d+(\.\d+)?\)*$/ },
      icon: 'icon',
      description: '计算结果'
    },
    {
      name: 'Bing搜索',
      match: { type: 'over' },
      icon: 'icon',
      description: '使用Micosoft Bing搜索'
    }
  ]
  return initActions(store)
}

const actionFilter = (val: string, list: ITypeInAction[]) => {
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
  const isUndefined = action === undefined
  const index = isUndefined ? -1 : list.indexOf(action)
  const length = list.length
  return { action, index, length }
}

const toggleActiveAction = (list: ITypeInAction[], type: 'up' | 'down') => {
  const { action, index, length } = getActiveAction(list)
  const isFirst = index === 0
  const isLast = index === length - 1
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

const activateAction = (list: ITypeInAction[], payload: string) => {
  const { action, index, length } = getActiveAction(list)
  console.log(action, payload)
}

const filterValue = ref('')
const actionList = ref<ITypeInAction[]>()
watchEffect(() => (actionList.value = actionFilter(filterValue.value, getActionStore())))

const handleActionListKeyDown = (ev: KeyboardEvent) => {
  const { key } = ev
  const isActivate = key === 'ArrowRight' || key === 'Enter' || key === 'NumpadEnter'
  if (isActivate) activateAction(actionList.value!, filterValue.value)
  else if (key === 'ArrowUp') toggleActiveAction(actionList.value!, 'up')
  else if (key === 'ArrowDown') toggleActiveAction(actionList.value!, 'down')
  else if (key === 'Escape') filterValue.value = ''
}

const handleActionListMouseOver = (ev: MouseEvent, action: ITypeInAction) => {
  const { index } = getActiveAction(actionList.value!)
  const targetIndex = actionList.value!.indexOf(action)
  actionList.value![index].isActive = false
  actionList.value![targetIndex].isActive = true
}

const handleActionClick = (ev: MouseEvent) => {
  activateAction(actionList.value!, filterValue.value)
}

export {
  filterValue,
  actionList,
  handleActionListKeyDown,
  handleActionListMouseOver,
  handleActionClick
}
