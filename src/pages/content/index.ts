const root = document.createElement('div')
root.id = 'typein-root'
document.body.append(root)

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
