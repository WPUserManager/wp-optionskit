<template>
	<div class="optionskit-subnav">
		<ul>
			<li>
          		<router-link :to="parentRoute()">{{currentRouteName}}</router-link><span>|</span>
			</li>
			<li v-for="(value, key) in sections" :key="key">
          		<router-link :to="getSectionUrl(key)">{{ value }}</router-link><span>|</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'OptionsKitNavigationSections',
	props: {
		sections: [ Object, Boolean ],
		currentRoute: String,
		currentRouteName: String
	},
	methods: {
		parentRoute () {
			return '/' + this.currentRoute
		},
		getSectionUrl ( route ) {
			return '/' + this.currentRoute + '/' + route
		}
	}
}
</script>
