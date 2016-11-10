'use strict'


var post = {
	isExpanded: function($post) {
		return $post.hasClass('open');
	},
	expand: function($post) {
		$post.addClass('open');
		var handle = $post.attr('data-handle');
		this._fetch('/parts/answers/'+handle+'.html', $post.find('.answers-placeholder'))
	},
	collapse: function($post) {
		$post.removeClass('open');
	},
	showMoreAnswers: function($post) {
		$post.addClass('all-answers');
	},
	hideMoreAnswers: function($post, jumpToTop) {
		$post.removeClass('all-answers');
	},
	showReplies: function($answer) {
		$answer.addClass('open');
		var handle = $answer.attr('data-handle');
		this._fetch('/parts/replies/'+handle+'.html', $answer.find('.replies-placeholder'))
	},
	hideReplies: function($answer) {
		$answer.removeClass('open');
	},
	scrollToPostTop: function($post) {
		if ($(window).scrollTop() > $post.position().top) {
			$(window).scrollTop($post.position().top-15);
		}
	},

	_fetch: function(url, placeholder) {
		if (placeholder.children().length === 0) {
			$.get(url, function(html) {
				placeholder.html(html);
			});
		}
	}
};
