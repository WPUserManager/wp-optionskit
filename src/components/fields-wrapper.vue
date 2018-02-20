<template>
	<div class="optionskit-form-wrapper">
		<table class="form-table">
			<tr v-for="field in fields" :key="field.id">
				<th scope="row"><label :for="field.id">{{field.name}}</label></th>
				<td>
					<component v-bind:is="getFieldComponentName(field.type)" :field="field" :class="classes(field.type)" v-model="model.test"></component>
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
		fields: {},
		/**
		 * Contains the data that will be sent to WordPres to save.
		 */
		model: {}
	},
	methods: {
		/**
		 * Setup classes for the component based on the field type. 
		 */
		classes (type) {
            return [
                'opk-field',
                type == 'text' ? 'regular-text' : ''
            ];
        },
		/**
		 * Sets the name of the component to retrieve.
		 */
		getFieldComponentName( type ) {
			return 'formit-'+type
		}
	}
}
</script>
