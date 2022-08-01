import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/theme-chalk/index.css'

function render() {
  const app = createApp(App)
  app.mount('#option')
}
render()
