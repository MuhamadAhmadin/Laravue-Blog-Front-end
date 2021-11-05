import { createApp } from 'vue'
import App from './App.vue'

// Import router
import router from './router'

// Import bootstrap, Popper and jQuery
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)
// Use vue router
app.use(router)
app.mount('#app')


