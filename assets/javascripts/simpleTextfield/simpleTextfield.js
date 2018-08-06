+function($) {
	'use strict';

	var Simpletextfield = function(element, options) {
		this.init(element, options);
	}

	Simpletextfield.DEFAULTS = {
  }

	Simpletextfield.prototype.init = function(element, options) {
    var $ele = $(element);
    if($ele.parent().find(".simplelabel").length == 0) {
      generateTemplate($ele);
    }

    var target = $ele.parent().find(".simplelabel");
    var inactive_target = $ele.parent().find(".simplelabel:not('.focus')");

    target.click(function() {
      if(!$(this).hasClass("focus")) {
        $ele.focus();
        focus_In($ele, target);
      }
    });

    $ele.on("focusin", function() {
      focus_In($(this), target);
    });

    $ele.on("focusout", function() {
      focus_Out($(this), target);
    });

    if($ele[0].localName == "textarea") {
      var ta = $ele[0];

      $(ta).keyup(function() {
        autoHeight(this);
      });
    }
	}

  function generateTemplate(ele) {
    var title = ele.data("title");
    var tooltip = ele.data("tooltip-title");
    if(tooltip) {
      var template = '<span class="simplelabel simpletooltip" data-tooltip-title="'+tooltip+'">'+title+'</span>';
    } else {
      var template = '<span class="simplelabel">'+title+'</span>';
    }
    ele.after(template);
  }

  function focus_In(ele, target) {
    target.addClass("focus");
    ele.addClass("focus");
  }

  function focus_Out(ele, target) {
    if(ele.val().length == 0) {
      target.removeClass("focus filled");
      ele.removeClass("focus");
    } else {
      target.addClass("filled").removeClass("focus");
      ele.removeClass("focus");
    }
  }

  function autoHeight(obj) {
    $(obj).height(30);
    $(obj).height(
      obj.scrollHeight + parseFloat($(obj).css("borderTopWidth")) + parseFloat($(obj).css("borderBottomWidth"))
    ); 
  }

	function Plugin(option) {
    return this.each(function() {
    	var $this   = $(this);
      var options = $.extend({}, Simpletextfield.DEFAULTS, option);
      new Simpletextfield(this, options);
    });
  }

  var old = $.fn.simpletextfield;

	$.fn.simpletextfield = Plugin;
	$.fn.simpletextfield.Constructor = Simpletextfield;

	$.fn.simpletextfield.noConflict = function() {
    $.fn.simpletextfield = old;
    return this;
  }
}(jQuery);