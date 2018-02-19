<template>
	<section id="optionskit-panel" class="optionskit-panel-container wrap">
		<form @submit.prevent="submit" class="opk-form">
			<!-- Header -->
			<section id="optionskit-topbar">
				<h1>{{pageTitle}}</h1>
				<ul class="title-links" v-if="actionButtons.length > 0">
					<li v-for="link in actionButtons" :key="link.url">
						<a :href="link.url" class="page-title-action">{{link.title}}</a>
					</li>
				</ul>
				<div class="save-area">
					<div class="spinner is-active opk-spinner" v-show="form.isPending"></div>
					<!-- Disable buttons using form.isPending -->
					<input type="submit" class="button button-primary" :disabled="form.isPending" :value="saveLabel">
				</div>
			</section>
			<!-- end header -->

			<!-- Navigation -->
			<div class="optionskit-navigation-wrapper">
				<div class="wp-filter" id="optionskit-navigation">
					<ul class="filter-links">
						<li v-for="item in items" :key="item.path">
							<router-link :to="item.path" v-if="item.name">{{item.name}}</router-link>
						</li>
					</ul>
				</div>
			</div>
			<!-- end navigation -->
			<router-view></router-view>
			<router-view name="fields" v-if="isMainTab"></router-view>
			<!-- Disable buttons using form.isPending -->
            <button type="submit" :disabled="form.isPending" class="button button-primary">{{saveLabel}}</button>
			<div class="spinner is-active opk-spinner" v-show="form.isPending"></div>
		</form>
	</section>
</template>

<script>
import Formit from 'vue-formit'

export default {
	name: 'App',
	data() {
		return {
			pageTitle: this.$optionsKitSettings.page_title,
			actionButtons: this.$optionsKitSettings.buttons,
			saveLabel: this.$optionsKitSettings.labels['save'],
			items: [],
			mainItems: [],
			isMainTab: Boolean,
			model: {},
			form: new Formit()
		}
	},
	created() {
		this.detectMainTab()
		/**
		 * Get all routes and add them to an array.
		 */
		this.$router.options.routes.forEach(route => {
			if( route.name ) {
				this.items.push({
					name: route.name,
					path: route.path,
					children: route.children
				})
			}
		})
	},
	watch:{
        '$route'() {
			this.detectMainTab()
		}
	},
	methods: {
		/**
		 * Detect if the main tab is active or not.
		 * This is used to show the appropriate fields wrapper.
		 */
		detectMainTab() {
			if ( typeof this.$router.currentRoute.meta.id === 'undefined') {
				this.isMainTab = false
			} else {
				this.isMainTab = true
			}
		},

		submit() {
			this.form.submit(
				'post',
				this.$optionsKitSettings.rest_url + 'record/whatevertest',
				this.model,
				this.$optionsKitSettings.nonce
			)
			.then(data => {
                console.log(data);
            }).catch(error => {
                console.log('yo error')
            })
		}
	}
}
</script>

<style lang="scss">
body.optionskit-panel-page {
	#wpcontent {
		padding-left: 0;
	}
	.wrap {
		margin: 0;
	}
	.submit {
		margin-left: 20px;
		display: inline-block;
	}
}
.optionskit-subnav {
	background: #edeff0;
	border-bottom: 1px solid #e2e4e7;
	ul {
		margin: 0;
		padding: 15px 20px;
		li {
			display: inline-block;
			margin-right: 0;
			margin-bottom: 0;
			span {
				opacity: 0.5;
				display: inline-block;
				margin: 0 10px;
			}
			a {
				text-decoration: none;
				&.current {
					font-weight: bold;
				}
			}
		}
	}
}
#optionskit-topbar {
	padding: 15px 20px;
	border-bottom: 1px solid #e2e4e7;
	background: #fff;
	h1 {
		margin: 0;
		padding: 0;
		font-weight: 500;
		display: inline-block;
		+ .hide-notice {
			display: none;
		}
	}
	ul {
		display: inline-block;
		margin: 0 0 0 20px;
		li {
			display: inline-block;
			margin-bottom: 0;
		}
	}
	.save-area {
		float: right;
		.submit {
			display: inline-block;
			margin: 0;
			padding: 0;
		}
	}
}
#optionskit-navigation {
	margin: -2px 0 0 0;
}
.optionskit-form .form-table {
	th {
		padding-left: 20px;
	}
	td {
		padding-right: 20px;
	}
	.description {
		font-style: normal;
	}
}
#optionskit-navigation {
	ul {
		li {
			a {
				&.router-link-active {
					box-shadow: none;
					border-bottom: 4px solid #0085ba;
					color: #0085ba;
				}
			}
		}
	}
}
.opk-spinner {
	float: none;
}

</style>
