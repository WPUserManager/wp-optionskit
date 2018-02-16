// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { VueFormit } from 'vue-formit'
Vue.use(VueFormit)

Vue.config.productionTip = false
// Import options panel configuration.
Vue.prototype.$optionsKitSettings = optionsKitSettings

let myNewField = Vue.extend({
	props: ['form', 'field', 'model', 'to'],
	template: '<input type="text" v-model="model[field.key]">'
});

Vue.$formit.addType('text', myNewField);

/* eslint-disable no-new */
new Vue({
	el: '#optionskit-page',
	router,
	components: { App },
	template: '<App/>'
})
