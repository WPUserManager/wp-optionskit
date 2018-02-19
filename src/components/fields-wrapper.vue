<template>
	<div class="optionskit-form-wrapper">
		{{fields}}
	</div>
</template>

<script>
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
			type: 'formit-text'
		}
	},
	mounted() {
		console.log( this.fields )
	}
}
</script>
