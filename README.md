# fScrollspy.js - 屏幕滚动插件
这个插件fork自bootstrap的[scrollspy.js](https://github.com/twbs/bootstrap/blob/master/js/scrollspy.js)，在使用上进行了定制和拓展。

## Init
```javascript
var scrollspy = new Scrollspy({
		scrollElement: window,
		offset: 45,
		
		selector: '.nav-list a',
		activeCls: 'on',
		reachSelector: function() {
			$('.nav-list').css({
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: 999
			});
		},
		leaveSelector: function() {
			$('.nav-list').css({
				position: 'static'
			});
		},
		
		reachTarget: function() {
			if (!$('.nav-list').is(':visible')) {
				$('.nav-list').show();
			}
		},
		leaveTarget: function() {
			if ($('.nav-list').is(':visible')) {
				$('.nav-list').hide();
			}
		},

		scrollDown: function() {
			$('#directionTips').text('scrolling down').fadeIn(400);
		},
		scrollUp: function() {
			$('#directionTips').text('scrolling up').fadeIn(400);
		}
	});
```

## Example
例子：[http://frender.github.io/fScrollspy.js](http://frender.github.io/fScrollspy.js)

## Options

- **scrollElement**: 监听滚动的元素，默认为window
- **offset**: 偏移量，为到达监听对象前后设置一个过渡距离
- **selector**: 选择器，在这里为监听滚动事件的导航元素
- **activeCls**: 选中状态下的导航元素的class
- **reachSelector**: 【回调函数】监听选择器到达最顶部的监听对象的事件
- **leaveSelector**: 【回调函数】监听选择器离开最顶部的监听对象的事件
- **reachTarget**: 【回调函数】监听选择器进入监听对象区域的事件
- **leaveTarget**: 【回调函数】监听选择器离开监听对象区域的事件
- **scrollDown**: 【回调函数】监听屏幕向下滚动的事件
- **scrollUp**: 【回调函数】监听屏幕向上滚动的事件
