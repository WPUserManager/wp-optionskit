<template>
	<div class="optionskit-sub-sections-wrapper">
		<div class="optionskit-subnav" v-if="sections.length > 0">
			<ul>
				<li v-for="item in sections" :key="item.path">
					<router-link :to="item.path" v-if="item.name">{{item.name}}</router-link><span>|</span>
				</li>
			</ul>
		</div>
		<router-view :model="model"></router-view>
	</div>
</template>

<script>
export default {
	name: 'OptionsKitSubSections',
	props: {
		/**
		 * Stores the subsections if available.
		*/
		sections: [Object, Array, Boolean],
		/**
		 * Contains the data that will be sent to WordPres to save.
		 */
		model: {}
	},
 }
</script>

<style lang="scss">
.optionskit-subnav {
	a.router-link-exact-active {
		font-weight: bold;
		text-decoration: underline;
		&:focus {
			color: #0073aa;
			box-shadow: none;
		}
	}
}
</style>