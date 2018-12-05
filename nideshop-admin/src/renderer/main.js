import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App'
import router from './router'
import store from './store'
import config from '@/config/config';


// vue-quill-edit
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// element-ui 跟 bootstrap css 有冲突
// import 'bootstrap/js/modal.js'
// import 'bootstrap/js/dropdown.js'
// import 'bootstrap/js/tooltip.js'
// // import 'bootstrap/dist/css/bootstrap.css'
// import 'font-awesome/css/font-awesome.css'
// import 'summernote'
// import 'summernote/dist/lang/summernote-zh-CN.js'
// import 'summernote/dist/summernote.css'

Vue.use(VueAxios, Axios);
Vue.use(ElementUI);

Vue.prototype.$loading = function(text) {
	const service = ElementUI.Loading.service
	return service({
		lock: false,
		text: text || 'loading...',
		background: 'rgba(0, 0, 0, 0.7)'
	})
}

// add设置调试模式
Vue.config.devtools = true;

router.beforeEach((to, from, next) => {

	let token = localStorage.getItem('token') || '';

	//配置接口信息
	Axios.defaults.baseURL = config.rootUrl;
	Axios.defaults.headers.common['X-Nideshop-Token'] = token;

	if (!token && to.name !== 'login') {
		next({
			path: '/login',
			query: { redirect: to.fullPath }
		})
	} else {
		next()
	}
});

if (!process.env.IS_WEB) {
	Vue.use(require('vue-electron'))
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	components: { App },
	router,
	store,
	template: '<App/>'
}).$mount('#app')
