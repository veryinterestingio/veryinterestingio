'use strict'




$('form.subscribe').submit(function(e) {
	var fields = {
		email: $(this).find('input[type=email]'),
		button: $(this).find('input[type=submit]')
	};
	var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	e.preventDefault();
	var data = {
		email: fields.email.val(),
		utcOffset: - new Date().getTimezoneOffset()/60
	}
	if (!emailRegex.test(data.email)) {
		fields.email.fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).focus();
		return;
	}
	fields.button.attr('disabled', 'disabled');
	$.post('//'+config.api.url+'/subscribe', data, function() {
	});
	return false;
});




$(document).on('click', '.post h2', function(e) {
	var $post = $(this).closest('.post');
	if (post.isExpanded($post)) {
		post.collapse($post);
	} else {
		post.expand($post);
	}
});

$(document).on('click', '.post .collapse', function() {
	var $post = $(this).closest('.post');
	post.collapse($post);
	post.scrollToPostTop($post);
});

$(document).on('click', '.post .more-answers', function() {
	post.showMoreAnswers($(this).closest('.post'));
});

$(document).on('click', '.post .less-answers', function() {
	var $post = $(this).closest('.post');
	post.hideMoreAnswers($post);
	if ($(this).hasClass('lower')) {
		post.scrollToPostTop($post);
	}
});

$(document).on('click', '.post .answer .hide-replies', function() {
	post.hideReplies($(this).closest('.answer'));
});

$(document).on('click', '.post .answer .show-replies', function() {
	post.showReplies($(this).closest('.answer'));
});





var alreadyLoading = false;
$(window).scroll(function() {
	if ($(window).scrollTop()+$(window).height()+200 >= $(document).height() && !alreadyLoading) {
		alreadyLoading = true;

		var n = config.stream.catchup;
		var crnt = $('.post').length;
		var next = allPostsHandles.slice(crnt, crnt+n);
		var results = Array(n).fill(null);

		if (next.length === 0) {
			$('.posts-loader').hide();
		}

		$(next).each(function(i, e) {
			var handle = this;
			$.get('/parts/posts/'+handle+'.html', function(html) {
				results[i] = html;
				if (results.filter(function(e) {return e!==null}).length === n) {
					for (var j=0; j<n; ++j) {
						$('.posts').append(results[j]);
					}
					alreadyLoading = false;
				}
			});
		});
	}
});