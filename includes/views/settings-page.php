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
			Test
		</div>
	</section>
	<div class="wp-filter" id="optionskit-navigation">
		<ul class="filter-links">
			<li>
				<a href="#">Test</a>
			</li>
		</ul>
	</div>
</section>
