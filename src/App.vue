<template>
	<section id="optionskit-panel" class="optionskit-panel-container wrap">
		<options-kit-header></options-kit-header>
		<options-kit-navigation></options-kit-navigation>
		<router-view></router-view>
  	</section>
</template>

<script>
import OptionsKitHeader from './components/header'
import OptionsKitNavigation from './components/navigation'

export default {
	name: 'App',
	components: {
		OptionsKitHeader,
		OptionsKitNavigation
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
</style>