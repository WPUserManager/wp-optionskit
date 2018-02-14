<template>
	<section id="optionskit-settings-wrapper">
		<options-kit-navigation-sections
			:sections="sections"
    		:currentRoute="currentRoute"
			:currentRouteName="currentRouteName"
		>
		</options-kit-navigation-sections>
	</section>
</template>

<script>
import OptionsKitNavigationSections from './navigation-sections'

export default {
	name: 'OptionsKitPanel',
	components: {
		OptionsKitNavigationSections
	},
	props: {
		sections: [ Object, Boolean ],
		currentRoute: String,
		currentRouteName: String
	}
}
</script>
