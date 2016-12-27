; var State = (function ($) {
    var _public = {};

    _public.Year;
    _public.Make;
    _public.Model;
    _public.Option;

    
    function onVehicleFound(e, year, make, model) {
        _public.Year = year;
        _public.Make = make;
        _public.Model = model;
        _public.Option = undefined; // clear any saved option as we're searching for a new vehicle

        let route = '#options';
        route += '/' + year;
        route += '/' + make;
        route += '/' + model;

        parent.history.pushState(null, null, window.localStorage.href);
        window.location.hash = route;
    }

    function onOptionFound(e, option) {
        if (!option || !option.SecWidth || !option.AspRatio || !option.Rim) {
            Status.errors(["Could not determine width, aspect ratio, and rim diameter from option " + option.AutoOption]);
            return;
        }
        _public.Option = option;

        let
            width = option.SecWidth,
            aspRatio = option.AspRatio,
            rimDiameter = option.Rim;

        let route = '#tires';
        route += '/' + width;
        route += '/' + aspRatio;
        route += '/' + rimDiameter;

        parent.history.pushState(null, null, window.location.href);
        window.location.hash = route;
    }

    const VEHICLE_MIC_LISTENING = "Listening for vehicle...";
    const VEHICLE_SEARCHING = "Searching for vehicle...";
    function onListeningForVehicle() {
        Status.status(VEHICLE_MIC_LISTENING);
    }
    function onSearchingForVehicle() {
        Status.status(VEHICLE_SEARCHING);
    }

    const OPTION_MIC_LISTENING = "Listening for option...";
    const OPTION_SEARCHING = "Searching for tires...";
    function onListeningForOption() {
        Status.status(OPTION_MIC_LISTENING);
    }
    function onSearchingForTires() {
        Status.status(OPTION_SEARCHING);
    }

    var previousPage;
    function onPageRenderBegin(e, prevPage) {
        if (prevPage && prevPage.length > 0) {
            previousPage = prevPage;
        }
    }

    function onPageRenderComplete(e, renderedPage) {
        if (previousPage) {
            previousPage.addClass('leaving-page').removeClass('active-page');
            renderedPage.addClass('active-page');
            setTimeout(function () {
                previousPage.removeClass('leaving-page');
            }, 1500);
        } else {
            renderedPage.addClass('active-page');
            previousPage = renderedPage;
        }
    }

    function onBackButtonClick() {
        parent.history.back();
        return false;
    }

    _public.init = function() {
        $(document).on('vehicle-found', onVehicleFound);
        $(document).on('option-found', onOptionFound);
        $(document).on('listening-for-vehicle', onListeningForVehicle);
        $(document).on('searching-for-vehicle', onSearchingForVehicle);

        $(document).on('listening-for-option', onListeningForOption);
        $(document).on('searching-for-tires', onSearchingForTires);

        $(document).on('page-render-begin', onPageRenderBegin);
        $(document).on('page-render-complete', onPageRenderComplete);

        $('.back-button').on('click', onBackButtonClick);
    }

    return _public;
})(jQuery);

$(function () {
    State.init();
});