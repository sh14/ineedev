<?php

if( ! defined( 'ABSPATH' ) ) exit;

class SC_Admin_Tools{

    public static function init(){

        // Register the action for admin ajax features
        add_action( 'wp_ajax_sc_insert_window', array( __CLASS__, 'insert_window' ) );

        // Add TinyMCE button
        add_action( 'admin_init', array( __class__, 'register_mce' ) );

        add_action( 'wp_enqueue_editor', array( __class__, 'enqueue_insert_scripts' ) );

        // Gutenberg block
        add_action( 'init', array( __class__, 'register_block' ) );

    }

    public static function register_mce(){

        add_filter( 'mce_buttons', array( __class__, 'register_mce_button' ) );

        add_filter( 'mce_external_plugins', array( __class__, 'register_mce_js' ) );

    }

    public static function register_mce_button( $buttons ){

        if( self::is_sc_edit_page() )
            return $buttons;

        array_push( $buttons, 'separator', 'shortcoder' );
        return $buttons;

    }
    
    public static function register_mce_js( $plugins ){

        if( self::is_sc_edit_page() )
            return $plugins;

        $plugins[ 'shortcoder' ] =  SC_ADMIN_URL . '/js/tinymce/editor_plugin.js';
        return $plugins;

    }

    public static function register_block(){

        if( !function_exists( 'register_block_type' ) ){
            return false;
        }

        wp_register_script(
            'shortcoder', SC_ADMIN_URL . '/js/blocks/shortcoder.js', array( 'wp-blocks', 'wp-element' )
        );

        register_block_type( 'shortcoder/shortcoder', array(
            'editor_script' => 'shortcoder',
        ));
     
    }

    public static function enqueue_insert_scripts(){

        if( self::is_sc_edit_page() || !is_admin() )
            return;

        wp_enqueue_script( 'sc-tools-js', SC_ADMIN_URL . 'js/script-tools.js', array( 'jquery' ), SC_VERSION );

        wp_enqueue_style( 'sc-tools-css', SC_ADMIN_URL . 'css/style-tools.css', array(), SC_VERSION );

        wp_localize_script( 'sc-tools-js', 'SC_INSERT_VARS', array(
            'insert_page' => admin_url( 'admin-ajax.php?action=sc_insert_window' ),
            'popup_title' => __( 'Insert shortcode to editor', 'shortcoder' ),
            'popup_opened' => false,
            'block_editor' => false
        ));

    }

    public static function insert_window(){

        include_once( 'insert.php' );
        die(0);

    }

    public static function is_sc_edit_page(){

        if( !is_admin() ){
            return false;
        }

        $screen = get_current_screen();
        return ( $screen->post_type == SC_POST_TYPE && $screen->base == 'post' );

    }

}

SC_Admin_Tools::init();

?>