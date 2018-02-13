<form method="post" action="options.php" class="optionskit-form">
	<section id="optionskit-panel" class="optionskit-panel-container wrap">
		<section id="optionskit-topbar">
			<h1><?php echo esc_html( $this->page_title ); ?></h1>
			<?php if ( is_array( $this->action_buttons ) && ! empty( $this->action_buttons ) ) : ?>
			<ul class="title-links">
				<?php foreach ( $this->action_buttons as $button ) : ?>
				<li>
					<a href="<?php echo esc_url( $button['url'] ); ?>" class="page-title-action"><?php echo esc_html( $button['title'] ); ?></a>
				</li>
				<?php endforeach; ?>
			</ul>
			<?php endif; ?>
			<div class="save-area">
				<?php if ( ! in_array( $active_tab, apply_filters( $this->func . '_unsavable_tabs', array() ) ) ) : ?>
					<?php submit_button(); ?>
				<?php endif; ?>
			</div>
		</section>
		<div class="wp-filter" id="optionskit-navigation">
			<ul class="filter-links">
				<?php
				foreach ( $this->get_settings_tabs() as $tab_id => $tab_name ) :
					$tab_url = add_query_arg( array(
						'settings-updated' => false,
						'tab'              => $tab_id,
					) );
					// Remove the section from the tabs so we always end up at the main section.
					$tab_url = remove_query_arg( 'section', $tab_url );
					$active  = $active_tab == $tab_id ? ' current' : '';

				?>
				<li>
					<a href="<?php echo esc_url( $tab_url ); ?>" title="<?php echo esc_attr( $tab_name ); ?>" class="<?php echo $active; ?>"><?php echo esc_html( $tab_name ); ?></a>
				</li>
				<?php endforeach; ?>
			</ul>
		</div>
		<?php
		$number_of_sections = count( $sections );
		$number             = 0;

		if ( $number_of_sections > 1 ) :
		?>
		<div class="optionskit-subnav">
			<ul>
				<?php
				foreach ( $sections as $section_id => $section_name ) :
					$number++;
					$class   = '';
					$tab_url = add_query_arg( array(
						'settings-updated' => false,
						'tab'              => $active_tab,
						'section'          => $section_id,
					) );
					if ( $section == $section_id ) {
						$class = 'current';
					}
				?>
				<li><a href="<?php echo esc_url( $tab_url ); ?>" class="<?php echo esc_attr( $class ); ?>"><?php echo esc_html( $section_name ); ?></a> <span>|</span></li>
				<?php endforeach; ?>
			</ul>
		</div>
		<?php endif; ?>
	</section>
	<table class="form-table">
		<?php
			settings_fields( $this->func . '_settings' );
			do_action( $this->func . '_settings_tab_top_' . $active_tab . '_' . $section );
			do_settings_sections( $this->func . '_settings_' . $active_tab . '_' . $section );
			do_action( $this->func . '_settings_tab_bottom_' . $active_tab . '_' . $section );
		?>
	</table>
	<?php if ( ! in_array( $active_tab, apply_filters( $this->func . '_unsavable_tabs', array() ) ) ) : ?>
		<p class="save-button"><?php submit_button(); ?></p>
	<?php endif; ?>
</form>
