import { ref } from 'vue'
import { filterValue } from './useActionList'

const isOpen = ref(false)

const close = () => {
  const root = document.querySelector('#typein-root') as HTMLDivElement
  root.style.display = 'none'
  isOpen.value = false
  filterValue.value = '' // 清空输入框
}

const open = () => {
  const root = document.querySelector('#typein-root') as HTMLDivElement
  root.style.display = ''
  isOpen.value = true
  root.querySelector('input')?.focus()
}

const addListeners = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { request } = message
    if (request == 'open-typein') {
      isOpen.value ? close() : open()
    } else if (request === 'close-typein') {
      close()
    } else {
      console.log(message)
    }
  })
  document.addEventListener('keydown', (ev) => {
    const { key } = ev
    if (key === 'Escape') {
      if (isOpen.value) {
        close()
      }
    }
  })
  document.querySelector('#typein-overlay')?.addEventListener('click', () => close())
}

export { isOpen, addListeners, close, open }
