import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faUtensils, faUser, faHome, faCartShopping} from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

import '@fortawesome/fontawesome-free/css/all.css'

library.add(faUtensils, faUser, faHome, faCartShopping);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('fa', FontAwesomeIcon)

app.mount('#app')


import './assets/style/main.css'

//library.add(fas);


