$(`<div id="typein-root"><div>`).appendTo(document.body)
import { createApp } from 'vue'
import App from './App.vue'
import { addListeners, close } from '@/hooks'

const render = () => {
  const app = createApp(App)
  app.mount('#typein-root')
}

render()
close()
addListeners()
