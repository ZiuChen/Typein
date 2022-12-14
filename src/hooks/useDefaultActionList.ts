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
    description: '使用Google Translate翻译',
    action: 'translate-google'
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
  },
  {
    name: 'Google搜索',
    match: { type: 'over' },
    icon: 'google',
    description: '使用Google搜索',
    action: 'search-query'
  },
  {
    name: '标签页静音',
    match: { type: 'over', value: 'mute' },
    icon: 'volume-off',
    description: '将当前标签页静音',
    action: 'tab-mute'
  },
  {
    name: '标签页取消静音',
    match: { type: 'over', value: 'unmute' },
    icon: 'volume-high',
    description: '将当前标签页取消静音',
    action: 'tab-unmute'
  },
  {
    name: '固定标签页',
    match: { type: 'over', value: 'pin' },
    icon: 'pin',
    description: '将当前标签页固定',
    action: 'tab-pin'
  },
  {
    name: '取消固定标签页',
    match: { type: 'over', value: 'unpin' },
    icon: 'pin-off',
    description: '当前标签页取消固定',
    action: 'tab-unpin'
  },
  {
    name: '刷新',
    match: { type: 'over', value: 'reload' },
    icon: 'reload',
    description: '刷新当前标签页',
    action: 'tab-reload'
  },
  {
    name: '复制标签页',
    match: { type: 'over', value: 'duplicate' },
    icon: 'content-duplicate',
    description: '复制当前标签页',
    action: 'tab-duplicate'
  },
  {
    name: 'Photoshop',
    match: { type: 'over', value: 'ps' },
    icon: 'photoshop',
    description: '打开Photoshop',
    action: 'open-url'
  },
  {
    name: 'VideoCutter',
    match: { type: 'over', value: 'videocut' },
    icon: 'film',
    description: '开始视频剪辑',
    action: 'open-url'
  },
  {
    name: 'AudioEditor',
    match: { type: 'over', value: 'audio' },
    icon: 'music-box',
    description: '开始音频转码',
    action: 'open-url'
  },
  {
    name: 'Apifox',
    match: { type: 'over', value: 'apifox' },
    icon: 'server-network',
    description: '开始接口调试',
    action: 'open-url'
  },
  {
    name: 'Markdown',
    match: { type: 'over', value: 'md' },
    icon: 'markdown',
    description: '打开Markdown编辑器',
    action: 'open-url'
  },
  {
    name: 'Ctool',
    match: { type: 'over', value: 'ctool' },
    icon: 'code-array',
    description: '打开开发者工具箱',
    action: 'open-url'
  },
  {
    name: 'Excalidraw',
    match: { type: 'over', value: 'flow' },
    icon: 'flow-chart',
    description: '开始绘制流程图',
    action: 'open-url'
  }
]

export { useDefaultActionList }
