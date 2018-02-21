<template>
	<div class="optionskit-form-wrapper">
		<table class="form-table">
			<tr v-for="field in fields" :key="field.id">
				<th scope="row"><label :for="field.id">{{field.name}}</label></th>
				<td>
					<component v-bind:is="getFieldComponentName(field.type)" :field="field" :class="classes(field.type)" v-model="model[field.id]"></component>
					<p class="description" v-if="field.desc">{{field.desc}}</p>
					<!-- Display the error message for this specific field -->
            		<div class="error" v-show="form.errors.has(field.id)" v-text="form.errors.get(field.id)"></div>
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
		model: {},
		/**
		 * Form object. 
		 */
		form: {}
	},
	mounted() {
		console.log(this.form)
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
		getFieldComponentName ( type ) {
			return 'formit-'+type
		}
	}
}
</script>
