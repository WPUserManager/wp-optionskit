// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFormitFields from 'vue-formit-fields'
import WPNotice from 'vue-wp-notice'
import UploadField from './components/fields/upload-field'
import MultiselectField from './components/fields/multiselect'
import AnchorField from './components/fields/anchor'
import HtmlField from './components/fields/html'
import HiddenField from './components/fields/hidden'

Vue.use(VueFormitFields)
Vue.use(WPNotice)

// Load custom fields from this app.
Vue.component('formit-file', UploadField)
Vue.component('formit-multiselect', MultiselectField)
Vue.component('formit-anchor', AnchorField)
Vue.component('formit-html', HtmlField)
Vue.component('formit-hidden', HiddenField)

Vue.config.productionTip = false
// Import options panel configuration.
Vue.prototype.$optionsKitSettings = optionsKitSettings

/* eslint-disable no-new */
new Vue({
	el: '#optionskit-page',
	router,
	components: {
		App
	},
	template: '<App/>'
})
