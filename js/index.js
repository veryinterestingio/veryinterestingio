'use strict'




$('form.subscribe').submit(function(e) {
	var fields = {
		weekday: $(this).find('select[name=weekday]'),
		email: $(this).find('input[type=email]'),
		button: $(this).find('input[type=submit]')
	}
	var emailRegex = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

	e.preventDefault()
	var data = {
		email: fields.email.val(),
		weekday: fields.weekday.val(),
		utcOffset: - new Date().getTimezoneOffset()/60
	}
	if (!emailRegex.test(data.email)) {
		fields.email.fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).focus()
		return
	}
	fields.button.attr('disabled', 'disabled')
	$.post('//'+config.api.url+'/subscribe', data, function(data) {
		if (data.status === 'inserted') {
			alert('You successfully subscribed. Please confirm by clicking the link in the email we sent you.')
		} else if (data.status === 'updated') {
			alert('You successfully changed your subscription.')
		}
		fields.email.val('')
		fields.button.attr('disabled', null)
	})
	return false
})




$(document).on('click', '.post h2', function(e) {
	var $post = $(this).closest('.post')
	if (post.isExpanded($post)) {
		post.collapse($post)
	} else {
		post.expand($post)
	}
})

$(document).on('click', '.post .show', function(e) {
	var $post = $(this).closest('.post')
	post.expand($post)
})

$(document).on('click', '.post .collapse', function() {
	var $post = $(this).closest('.post')
	post.collapse($post)
	post.scrollToPostTop($post)
})

$(document).on('click', '.post .more-answers', function() {
	post.showMoreAnswers($(this).closest('.post'))
})

$(document).on('click', '.post .less-answers', function() {
	var $post = $(this).closest('.post')
	post.hideMoreAnswers($post)
	if ($(this).hasClass('lower')) {
		post.scrollToPostTop($post)
	}
})

$(document).on('click', '.post .answer .hide-replies', function() {
	post.hideReplies($(this).closest('.answer'))
})

$(document).on('click', '.post .answer .show-replies', function() {
	post.showReplies($(this).closest('.answer'))
})





var alreadyLoading = false
$(window).scroll(function() {
	if ($(window).scrollTop()+$(window).height()+200 >= $(document).height() && !alreadyLoading) {
		alreadyLoading = true

		var crnt = $('.post').length
		var next = allPostsHandles.slice(crnt, crnt+config.stream.catchup)
		var n = next.length
		var results = Array(n).fill(null)

		if (next.length === 0) {
			$('.posts-loader').hide()
		}

		$(next).each(function(i, e) {
			var handle = this
			$.get('/parts/posts/'+handle+'.html', function(html) {
				results[i] = html
				if (results.filter(function(e) {return e!==null}).length === n) {
					for (var j=0; j<n; ++j) {
						var newPost = $(results[j])
						post.checkSeen(newPost)
						$('.posts').append(newPost)
					}
					alreadyLoading = false
				}
			})
		})
	}
})
