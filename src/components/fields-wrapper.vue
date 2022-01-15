<template>
	<div class="optionskit-form-wrapper">
		<table class="form-table">
			<tr v-for="field in fields" :key="field.id" :class="{ 'has-error': form.errors.has(field.id) }" v-show="maybeShowField(field)">
				<th scope="row">
					<label :for="field.id">{{field.name}}</label>
				</th>
				<td>
					<component v-bind:is="getFieldComponentName(field.type)" :field="field" :class="classes(field.type)" v-model="model[field.id]"></component>
					<p class="description" v-if="field.desc" v-html="field.desc"></p>
					<!-- Display the error message for this specific field -->
					<wp-notice type="error" v-show="form.errors.has(field.id)" alternative><strong>{{form.errors.get(field.id)}}</strong></wp-notice>
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
	methods: {
		maybeShowField( field ) {
			if ( field.type === 'hidden' ) {
				return false;
			}

			if ( !field.toggle ) {
				return true;
			}

			var toggleData = field.toggle;

			if(!(toggleData instanceof Array)){
				toggleData = [toggleData];
			}

			var show = true;

			var operators = {
				'!=': function(a, b) { return a != b },
				'!==': function(a, b) { return a !== b },
				'==': function(a, b) { return a == b },
				'===': function(a, b) { return a === b },
				'>=': function(a, b) { return a >= b },
				'>': function(a, b) { return a > b },
				'<=': function(a, b) { return a <= b },
			};

			for ( var i = 0; i < toggleData.length; i++ ) {
				var toggleItem = toggleData[i];
				var operator = '!=';
				if ( toggleItem.hasOwnProperty('operator') ) {
					operator = toggleItem.operator;
				}

				if ( operators[operator](this.model[ toggleItem.key ], toggleItem.value) ) {
					return false;
				}
			}

			return show;
		},

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
