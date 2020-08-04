// console.log('main.js')

$(function() {
    $('.card').hover(function() {
        // $(this).css('background','#e9ecef');
        $(this).find('.tools').css('visibility','visible');
    }, function() {
        // $(this).css('background','white');
        $(this).find('.tools').css('visibility','hidden');
    });
});