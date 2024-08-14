import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

app.provide("WIDTHS", {
    "base": "80vw"
});
app.provide("PI_SYMBOL", "π")

app.mount('#app')
