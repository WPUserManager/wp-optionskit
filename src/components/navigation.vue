<template>
	<div class="wp-filter" id="optionskit-navigation">
		<ul class="filter-links">
			<router-link v-for="route in this.$router.options.routes" tag="li" :to="route.path" :key="route.path" :class="hasChildRoutes( route.name )" v-if="route.name">
                <a>{{ route.name }}</a>
			</router-link>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'OptionsKitNavigation',
	methods: {
        hasChildRoutes (name) {
            return name === this.$route.matched[0].name ? 'parent-active' : false
        }
    }
}
</script>
