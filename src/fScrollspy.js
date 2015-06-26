/* =====================================================
 * @name		scrollspy.js
 * @refer		bootstrap-scrollspy.js
 * @fork		https://github.com/twbs/bootstrap/blob/master/js/scrollspy.js
 * @author		Frend
 * @version		1.0.0
 * @dependency	jQuery
 * @github		https://github.com/FrendEr/fScrollspy.js
 * ===================================================== */

!function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define(factory);
	} else if (typeof module != 'undefined' && module.exports) {
		module.exports = factory();
	} else {
		window[root] = factory();
	}
}('Scrollspy', function() {

	'use strict';

	Scrollspy.VERSION = '1.0.0';

	Scrollspy.DEFAULT = {
		scrollElement: 	window,
		offset: 		10,
		selector: 		'.nav a',
		activeCls: 		'on',
		reachSelector: 	$.noop,
		leaveSelector: 	$.noop,
		reachTarget: 	$.noop,
		leaveTarget: 	$.noop,
		scrollDown: 	$.noop,
		scrollUp: 		$.noop
	}

	//Scrollspy constructor
	//=====================
	function Scrollspy(options) {
		this.options = $.extend(Scrollspy.DEFAULT, options);
		this.$body = $(document.body);
		this.$scrollElement = $(this.options.scrollElement);
		this.scrollTopTmp = 0;
		this.selector = this.options.selector;
		this.selectorTop = $(this.selector).offset().top;
		this.activeCls = this.options.activeCls;
		this.activeTarget = null;
		this.targets = [];
		this.offsets = [];
		this.scrollHeight = 0;

		this.$scrollElement.on('scroll', $.proxy(this.process, this));
		this.refresh();
		this.process();
	}

	//return the listening element's scroll height
	//============================================
	Scrollspy.prototype.getScrollHeight = function() {
		return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
	}

	//(re)set the params and status
	//=============================
	Scrollspy.prototype.refresh = function() {
		var self = this;

		this.offsets = [];
		this.targets = [];
		this.scrollHeight = this.getScrollHeight();

		this.$body
		.find(this.selector)
		.map(function() {
			var $el = $(this);
			var href = $el.attr('href');
			var $href = /^#./.test(href) && $(href);

			return ($href && $href.length && $href.is(':visible') && [[$href.offset().top, href]]) || null;
		})
		.each(function() {
			self.offsets.push(this[0]);
			self.targets.push(this[1]);
		});

	}

	//init the params and init the events
	//===================================
	Scrollspy.prototype.process = function() {
		var offsets = this.offsets;
		var targets = this.targets;
		var scrollTopOrigin = this.$scrollElement.scrollTop();
		var scrollTop = scrollTopOrigin + this.options.offset;
		var scrollHeight = this.getScrollHeight();
		var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
		var maxTargetScroll = 0;
		var activeTarget = this.activeTarget;
		var tmp;

		maxTargetScroll = (function() {
			var count = $(targets[0]).offset().top;

			targets.forEach(function(target) {
				count += $(target).height();
			});
			return count;
		})();

		//get the scrolling direction
		if (scrollTopOrigin > this.scrollTopTmp) {
			//scrolling down
			this.options.scrollDown();
		} else {
			//scrolling up
			this.options.scrollUp();
		}
		this.scrollTopTmp = scrollTopOrigin;

		//page resize or other reasons make
		//the scrollElement's scrollHeight change,
		//then refresh to update
		if (this.scrollHeight != scrollHeight) {
			this.refresh();
		}

		//in max scroll area
		if (scrollTop >= $(targets[0]).offset().top && scrollTop <= maxTargetScroll) {
			this.options.reachTarget.call(this);
		}

		//leave max scroll area
		if (scrollTop >= maxTargetScroll) {
			this.options.leaveTarget.call(this);
			return;
		}

		//scrollElement has scroll to max,
		//if the active target is not the last
		//one, then set it to active
		if (scrollTop >= maxScroll) {
			activeTarget != (tmp = targets[targets.length - 1]) && this.activate(tmp);
			return;
		}

		//scrollElement has scroll in selector min,
		//fix the selector to the top
		if (scrollTopOrigin >= this.selectorTop) {
			this.options.reachSelector.call(this);
		}

		//scrollElement has scroll out selector min,
		//fix the selector to the top
		if (scrollTopOrigin <= this.selectorTop) {
			this.options.leaveSelector.call(this);
		}

		//scrollElement has scroll out min,
		//set the activeTarget to null and remove active class
		if (activeTarget && scrollTop <= offsets[0]) {
			this.activeTarget = null;
			this.clear();
		}

		for (var i = offsets.length; i--;) {
	    	activeTarget != targets[i]
	        && scrollTop >= offsets[i]
	        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
	        && this.activate(targets[i]);
	    }
	}

	//update the active target
	//========================
	Scrollspy.prototype.activate = function(target) {
		this.activeTarget = target;
		this.clear();

		$(this.selector + '[href="' + target + '"]').addClass(this.activeCls);
	}

	//clear the active status
	//=======================
	Scrollspy.prototype.clear = function() {
		$(this.selector + '.' + this.activeCls).removeClass(this.activeCls);
	}

	return Scrollspy;

});