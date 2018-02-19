// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFormitFields from 'vue-formit-fields'

Vue.use(VueFormitFields)

Vue.config.productionTip = false
// Import options panel configuration.
Vue.prototype.$optionsKitSettings = optionsKitSettings
Vue.prototype.$optionsKitIsMainSection = true

/* eslint-disable no-new */
new Vue({
	el: '#optionskit-page',
	router,
	components: { App },
	template: '<App/>'
})
