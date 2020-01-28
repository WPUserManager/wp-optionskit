# wp-optionskit

![Packagist](https://img.shields.io/packagist/dt/wp-user-manager/wp-optionskit.svg) ![Packagist3](https://img.shields.io/packagist/v/wp-user-manager/wp-optionskit.svg) ![Packagist2](https://img.shields.io/packagist/l/wp-user-manager/wp-optionskit.svg) ![PHP from Packagist](https://img.shields.io/packagist/php-v/wp-user-manager/wp-optionskit.svg)

A toolkit for WordPress developers to create VueJS powered administration options panels in WordPress plugins and themes.

## Installation

`composer require wp-user-manager/wp-optionskit`

## Usage

```php
<?php

$prefix = 'igp';
$panel  = new \TDP\OptionsKit( $prefix );
$panel->set_page_title( __( 'My Plugin Settings' ) );

/**
 * Setup the menu for the options panel.
 *
 * @param array $menu
 *
 * @return array
 */
function igp_setup_menu( $menu ) {
	// These defaults can be customized
	// $menu['parent'] = 'options-general.php';
	// $menu['menu_title'] = 'Settings Panel';
	// $menu['capability'] = 'manage_options';

	$menu['page_title'] = __( 'My Plugin Settings' );
	$menu['menu_title'] = $menu['page_title'];

	return $menu;
}

add_filter( 'igp_menu', 'igp_setup_menu' );

/**
 * Register settings tabs.
 *
 * @param array $tabs
 *
 * @return array
 */
function igp_register_settings_tabs( $tabs ) {
	return array(
		'general' => __( 'General' ),
	);
}

add_filter( 'igp_settings_tabs', 'igp_register_settings_tabs' );

/**
 * Register settings subsections (optional)
 *
 * @param array $subsections
 *
 * @return array
 */
function igp_register_settings_subsections( $subsections ) {
	return $subsections;
}

add_filter( 'igp_registered_settings_sections', 'igp_register_settings_subsections' );

/**
 * Register settings fields for the options panel.
 *
 * @param array $settings
 *
 * @return array
 */
function igp_register_settings( $settings ) {
	$settings = array(
		'general' => array(
			array(
				'id'   => 'api_key',
				'name' => __( 'API Key' ),
				'desc' => __( 'Add your API key to get started' ),
				'type' => 'text',
			),
			array(
				'id'   => 'results_limit',
				'name' => __( 'Results Limit' ),
				'type' => 'text',
				'std'  => 10,
			),
			array(
				'id'   => 'start_date',
				'name' => __( 'Start Date' ),
				'type' => 'text',
			),
		),
	);

	return $settings;
}

add_filter( 'igp_registered_settings', 'igp_register_settings' );
````

## Development

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
