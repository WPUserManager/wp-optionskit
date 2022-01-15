<template>
	<div v-html="html"></div>
</template>

<script>
	import { BaseField } from 'vue-formit-fields'

	export default {
		name: 'formit-html',
		mixins: [BaseField],
		data () {
			return {
				label: this.field.label,
				html: this.field.html,
			}
		},
	}
</script>
