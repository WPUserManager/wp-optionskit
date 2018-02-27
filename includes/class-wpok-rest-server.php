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
	 * Store errors here.
	 *
	 * @var object
	 */
	protected $errors;

	/**
	 * Get controller started.
	 */
	public function __construct( $slug, $settings ) {

		$this->version   = 'v1';
		$this->slug      = $slug;
		$this->settings  = $settings;
		$this->namespace = 'wpok/' . $this->slug . '/' . $this->version;

		// Create a new instance of WP_Error
		$this->errors = new \WP_Error();

		add_filter( $this->slug . '_settings_sanitize_text', array( $this, 'sanitize_text_field' ), 3, 10 );
		add_filter( $this->slug . '_settings_sanitize_textarea', array( $this, 'sanitize_textarea_field' ), 3, 10 );
		add_filter( $this->slug . '_settings_sanitize_radio', array( $this, 'sanitize_text_field' ), 3, 10 );
		add_filter( $this->slug . '_settings_sanitize_select', array( $this, 'sanitize_text_field' ), 3, 10 );
		add_filter( $this->slug . '_settings_sanitize_checkbox', array( $this, 'sanitize_checkbox_field' ), 3, 10 );
		add_filter( $this->slug . '_settings_sanitize_multiselect', array( $this, 'sanitize_multiple_field' ), 3, 10 );
		add_filter( $this->slug . '_settings_sanitize_multicheckbox', array( $this, 'sanitize_multiple_field' ), 3, 10 );
		add_filter( $this->slug . '_settings_sanitize_file', array( $this, 'sanitize_file_field' ), 3, 10 );

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

	/**
	 * Sanitize the text field.
	 *
	 * @param string $input
	 * @param object $errors
	 * @param array $setting
	 * @return string
	 */
	public function sanitize_text_field( $input, $errors, $setting ) {
		return trim( wp_strip_all_tags( $input, true ) );
	}

	/**
	 * Sanitize textarea field.
	 *
	 * @param string $input
	 * @param object $errors
	 * @param array $setting
	 * @return string
	 */
	public function sanitize_textarea_field( $input, $errors, $setting ) {
		return stripslashes( wp_kses_post( $input ) );
	}

	/**
	 * Sanitize multiselect and multicheck field.
	 *
	 * @param mixed $input
	 * @param object $errors
	 * @param array $setting
	 * @return array
	 */
	public function sanitize_multiple_field( $input, $errors, $setting ) {

		$new_input = array();

		if ( is_array( $input ) && ! empty( $input ) ) {
			foreach ( $input as $key => $value ) {
				$new_input[ sanitize_key( $key ) ] = sanitize_text_field( $value );
			}
		}

		if ( ! empty( $input ) && ! is_array( $input ) ) {
			$input = explode( ',', $input );
			foreach ( $input as $key => $value ) {
				$new_input[ sanitize_key( $key ) ] = sanitize_text_field( $value );
			}
		}

		return $new_input;

	}

	/**
	 * Sanitize urls for the file field.
	 *
	 * @param string $input
	 * @param object $errors
	 * @param array $setting
	 * @return void
	 */
	public function sanitize_file_field( $input, $errors, $setting ) {
		return esc_url( $input );
	}

	/**
	 * Sanitize the checkbox field.
	 *
	 * @param string $input
	 * @param object $errors
	 * @param array $setting
	 * @return void
	 */
	public function sanitize_checkbox_field( $input, $errors, $setting ) {

		$pass = false;

		if ( $input == 'true' ) {
			$pass = true;
		}

		return $pass;

	}

	/**
	 * Save options to the database. Sanitize them first.
	 *
	 * @param \WP_REST_Request $request
	 * @return void
	 */
	public function save_options( \WP_REST_Request $request ) {

		check_ajax_referer( 'wpok_verifynonce', 'verifynonce' );

		$registered_settings = $this->settings;
		$settings_received   = $_POST;
		$data_to_save        = array();

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

					// Sanitize the input.
					$setting_type = $setting['type'];
					$output       = apply_filters( $this->slug . '_settings_sanitize_' . $setting_type, $settings_received[ $setting['id'] ], $this->errors, $setting );
					$output       = apply_filters( $this->slug . '_settings_sanitize_' . $setting['id'], $output, $this->errors, $setting );

					if ( $setting_type == 'checkbox' && $output == false ) {
						continue;
					}

					// Add the option to the list of ones that we need to save.
					if ( ! empty( $output ) && ! is_wp_error( $output ) ) {
						$data_to_save[ $setting['id'] ] = $output;
					}
				}
			}
		}

		if ( ! empty( $this->errors->get_error_codes() ) ) {
			return new \WP_REST_Response( $this->errors, 422 );
		}

		update_option( $this->slug . '_settings', $data_to_save );

		return rest_ensure_response( $data_to_save );

	}

}
