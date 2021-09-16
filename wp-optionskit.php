<?php
/**
 * WP OptionsKit.
 *
 * Copyright (c) 2018 Alessandro Tesoro
 *
 * WP OptionsKit. is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * WP OptionsKit. is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * @author     Alessandro Tesoro
 * @version    1.0.12
 * @copyright  (c) 2018 Alessandro Tesoro
 * @license    http://www.gnu.org/licenses/gpl-2.0.txt GNU LESSER GENERAL PUBLIC LICENSE
 * @package    wp-optionskit
 */

namespace TDP;

// Make sure this file is only run from within WordPress.
defined( 'ABSPATH' ) or die();

if ( ! class_exists( 'TDP\OptionsKit' ) ) {

	class OptionsKit {
		/**
		 * Version of the class.
		 *
		 * @var string
		 */
		private $version = '1.0.12';

		/**
		 * The slug of the options panel.
		 *
		 * @var string
		 */
		private $slug;

		/**
		 * The slug for the function names of this panel.
		 *
		 * @var string
		 */
		private $func;

		/**
		 * The title of the page.
		 *
		 * @var string
		 */
		private $page_title;

		/**
		 * Logo to be displayed near the title.
		 *
		 * @var string
		 */
		private $image;

		/**
		 * Actions links for the options panel header.
		 *
		 * @var array
		 */
		private $action_buttons = array();

		/**
		 * Setup labels for translation and modification.
		 *
		 * @var array
		 */
		private $labels = array();

		/**
		 * Holds the settings for this panel.
		 *
		 * @var array
		 */
		private $settings = array();

		/**
		 * Get things started.
		 *
		 * @param boolean $slug
		 */
		public function __construct( $slug = false ) {

			if ( ! $slug ) {
				return;
			}

			$this->slug   = $slug;
			$this->func   = str_replace( '-', '_', $slug );
			$this->labels = $this->get_labels();
			$GLOBALS[ $this->func . '_options' ] = get_option( $this->func . '_settings', true );

			$this->hooks();

		}

		/**
		 * Set the title for the page.
		 *
		 * @param string $page_title
		 * @return void
		 */
		public function set_page_title( $page_title = '' ) {
			$this->page_title = $page_title;
		}

		/**
		 * Add action button to the header.
		 *
		 * @param array $args
		 * @return void
		 */
		public function add_action_button( $args ) {

			$defaults = array(
				'title' => '',
				'url'   => '',
			);

			$this->action_buttons[] = wp_parse_args( $args, $defaults );

		}

		/**
		 * Set an image for the options panel title.
		 *
		 * @param string $url
		 * @return void
		 */
		public function add_image( $url ) {
			$this->image = esc_url( $url );
		}

		/**
		 * Hook into WordPress and run things.
		 *
		 * @return void
		 */
		private function hooks() {

			add_action( 'admin_menu', array( $this, 'add_settings_page' ), apply_filters( $this->func . '_admin_menu_priority', 10 ) );
			add_filter( 'admin_body_class', array( $this, 'admin_body_class' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ), 100 );
			add_action( 'rest_api_init', array( $this, 'register_rest_controller' ) );

		}

		/**
		 * Register the WP API controller for the options panel.
		 *
		 * @return void
		 */
		public function register_rest_controller() {
			require_once 'includes/class-wpok-rest-server.php';
			$controller = new \TDP\WPOK_Rest_Server( $this->func, $this->get_registered_settings() );
			$controller->register_routes();

		}

		/**
		 * Return the rest url for the options panel.
		 *
		 * @return string
		 */
		private function get_rest_url() {
			return get_rest_url( null, '/wpok/' . $this->func . '/v1/' );
		}

		/**
		 * Retrieve labels.
		 *
		 * @return void
		 */
		private function get_labels() {

			$defaults = array(
				'save'         => 'Save Changes',
				'success'      => 'Settings successfully saved.',
				'upload'       => 'Select file',
				'upload-title' => 'Insert file',
				'multiselect'  => array(
					'selectLabel'   => 'Press enter to select',
					'SelectedLabel' => 'Selected',
					'deselectLabel' => 'Press enter to remove',
					'placeholder'   => 'Select option',
				),
				'error'        => 'Whoops! Something went wrong. Please check the following fields for more info:',
			);

			return apply_filters( $this->func . '_labels', $defaults );

		}

		/**
		 * Add settings page to the WordPress menu.
		 *
		 * @return void
		 */
		public function add_settings_page() {

			$menu = apply_filters(
				$this->func . '_menu', array(
					'parent'     => 'options-general.php',
					'page_title' => 'Settings Panel',
					'menu_title' => 'Settings Panel',
					'capability' => 'manage_options',
				)
			);

			$page = add_submenu_page(
				$menu['parent'],
				$menu['page_title'],
				$menu['menu_title'],
				$menu['capability'],
				$this->slug . '-settings',
				array( $this, 'render_settings_page' )
			);

		}

		/**
		 * Determine wether we're on an options page generated by WPOK.
		 *
		 * @return boolean
		 */
		private function is_options_page() {

			$is_page = false;
			$screen  = get_current_screen();
			$check   = $this->slug . '-settings';

			if ( preg_match( "/{$check}/", $screen->base ) ) {
				$is_page = true;
			}

			return $is_page;

		}

		/**
		 * Add a new class to the body tag.
		 * The class will be used to adjust the layout.
		 *
		 * @param string $classes
		 *
		 * @return string
		 */
		public function admin_body_class( $classes ) {
			$screen = get_current_screen();
			$check  = $this->slug . '-settings';

			if ( preg_match( "/{$check}/", $screen->base ) ) {
				$classes .= ' optionskit-panel-page';
			}

			return $classes;
		}

		/**
		 * Load require styles and scripts for the options panel.
		 *
		 * @return void
		 */
		public function enqueue_scripts() {

			$path = plugin_dir_url( __FILE__ );

			if ( $this->is_options_page() ) {

				if ( defined( 'WP_DEBUG' ) && WP_DEBUG === true && defined( 'OPK_DEBUG' ) && OPK_DEBUG === true ) {
					wp_enqueue_script( $this->func . '_opk', 'http://localhost:8080/app.js', array(), false, true );
				} else {
					wp_enqueue_script( $this->func . '_opk2', $path . 'dist/static/js/manifest.js', array(), false, true );
					wp_enqueue_script( $this->func . '_opk', $path . 'dist/static/js/vendor.js', array(), false, true );
					wp_enqueue_script( $this->func . '_opk3', $path . 'dist/static/js/app.js', array(), false, true );
					wp_enqueue_style( $this->func . '_opkcss', $path . 'dist/static/css/app.css', array(), $this->version );
				}
				$options_panel_settings = array(
					'rest_url'    => esc_url( $this->get_rest_url() ),
					'nonce'       => wp_create_nonce( 'wp_rest' ),
					'verifynonce' => wp_create_nonce( 'wpok_verifynonce' ),
					'page_title'  => esc_html( $this->page_title ),
					'logo'        => $this->image,
					'buttons'     => $this->action_buttons,
					'labels'      => $this->labels,
					'tabs'        => $this->get_settings_tabs(),
					'sections'    => $this->get_registered_settings_sections(),
					'settings'    => $this->get_registered_settings(),
					'options'     => $this->get_options(),
				);
				wp_enqueue_media();
				wp_localize_script( $this->func . '_opk', 'optionsKitSettings', $options_panel_settings );
			}

		}

		/**
		 * Retrieve the default tab.
		 * The default tab, will be the first available tab.
		 *
		 * @return string
		 */
		private function get_default_tab() {

			$default = '';
			$tabs    = $this->get_settings_tabs();

			if ( is_array( $tabs ) ) {
				$default = key( $tabs );
			}

			return $default;

		}

		/**
		 * Retrieve the currently active tab.
		 *
		 * @return string
		 */
		private function get_active_tab() {

			return isset( $_GET['tab'] ) && array_key_exists( $_GET['tab'], $this->get_settings_tabs() ) ? $_GET['tab'] : $this->get_default_tab();

		}

		/**
		 * Retrieve the settings tabs.
		 *
		 * @return array
		 */
		private function get_settings_tabs() {
			return apply_filters( $this->func . '_settings_tabs', array() );
		}

		/**
		 * Retrieve sections for the currently selected tab.
		 *
		 * @param mixed $tab
		 * @return mixed
		 */
		private function get_settings_tab_sections( $tab = false ) {

			$tabs     = false;
			$sections = $this->get_registered_settings_sections();

			if ( $tab && ! empty( $sections[ $tab ] ) ) {
				$tabs = $sections[ $tab ];
			} elseif ( $tab ) {
				$tabs = false;
			}

			return $tabs;

		}

		/**
		 * Retrieve the registered sections.
		 *
		 * @return array
		 */
		private function get_registered_settings_sections() {

			$sections = apply_filters( $this->func . '_registered_settings_sections', array() );

			return $sections;

		}

		/**
		 * Retrieve the settings for this options panel.
		 *
		 * @return array
		 */
		private function get_registered_settings() {
			return apply_filters( $this->func . '_registered_settings', array() );
		}

		/**
		 * Get a specific option of this panel from the database.
		 *
		 * @param string $key
		 * @param boolean $default
		 * @return mixed
		 */
		private function get_option( $key = '', $default = false ) {
			$option_key = $this->func . '_options';
			$options    = $GLOBALS[ $option_key ];

			$value = ! empty( $options[ $key ] ) ? $options[ $key ] : $default;
			$value = apply_filters( $this->func . '_get_option', $value, $key, $default );

			return apply_filters( $this->func . '_get_option_' . $key, $value, $key, $default );
		}

		/**
		 * Retrieve stored options from WordPress and populate the model into Vue.js
		 *
		 * @return array
		 */
		private function get_options() {

			$settings = array();

			// First retrieve all the registered settings.
			$registered_settings = $this->get_registered_settings();

			// Loop through each available setting, and setup the setting into the array.
			foreach ( $registered_settings as $setting_section ) {
				foreach ( $setting_section as $setting ) {
					$default                    = isset( $setting['std'] ) ? $setting['std'] : '';
					$settings[ $setting['id'] ] = $this->get_option( $setting['id'], $default );
				}
			}

			// Check if the option for this panel exists into the database.
			// If not, create an empty one.
			// If option exists, merge with available settings.
			if ( ! get_option( $this->func . '_settings' ) ) {
				update_option( $this->func . '_settings', $settings );
			} else {
				$settings = array_merge( $settings, get_option( $this->func . '_settings' ) );
			}

			return apply_filters( $this->func . '_get_settings', $settings );

		}

		/**
		 * Renders the settings page.
		 *
		 * @return void
		 */
		public function render_settings_page() {
			ob_start();
			include_once 'includes/views/settings-page.php';
			echo ob_get_clean();
		}

	}

}
