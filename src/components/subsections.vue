<template>
	<div class="optionskit-sub-sections-wrapper">
		<div class="optionskit-subnav" v-if="sections.length > 0">
			<ul>
				<li v-for="item in sections" :key="item.path">
					<router-link :to="item.path" v-if="item.name">{{item.name}}</router-link><span>|</span>
				</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'OptionsKitSubSections',
	props: {
		sections: [Object, Array, Boolean]
	},
	created() {
	}
 }
</script>
