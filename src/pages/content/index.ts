$(`<div id="typein-root"><div>`).appendTo(document.body)
import { createApp } from 'vue'
import App from './App.vue'
const render = () => {
  const app = createApp(App)
  app.mount('#typein-root')
}
render()

const isOpen = { value: false }

const root = document.querySelector('#typein-root') as HTMLDivElement
root.style.display = 'none'

document.addEventListener('keydown', (ev) => {
  const { key } = ev
  if (key === 'Escape') {
    isOpen.value = false
    root.style.display = 'none'
  }
})

document.querySelector('#typein-overlay')?.addEventListener('click', (ev) => {
  isOpen.value = false
  root.style.display = 'none'
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.request == 'open-typein') {
    if (isOpen.value) {
      isOpen.value = false
      root.style.display = 'none'
    } else {
      isOpen.value = true
      root.style.display = ''
      root.querySelector('input')?.focus()
    }
  }
})
