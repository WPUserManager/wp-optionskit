<template>
	<section id="optionskit-settings-wrapper">
		<options-kit-navigation-sections
			:sections="sections"
    		:currentRoute="currentRoute"
			:currentRouteName="currentRouteName"
		>
		</options-kit-navigation-sections>

		<form @submit.prevent="submit">
			<input type="text" v-model="user.name">
			<formit-field :field="fields[0]" :model="model"></formit-field>
			<!-- Disable buttons using form.isPending -->
            <button type="submit" :disabled="form.isPending">Submit</button>
		</form>
	</section>
</template>

<script>
import OptionsKitNavigationSections from './navigation-sections'
import { Form } from 'vue-formit'

export default {
	name: 'OptionsKitPanel',
	components: {
		OptionsKitNavigationSections
	},
	props: {
		sections: [ Object, Boolean ],
		currentRoute: String,
		currentRouteName: String
	},
	mounted() {
		console.log( this.$testingme )
	},
	data() {
		return {
			user: {name: 'Sahib'},
			model: {
				name_test: 'h'
			},
			fields: [
				{
					key: 'name_test',
					type: 'text',
					required: true
				}
			],
			form: new Form()
		}
	},
	methods: {
		submit() {
			this.form.submit('post', this.$optionsKitSettings.rest_url + 'record/admin_email' , this.model, this.$optionsKitSettings.nonce )
			.then(data => {
                console.log(data);
            }).catch(error => {
                console.log('yo error')
            });
		}
	}
}
</script>
