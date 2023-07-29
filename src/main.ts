import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { worker } from './mock/server.js'

import './assets/main.css'

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
