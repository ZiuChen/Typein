import type { ITypeInAction } from '@/types'

const useDefaultActionList: () => ITypeInAction[] = () => [
  {
    name: 'Microsoft',
    match: { type: 'over', value: 'ms' },
    icon: 'windows',
    description: '打开Microsoft Edge 浏览器开拓者大赛官网',
    action: 'open-url'
  },
  {
    name: '搜索历史记录',
    match: { type: 'over' },
    icon: 'history',
    description: '在浏览器历史记录中搜索',
    action: 'search-history'
  },
  {
    name: '搜索书签',
    match: { type: 'over' },
    icon: 'bookmark',
    description: '在浏览器书签中搜索',
    action: 'search-bookmark'
  },
  {
    name: '翻译',
    match: { type: 'over' },
    icon: 'translate',
    description: '使用Bing Micosoft Translator翻译',
    action: 'translate-bing'
  },
  {
    name: '计算',
    match: { type: 'regex', value: /^(?:\(*-?\d+(\.\d+)?\)* ?[+\-*/%^] ?)+\(*-?\d+(\.\d+)?\)*$/ },
    icon: 'caculate',
    description: '输入计算公式',
    action: 'caculate'
  },
  {
    name: 'Bing搜索',
    match: { type: 'over' },
    icon: 'microsoft',
    description: '使用Micosoft Bing搜索',
    action: 'search-query'
  }
]

export { useDefaultActionList }
