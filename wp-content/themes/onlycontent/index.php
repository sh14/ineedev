<?php
get_header();

if ( is_singular() ) {
		while ( have_posts() ) : the_post();
			?>

			<main id="main" class="site-main" role="main">

				<?php the_content(); ?>

			</main>

		<?php endwhile;

}
elseif ( is_archive() || is_home() || is_search() ) {
		?>

		<main id="post-<?php the_ID(); ?>" <?php post_class(); ?>>


			<?php
			while ( have_posts() ) : the_post();
				printf( '<h1><a href="%s">%s</a></h1>', get_permalink(), get_the_title() );
				the_post_thumbnail();
				the_excerpt();
				comments_template();
			endwhile;

			the_tags( '<span class="tag-links">' . __( 'Tagged ', 'contentonly' ) . null, null, null, '</span>' );
			?>


			<div class="entry-links"><?php wp_link_pages(); ?></div>

			<?php global $wp_query;
			if ( $wp_query->max_num_pages > 1 ) { ?>
				<nav id="nav-below" class="navigation" role="navigation">
					<div class="nav-previous"><?php next_posts_link( sprintf( __( '%s older', 'contentonly' ), '<span class="meta-nav">&larr;</span>' ) ) ?></div>
					<div class="nav-next"><?php previous_posts_link( sprintf( __( 'newer %s', 'contentonly' ), '<span class="meta-nav">&rarr;</span>' ) ) ?></div>
				</nav>
			<?php } ?>

		</main>

		<?php
}
else {
		?>

		<main id="main" class="site-main" role="main">

			<header class="page-header">
				<h1 class="entry-title"><?php _e( 'The page cannot be found.', 'contentonly' ); ?></h1>
			</header>

			<div class="page-content">
				<p><?php _e( 'Sorry, nothing found at this location.', 'contentonly' ); ?></p>
			</div>

		</main>
		<?php
}
get_footer();
