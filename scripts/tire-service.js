; var TireService = (function ($) {
    _public = {};

    var optionEndPoint;

    function addAuthorizationHeader(xhrObj) {
        xhrObj.setRequestHeader('Authorization', 'Bearer wZtbeZwn6894UF0jBb8uCsHXSyoBVR2Rc0zrzgGwXFTWEIe4zS2MVZ6BmeruOdlJrS6dmAyy9LKAEWbkzdgDMM87DZZMJZzqlwzOekG5YOQngmB_fGekYIDHycROne8Qy-rTBy7S5k5JiICMq5_3zb5qCaVPq3EQL1aDMZPBcPISlRllOS5ljlwcSAMOpjJoLGS8ACaarNWeKeBt5fJVOnEdtoGLG63TXUhtMV8_3zpIUf1oIhBNqUKHyBZnasLH0BkjfUEc5BjElPQcCLvthA');
    }

    _public.getOptions = function (year, make, model, onSuccess, onError) {
        let optionQuery = optionEndPoint;
        optionQuery += "?carManufacturer=" + make;
        optionQuery += "&carYear=" + year;
        optionQuery += "&carModel=" + model;

        return $.ajax({
            url: optionQuery,
            type: "GET",
            beforeSend: addAuthorizationHeader,
            success: onSuccess,
            fail: onError
        });
    }

    _public.getTires = function(width, aspectRatio, rimDiameter, onSuccess, onError) {
        let params = new TireSearchParams(width, aspectRatio, rimDiameter);
        let url = encodeURI("http://tiresanytime3dev.azurewebsites.net/api/TireSearchingApi/SearchTires?searchParams=" + JSON.stringify(params));

        return $.ajax({
            url: url,
            type: "GET",
            beforeSend: addAuthorizationHeader,
            success: onSuccess,
            error: onError
        })
    }

    _public.init = function () {
        optionEndPoint = "http://tiresanytime3dev.azurewebsites.net/api/TireSearchingApi/GetOptions";
    }

    return _public;
})(jQuery);

$(function () {
    TireService.init();
});