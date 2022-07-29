import { ref } from 'vue'

const isOpen = ref(false)

const close = () => {
  const root = document.querySelector('#typein-root') as HTMLDivElement
  root.style.display = 'none'
  isOpen.value = false
}

const open = () => {
  const root = document.querySelector('#typein-root') as HTMLDivElement
  root.style.display = ''
  isOpen.value = true
  root.querySelector('input')?.focus()
}

const addListeners = () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.request == 'open-typein') {
      if (isOpen.value) {
        close()
      } else {
        open()
      }
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
