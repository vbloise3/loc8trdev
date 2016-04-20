/**
 * Created by vincebloise on 4/19/16.
 */
$('#addReview').submit(function (e) {
    $('.alert.alert-danger').hide();
    if (!$('input#name').val() || !$('select#rating').val() || !$('textarea#review').val()) {
        if ($('.alert.alert-danger').length) {
            $('.alert.alert-danger').show();
        } else {
            $(this).prepend('<div role="alert" class="alert alert-danger">All fields required asswipe, please try again</div>');
        }
        return false;
    }
});