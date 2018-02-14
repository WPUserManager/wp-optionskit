import Vue from 'vue'
import Router from 'vue-router'
import OptionsPanel from '@/components/options-panel'

Vue.use(Router)

const OptionsTabs = []

// Set redirect for the first path to redirect
// to the first available tab.
OptionsTabs.push(
	{
    	path: '/',
		redirect: Object.keys(optionsKitSettings.tabs)[0]
  	}
)

Object.keys(optionsKitSettings.tabs).forEach(function (key) {
	// Setup the starting path.
	let path = '/' + key

	// Define child routes for the router based on available sections.
	let availableSections = optionsKitSettings.sections[key]
	let childRoutes = []

	if (typeof (availableSections) !== 'undefined') {
		Object.keys(availableSections).forEach(function (key) {
			childRoutes.push({
				path: key,
				name: availableSections[key],
				meta: {
					parent: path
				},
				component: OptionsPanel
			})
		})
	}

	// Create main route and child routes if any.
	OptionsTabs.push(
		{
			path: path,
			name: optionsKitSettings.tabs[key],
			component: OptionsPanel,
			props: {
				sections: optionsKitSettings.sections[key] ? optionsKitSettings.sections[key] : false,
				currentRoute: key,
				currentRouteName: optionsKitSettings.tabs[key]
			},
			children: childRoutes
		}
	)
})

export default new Router({
	routes: OptionsTabs
})
