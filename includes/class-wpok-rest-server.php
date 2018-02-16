<?php

namespace TDP;

class WPOK_Rest_Server extends \WP_Rest_Controller {

	protected $namespace;

	protected $version;

	public function __construct() {
		$this->version   = 'v1';
		$this->namespace = 'wpok/' . $this->version;
	}

	public function register_routes() {

		register_rest_route( $this->namespace, '/records', array(
			array(
				'methods'  => \WP_REST_Server::READABLE,
				'callback' => array( $this, 'get_options' ),
				'permission_callback' => array( $this, 'get_options_permission' )
			),
		) );
		
		register_rest_route( $this->namespace, '/record/(?P<slug>(.*)+)', array(
			array(
				'methods'  => \WP_REST_Server::READABLE,
				'callback' => array( $this, 'get_option' ),
				'permission_callback' => array( $this, 'get_options_permission' )
			),
			array(
				'methods'  => \WP_REST_Server::EDITABLE,
				'callback' => array( $this, 'edit_option' ),
				'permission_callback' => array( $this, 'get_options_permission' )
			),
		) );

	}

	public function get_options( \WP_REST_Request $request ) {
		return wp_load_alloptions();
	}
	
	public function get_options_permission() {
		if ( ! current_user_can( 'install_themes' ) ) {
			return new \WP_Error( 'rest_forbidden', esc_html__( 'You do not have permissions to manage options.', 'wp-react-boilerplate' ), array( 'status' => 401 ) );
		}
		return true;
	}
	
	public function get_option( \WP_REST_Request $request ) {

		$data = array( 'test' => 'get_option' );
		
		return rest_ensure_response( $data );

	}
	
	public function edit_option( \WP_REST_Request $request ) {

		$data = array( 'test' => $_POST );
		
		return rest_ensure_response( $data );
		
	}

}