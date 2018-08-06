+function($) {
	'use strict';

	var Simplemenu = function(element, options) {
		this.init(element, options);
	}

	Simplemenu.DEFAULTS = {
    "trigger": "hover"
	}

	Simplemenu.prototype.init = function(element, options) {
		var $element = $(element);
    var trigger = options.trigger = $element.find("a[data-toggle]").data("trigger");

    $element.find("a[data-toggle]").addClass("dropdown-enabled");

    if(trigger == "hover") {
      $element.bind("mouseover", function() {
        $(this).find(".dropdown").show();
      });
      $element.bind("mouseout", function() {
        $(this).find(".dropdown").hide();
      });
    } else {
      $element.bind("click", function() {
        $(this).find(".dropdown").toggle();
      });
    }
	}

	function Plugin(option) {
    return this.each(function() {
    	var $this   = $(this);
      var options = $.extend({}, Simplemenu.DEFAULTS, option);
      var target = $this.find("[data-toggle='dropdown']");

      if(!target.hasClass("dropdown-enabled")) {
        new Simplemenu(this, options);
      }
    });
  }

  var old = $.fn.simplemenu;

	$.fn.simplemenu = Plugin;
	$.fn.simplemenu.Constructor = Simplemenu;

	$.fn.simplemenu.noConflict = function() {
    $.fn.simplemenu = old;
    return this;
  }
}(jQuery);