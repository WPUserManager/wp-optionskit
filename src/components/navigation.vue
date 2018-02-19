<template>
	<div class="optionskit-navigation-wrapper">
		<div class="wp-filter" id="optionskit-navigation">
			<ul class="filter-links">
				<li v-for="item in items" :key="item.path">
					<router-link :to="item.path" v-if="item.name">{{item.name}}</router-link>
				</li>
			</ul>
		</div>
		<div class="optionskit-subnav" v-for="item in items" :key="item.path">
			<ul>
				<li v-for="section in item.children" :key="section.path">
					<router-link :to="section.path" v-if="section.name">{{section.name}}</router-link><span>|</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'OptionsKitNavigation',
	data() {
		return {
			items: [],
			mainItems: [],
			activeNavItem: String,
		}
	},
	created() {
		/**
		 * Setup the activate navigation item to the current one on page load. 
		 */
		this.activeNavItem = this.$router.currentRoute.meta.id
		/**
		 * Get all routes and add them to an array.
		 */
		this.$router.options.routes.forEach(route => {
			if( route.name ) {
				this.mainItems.push( route.meta.id )
				this.items.push({
					name: route.name,
					path: route.path,
					id: route.meta.id,
					children: route.children
				})
			}
		})
	},
	mounted() {
		console.log(  )
	},
	watch:{
		/**
		 * Watch for changes when a navigation item is clicked and
		 * set the current active item to the selected one.
		 * This is used to detect which submenu should display.
		 */
        '$route'() {
			this.activeNavItem = this.$router.currentRoute.meta.id
		}
    }
}
</script>

<style lang="scss">
#optionskit-navigation {
	ul {
		li {
			a {
				&.router-link-exact-active,
				&.parent-active {
					box-shadow: none;
					border-bottom: 4px solid #0085ba;
					color: #0085ba;
				}
			}
		}
	}
}
</style>
