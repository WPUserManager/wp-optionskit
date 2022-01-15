<template>
	<input
		ref="input"
		type="hidden"
		:name="name"
		v-bind="attributes"
		:value="currentValue"
		@input="handleInput"
		@change="handleChange"
		@focus="handleFocus"
		@blur="handleBlur"
	>
</template>

<script>
	import { BaseField } from 'vue-formit-fields'

	export default {
		name: 'formit-hidden',
		mixins: [BaseField],
	}
</script>
