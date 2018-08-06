+function($) {
	'use strict';

	var Simpleselect = function(element, options) {
		this.init(element, options);
	}

	Simpleselect.DEFAULTS = {
    "state" : ""
  }

	Simpleselect.prototype.init = function(element, options) {
		var $ele = $(element);
    options.state = checkState(element);
    var template = generateTemplate(options);
    var html = $ele.wrap(template);

    $ele.on("change", function() {
      changeState(this, options);
    });
	}

  function generateTemplate(options) {
    var template = '<span class="icon-'+options.state+' inline-top" data-icon="'+options.state+'"></span>';

    return template;
  }

  function checkState(element) {
    var state = $(element).is(':checked') ? 'select' : 'unselect';

    return state;
  }

  function changeState(element, options) {
    var new_state = checkState(element);

    $(element).parent().toggleClass("icon-"+options.state+" icon-"+new_state).attr("data-icon", new_state);

    options.state = new_state;
  }

	function Plugin(option) {
    return this.each(function() {
    	var $this   = $(this);
      var options = $.extend({}, Simpleselect.DEFAULTS, option);
      new Simpleselect(this, options);
    });
  }

  var old = $.fn.simpleselect;

	$.fn.simpleselect = Plugin;
	$.fn.simpleselect.Constructor = Simpleselect;

	$.fn.simpleselect.noConflict = function() {
    $.fn.simpleselect = old;
    return this;
  }
}(jQuery);