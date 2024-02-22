import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

app.use(router)

app.mount('#app')

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
