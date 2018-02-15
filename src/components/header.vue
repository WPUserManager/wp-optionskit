<template>
	<section id="optionskit-topbar">
		<h1>{{pageTitle}}</h1>
		<ul class="title-links" v-if="actionButtons.length > 0">
            <li v-for="link in actionButtons" :key="link.url">
                <a :href="link.url" class="page-title-action">{{link.title}}</a>
            </li>
		</ul>
		<div class="save-area">
			<input type="submit" class="button button-primary" :value="saveLabel">
		</div>
	</section>
</template>

<script>
export default {
	name: 'OptionsKitHeader',
	data () {
		return {
			pageTitle: this.$optionsKitSettings.page_title,
			actionButtons: this.$optionsKitSettings.buttons,
			saveLabel: this.$optionsKitSettings.labels['save']
		}
	}
}
</script>
