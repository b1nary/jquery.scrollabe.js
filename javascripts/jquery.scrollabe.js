/*
 * (sexy) jQuery plugin for scrolling to anchor on click or page load
 * Author: Roman Pramberger @talkb1nary
 *
 * Version: 0.1 
 * Licensed under the WTFPL license
 *
 * Example usage:
 *   $('body, html').scrollabe({ speed: 2000, listenLink: null })
 *
 * Tested & working on (not really, this part gets updated soon):
 *   > Chrome >= 1 (???)
 *   > Firefox >= 3.6 (???)
 *   > IE >= 6 (???)
 */

;(function ( $, window, document, undefined ) {
    
	var	pluginName = 'scrollabe',
		defaults = {
			speed: 1000,
			easing: 'swing',
			listenLink: 'a[href^="#"]'
		};


	function Plugin( element, options ) {
		this.element = element;
		this.options = $.extend( {}, defaults, options) ;
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init();
	}

	Plugin.prototype.init = function () {
		// Scroll to anchor (onload)
		if(window.location.hash != undefined){
			$(this.element).css('scrollTop', '0px'); // Gecko
			var offs = $(window.location.hash).offset();
			if(offs != undefined){
				$(this.element).animate({
					'scrollTop': offs.top
				}, this.options.speed, this.options.easing);
			}
		}
		
		// Track mouse scrolling events to kill the animation
		$(this.element).bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function(e){
			if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel"){
				$("html,body").stop();
			}
		})
		
		// Scroll on click
		if(this.options.listenLink != null){
			var that = this;
			$(this.options.listenLink).on('click', function(e){
				e.preventDefault();
				
				$(that.element).animate({
					scrollTop: $($(e.target).attr('href')).offset().top
				}, that.options.speed, that.options.easing);

				return false;
			});
		}
	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
			}
		});
	}

})( jQuery, window, document );