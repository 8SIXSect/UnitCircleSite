import { provide, createApp } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)
app.provide("PI_SYMBOL", "π")
app.mount('#app')
