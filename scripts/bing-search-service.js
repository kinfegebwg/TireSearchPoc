; var BingSearchService = (function ($) {
    _public = {};

    var bingSearchKey, bingEndpoint;

    _public.search = function(query, onSuccess, onError) {
        let searchQuery = bingEndPoint;
        searchQuery += "?q=" + query;
        searchQuery += "&safeSearch=Strict";
        searchQuery += "&count=1";

        return $.ajax({
            url: searchQuery,
            beforeSend: addBingSearchHeaders,
            type: "GET",
            success: onSuccess,
            error: onError
        });
    }

    function addBingSearchHeaders(xhrObj) {
        xhrObj.setRequestHeader("Content-Type", "multipart/form-data");
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", bingSearchKey);
    }

    _public.init = function () {
        bingSearchKey = "597a9a7afb3a4dd8a8d1c4859b2b4ebf";
        bingEndPoint = "https://api.cognitive.microsoft.com/bing/v5.0/images/search";
    }

    return _public;
})(jQuery);

$(function () {
    BingSearchService.init();
});