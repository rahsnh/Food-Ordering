// JavaScript Document

var modal = 'login_overlay';
var filter = 'filter_overlay';
var loc = 'location_overlay';
var geo_loc = 'geo_loc';

$(window).click(function(event) {
	"use strict";
	if (event.target.id == modal) {
		$('#login_overlay').fadeOut();
		$('.modal_content').fadeOut();
	}
	if (event.target.className == 'close') {
		$('#login_overlay').fadeOut();
		$('.modal_content').fadeOut();
	}
	if (event.target.id == filter) {
		$('#filter_overlay').fadeOut();
		$('.filter_content').fadeOut();
	}
	if (event.target.className == 'close') {
		$('#filter_overlay').fadeOut();
		$('.filter_content').fadeOut();
	}
	if (event.target.id == 'cancel-btn') {
		$('#filter_overlay').fadeOut();
		$('.filter_content').fadeOut();
	}
	if (event.target.className == loc) {
		$('.location_overlay').fadeOut();
		$('#geo_loc').fadeOut();
	}
	if (event.target.id == geo_loc) {
		$('.location_overlay').fadeOut();
		$('#geo_loc').fadeOut();
	}
});

function show_filter_div() {
	"use strict";
	$('.filter_menu_div').show();
	$('.filter_content').fadeIn("slow");
}

function currentLocation() {
	navigator.geolocation.getCurrentPosition(
            function( position ){ // success cb

                /* Current Coordinate */
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                var google_map_pos = new google.maps.LatLng( lat, lng );

                /* Use Geocoder to get address */
                var google_maps_geocoder = new google.maps.Geocoder();
                google_maps_geocoder.geocode(
                    { 'latLng': google_map_pos },
                    function( results, status ) {
                        if ( status == google.maps.GeocoderStatus.OK && results[0] ) {
														$('#curr_location').text(results[0].formatted_address);
                        }
                    }
                );
            },
            function(){ // fail cb
            }
        );
}

$(document).ready(function() {

	currentLocation();

	$('#curr_loc').click(function() {
		currentLocation();
		$('.location_overlay').fadeOut("fast");
	});

	"use strict";
	$('.search_div').click(function() {
		$('#big_searchbar').toggle();
		$('.menu_wrapper').toggleClass("active_menu");
	});

	$('.location').click(function() {
		$('.location_overlay').show();
		$('#geo_loc').slideDown("fast");
	});

	$('.login_signup').click(function() {
		$('.modal').show();
		$('.modal_content').fadeIn("slow");
	});

	$('.filter_icon').click(function() {
		$('.filter_menu_div').show();
		$('.filter_content').fadeIn("slow");
	});

	$('.cart_div').click(function() {
		$('#right_account_hover').hide();
		$('.cart_content_div').toggle();
	});

	$('#close_cart_btn').click(function() {
		$('#cart_overlay').fadeOut();
	});

	$('.logged_in').click(function() {
		$('.cart_content_div').hide();
		$('#right_account_hover').toggle();
	});
});

$(document).on('keyup',function(event) {
	if (event.keyCode == 27) {
		$('#login_overlay').fadeOut();
		$('.modal_content').fadeOut();
		$('#filter_overlay').fadeOut();
		$('.filter_content').fadeOut();
		$('.location_overlay').fadeOut();
		$('#geo_loc').fadeOut();
	}
});
