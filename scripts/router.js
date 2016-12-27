;var Router = (function ($) {
    var _public = {};

    let routes = {
        "#vehicle": function(params) {
            VehiclePage.render();
        },
        "#options": function (params) {
            let year, make, model;
            [year, make, model] = params.split('/');
            OptionsPage.render(year, make, model);
        },
        "#tires": function (params) {
            let width, aspRatio, rimDiameter;
            [width, aspRatio, rimDiameter] = params.split('/');
            TiresPage.render(width, aspRatio, rimDiameter);
        },
        "default" : VehiclePage.render
    };

    _public.navigateTo = function(route) {
        let defaultPageFunc = routes["default"];
        if (route && route.trim().length > 0) {
            let routeToken = route.split('/')[0];
            let params = route.split(routeToken)[1];
            if (params && params.length > 2) {
                params = params.substr(params.indexOf('/') + 1);
                if (params.lastIndexOf('/') == params.length - 1) {
                    params = params.substr(0, params.length - 1);
                }
            }
            let pageFunc = routes[routeToken];
            if (pageFunc) {
                pageFunc(params);
            }
        } else {
            defaultPageFunc();
        }
    }
    
    _public.init = function () {
        $(window).on('hashchange', function () {
            // On every hash change the render function is called with the new hash.
            // This is how the navigation of our app happens.
            _public.navigateTo(decodeURI(window.location.hash));
        });

        $(window).trigger('hashchange');
    }
    return _public;
})(jQuery);

$(function () {
    Router.init();
});