// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()

//接口
import $API from "./api/index.js"
uni.$API = $API

//封装showToast
uni.$showMsg = function(
	title = "请求失败",
	duration = 1500
) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}


export function createApp() {
	const app = createSSRApp(App)
	app.use(pinia)
	return {
		app
	}
}
// #endif