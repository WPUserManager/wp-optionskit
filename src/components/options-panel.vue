<template>
	<section id="optionskit-settings-wrapper">
		<options-kit-navigation-sections
			:sections="sections"
    		:currentRoute="currentRoute"
			:currentRouteName="currentRouteName"
		>
		</options-kit-navigation-sections>

		<fields-wrapper :field="field"></fields-wrapper>
		<router-view></router-view>

	</section>
</template>

<script>
import OptionsKitNavigationSections from './navigation-sections'
import FieldsWrapper from './fields-wrapper'
import Formit from 'vue-formit'

export default {
	name: 'OptionsKitPanel',
	components: {
		OptionsKitNavigationSections,
		FieldsWrapper
	},
	props: {
		sections: [ Object, Boolean ],
		currentRoute: String,
		currentRouteName: String,
		isParentRoute: Boolean,
		field: String
	},
	data() {
		return {
			model: {},
			fields: [],
			form: new Formit()
		}
	},
 	methods: {
		submit() {
			this.form.submit(
				'post',
				this.$optionsKitSettings.rest_url + 'record/admin_email',
				this.model,
				this.$optionsKitSettings.nonce
			)
			.then(data => {
                console.log(data);
            }).catch(error => {
                console.log('yo error')
            })
		}
	}
}
</script>
