import Vue from 'vue'
import Router from 'vue-router'
import Subsections from '@/components/subsections'
import FieldsWrapper from '@/components/fields-wrapper'

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
				path: path + '/' + key,
				name: availableSections[key],
				component: FieldsWrapper,
				props: {
					field: availableSections[key]
				}
			})
		})
	}

	// Create main route and child routes if any.
	OptionsTabs.push(
		{
			path: path,
			name: optionsKitSettings.tabs[key],
			components: {
				default: Subsections,
				fields: FieldsWrapper
			},
			meta: {
				id: path.substring(1)
			},
			props: {
				default: {
					sections: childRoutes
				},
				fields: {
					field: 'test_' + path
				}
			},
			children: childRoutes
		}
	)
})

export default new Router({
	routes: OptionsTabs
})
