<template>
	<a
		:href="href"
		:class="selectedClass"
		:target="selectedTarget">{{label}}</a>
</template>

<script>
	import { BaseField } from 'vue-formit-fields'

	export default {
		name: 'formit-anchor',
		mixins: [BaseField],
		data () {
			return {
				label: this.field.label,
				href: this.field.href,
				selectedClass: this.field.class ? this.field.class : '',
				selectedTarget: this.field.target ? this.field.target : ''
			}
		},
	}
</script>
