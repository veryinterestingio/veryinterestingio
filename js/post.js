'use strict'


var $post = $('.post')
post.expand($post)
post.showMoreAnswers($post)


$(document).on('click', '.post .answer .hide-replies', function() {
	post.hideReplies($(this).closest('.answer'))
})

$(document).on('click', '.post .answer .show-replies', function() {
	post.showReplies($(this).closest('.answer'))
})
