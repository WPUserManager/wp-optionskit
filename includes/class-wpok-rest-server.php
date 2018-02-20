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
	 * Get controller started.
	 */
	public function __construct( $slug ) {
		$this->version   = 'v1';
		$this->namespace = 'wpok/' . $slug . '/' . $this->version;
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

	public function save_options( \WP_REST_Request $request ) {

		$data = array( 'PUPA LOCAAAAAAAAA' => $_POST );

		return rest_ensure_response( $data );

	}

}