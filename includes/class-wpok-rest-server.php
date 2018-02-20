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
 * @version    1.0.0
 * @copyright  (c) 2018 Alessandro Tesoro
 * @license    http://www.gnu.org/licenses/gpl-2.0.txt GNU LESSER GENERAL PUBLIC LICENSE
 * @package    wp-optionskit
 */
namespace TDP;

/**
 * Register WP API Rest controller to extend the WordPress API and store options from optionskit.
 */
class WPOK_Rest_Server extends \WP_Rest_Controller {

	/**
	 * OptionsKit Namespace
	 *
	 * @var string
	 */
	protected $namespace;

	/**
	 * OptionsKit API Version
	 *
	 * @var string
	 */
	protected $version;

	/**
	 * The slug of the options panel.
	 *
	 * @var string
	 */
	protected $slug;

	/**
	 * All the registered settings that we're going to parse.
	 *
	 * @var array
	 */
	protected $settings;

	/**
	 * Get controller started.
	 */
	public function __construct( $slug, $settings ) {
		
		$this->version   = 'v1';
		$this->slug      = $slug;
		$this->settings  = $settings;
		$this->namespace = 'wpok/' . $this->slug . '/' . $this->version;

		add_filter( $this->slug . '_settings_sanitize_text', array( $this, 'sanitize_text_field' ) );

	}

	/**
	 * Register new routes for the options kit panel.
	 *
	 * @return void
	 */
	public function register_routes() {

		register_rest_route( $this->namespace, '/records', array(
			array(
				'methods'             => \WP_REST_Server::EDITABLE,
				'callback'            => array( $this, 'save_options' ),
				'permission_callback' => array( $this, 'get_options_permission' ),
			),
		) );

	}

	/**
	 * Detect if the user can submit options.
	 *
	 * @return void
	 */
	public function get_options_permission() {
		if ( ! current_user_can( 'install_themes' ) ) {
			return new \WP_Error( 'rest_forbidden', 'WPOK: Permission Denied.', array( 'status' => 401 ) );
		}
		return true;
	}

	private function is_setting_registered( $field_id, $data ) {

		return in_array( $field_id, $data );

	}

	/**
	 * Flattens the set of registered settings and their type so we can easily sanitize all settings.
	 *
	 * @return void
	 */
	private function get_registered_settings_types() {

		$setting_types = array();

		foreach ( $this->settings as $setting_section ) {
			foreach ( $setting_section as $setting ) {
				$setting_types[ $setting['id'] ] = $setting['type'];
			}
		}

		return $setting_types;

	}

	/**
	 * Sanitize text fields.
	 *
	 * @param string $input
	 * @return string
	 */
	public function sanitize_text_field( $input ) {
		return trim( wp_strip_all_tags( $input, true ) );
	}
 
	/**
	 * Save options to the database. Sanitize them first.
	 *
	 * @param \WP_REST_Request $request
	 * @return void
	 */
	public function save_options( \WP_REST_Request $request ) {

		$registered_settings = $this->settings;
		$settings_received   = $_POST;
		$data_to_save        = array();

		// $setting_types = $this->get_registered_settings_types();

		if ( is_array( $registered_settings ) && ! empty( $registered_settings ) ) {
			foreach ( $registered_settings as $setting_section ) {
				foreach ( $setting_section as $setting ) {
					// Skip if no setting type.
					if ( ! $setting['type'] ) {
						continue;
					}

					// Skip if the ID doesn't exist in the data received.
					if ( ! array_key_exists( $setting['id'], $settings_received ) ) {
						continue;
					}

					$setting_type = $setting['type'];
					$output       = apply_filters( $this->slug . '_settings_sanitize_' . $setting_type, $settings_received[ $setting['id'] ] );

					if ( ! empty( $output ) ) {
						$data_to_save[ $setting['id'] ] = $output;
					}
				}
			}
		}

		$data = array( 'test' => $data_to_save );

		return rest_ensure_response( $data );

	}

}
