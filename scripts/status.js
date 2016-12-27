;var Status = (function ($) {
    var _public = {};
    var $root, statusUI, errorUI;

    _public.errors = function(errors) {
        if (!errors || !errors.length || errors.length <= 0) { return; }

        let errorsHtml = "";
        $.each(errors, function (i, error) {
            errorsHtml += error + "</br>\n";
        });

        statusUI.hide();
        errorUI.html(errorsHtml).show();
    }

    _public.status = function (message) {
        errorUI.hide();
        statusUI.text(message).show();
    }

    _public.clear = function () {
        statusUI.hide();
        errorUI.hide();
    }

    _public.init = function () {
        $root = $('#status');
        statusUI = $root.find('#notification');
        errorUI = $root.find('#errors');
        _public.clear();
    }

    return _public;
})(jQuery);

$(function () {
    Status.init();
})