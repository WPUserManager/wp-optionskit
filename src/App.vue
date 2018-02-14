<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
</style>
