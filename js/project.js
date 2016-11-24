'use strict'


var storage = {
	init: function() {
		if (typeof(Storage) === 'undefined') {
			$('html').addClass('no-storage')
		}
	},

	setPostSeen: function(handle) {
		if (typeof(Storage) === 'undefined') {
			return
		}
		localStorage.setItem('seen-'+handle, '1')
	},

	isPostSeen: function(handle) {
		if (typeof(Storage) === 'undefined') {
			return
		}
		return localStorage.getItem('seen-'+handle) === '1'
	}
}
storage.init()




var post = {
	init: function() {
		$('.post').each(function(i, e) {
			post.checkSeen($(e))
		})
		$('.posts').css({visibility: 'visible'})
	},
	checkSeen: function($post) {
		var handle = $post.attr('data-handle')
		if (storage.isPostSeen(handle)) {
			$post.addClass('seen')
		}
	},
	isExpanded: function($post) {
		return $post.hasClass('open')
	},
	expand: function($post) {
		$post.addClass('open seen')
		var handle = $post.attr('data-handle')
		storage.setPostSeen(handle)
		this._fetch('/parts/answers/'+handle+'.html', $post.find('.answers-placeholder'))
	},
	collapse: function($post) {
		$post.removeClass('open')
	},
	showMoreAnswers: function($post) {
		$post.addClass('all-answers')
	},
	hideMoreAnswers: function($post, jumpToTop) {
		$post.removeClass('all-answers')
	},
	showReplies: function($answer) {
		$answer.addClass('open')
		var handle = $answer.attr('data-handle')
		this._fetch('/parts/replies/'+handle+'.html', $answer.find('.replies-placeholder'))
	},
	hideReplies: function($answer) {
		$answer.removeClass('open')
	},
	scrollToPostTop: function($post) {
		if ($(window).scrollTop() > $post.position().top) {
			$(window).scrollTop($post.position().top-15)
		}
	},

	_fetch: function(url, placeholder) {
		if (placeholder.children().length === 0) {
			$.get(url, function(html) {
				placeholder.html(html)
			})
		}
	}
}
post.init()
