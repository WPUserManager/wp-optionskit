<template>
	<span class="opk-upload-field-wrapper">
		<input
			ref="input"
			type="text"
			:name="name"
			class="regular-text"
			v-bind="attributes"
			:value="currentValue"
			@input="handleInput"
			@change="handleChange"
			@focus="handleFocus"
			@blur="handleBlur"
		>
		<a href="#" class="button" @click="openMedia()"><span class="dashicons dashicons-plus"></span>{{selectFile}}</a>
	</span>
</template>

<script>
import { BaseField } from 'vue-formit-fields'

export default {
	name: 'formit-file',
	mixins: [BaseField],
	data() {
		return {
			selectFile: this.$optionsKitSettings.labels['upload'],
			uploader: {},
		}
	},
	created() {
		const modalWindow = wp.media({
			title: this.selectFile,
			library : {
				type : 'image'
			},
			button: {
				text: this.selectFile
			},
			multiple: false
		})
		this.uploader = modalWindow
	},
	methods: {
		openMedia() {
			const uploader = this.uploader
			let self = this
			uploader.on( 'select', function() {
				  var attachment = uploader.state().get('selection').first().toJSON()
				  self.setFile(attachment.url)
    		});
			uploader.open()
		},
		setFile(url) {
			this.$emit('input', url );
		}
	}
}
</script>
