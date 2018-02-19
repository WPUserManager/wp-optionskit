<template>
	<div class="optionskit-form-wrapper">
		
		<table class="form-table">
			<tr v-for="field in fields" :key="field.id">
				<th scope="row"><label :for="field.id">{{field.name}}</label></th>
				<td>
					<component v-bind:is="getFieldComponentName(field.type)" :field="field"></component>
					<p class="description" v-if="field.desc">{{field.desc}}</p>
				</td>
			</tr>
		</table>

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
	methods: {
		/**
		 * Sets the name of the component to retrieve.
		 */
		getFieldComponentName( type ) {
			return 'formit-'+type
		}
	}
}
</script>
