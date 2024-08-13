import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import tailwindConfig from "../tailwind.config";
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.provide("PI_SYMBOL", "π")
app.provide("TW_CONFIG", tailwindConfig)

app.mount('#app')
