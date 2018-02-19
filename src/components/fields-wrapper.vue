<template>
	<div class="optionskit-form-wrapper">

	</div>
</template>

<script>
import Formit from 'vue-formit'

export default {
	name: 'fields-wrapper',
	props: {
		/**
		 * Contains the fields passed through the router.
		 */
		fields: {}
	},
	data() {
		return {
			model: {},
			form: new Formit()
		}
	},
	methods: {
		submit() {
			this.form.submit(
				'post',
				this.$optionsKitSettings.rest_url + 'record/whatevertest',
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
