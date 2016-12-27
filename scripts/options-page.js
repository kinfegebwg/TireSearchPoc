;var OptionsPage = (function ($) {
    var _public = {};

    var $root, $options, $thumbnail, $carTitle;
    var foundOptions = false; // It's an AJAX success to find no options, so manually track it
    _public.render = function (year, make, model) {
        $(document).trigger('page-render-begin', [$('.active-page')]);
        // If any option is saved we're not searching for a new vehicle's options
        // and thus don't need to update the state of this page at all.
        if (!State.Option) {
            clearOptionsPageUI();
            $(document).trigger('searching-for-vehicle');

            let carDesc = year + " " + make + " " + model;
            $carTitle.text(carDesc);

            $.when( 
                BingSearchService.search(carDesc, onImageSearchSuccess, onImageSearchError),
                TireService.getOptions(year, make, model, onOptionsSuccess, onOptionsError)
            ).done(function(imageSearch, optionSearch) {
                if (foundOptions) {
                    pageRenderComplete();
                }
            });
        } else {
            pageRenderComplete();
        }
    }

    function pageRenderComplete() {
        Status.clear();
        $(document).trigger('page-render-complete', [$root]);
    }

    function onImageSearchSuccess(data) {
        console.log(data);
        if (data && data.value && data.value.length > 0 && data.value[0].thumbnailUrl) {
            let url = data.value[0].thumbnailUrl;
            $thumbnail.attr('src', url).show();
        }
    }

    function onImageSearchError() {
        Status.errors(["Error occurred searching for vehicle image"]);
    }

    function onOptionsSuccess(data) {
        if (data && data.length > 0) {
            foundOptions = true;
            $options.empty();

            $.each(data, function (i, data) {
                let text = data.AutoOption + " (" + data.TireSizeField + ")";
                $options.append($('<li>', {
                    id: data.AutoOption,
                    text: text
                }));
            });
            console.log(data);
            LocalSearch.setOptions(data);
        } else {
            onOptionsError();
        }
    }

    function onOptionsError() {
        foundOptions = false;
        Status.errors(["No options found for this vehicle"]);
    }

    var listeningToOptionMic = false;
    function onOptionMicClick(e) {
        e.stopPropagation();
        if (!listeningToOptionMic) {
            $(document).trigger('listening-for-option');

            SpeechService.startListening(
                function (response) {
                    var option = getOptionFromSpeechResponse(response);
                    if (option) {
                        $(document).trigger('option-found', [option])
                    }
                }, function (response) {
                    if (response == -1) {
                        Status.errors(["No speech was detected.  Please try again."]);
                    } else {
                        Status.errors(["An unknown error occurred while trying to interpret speech.  Please try again."])
                    }
                }
            );
        } else {
            $(document).trigger('searching-for-tires');
            SpeechService.stopListening();
        }
        listeningToOptionMic = !listeningToOptionMic;
    }

    function getOptionFromSpeechResponse(response) {
        let obj = response[0];
        let speechResult = obj.display;
        speechResult = speechResult.replace("?", "").replace(".", "");

        let option = LocalSearch.findOption(speechResult);
        if (!option) {
            Status.errors([
                "Could not find option",
                "We heard: " + speechResult + ". Please try again."
            ]);
            return;
        }
        return option;
    }

    function clearOptionsPageUI() {
        $options.empty();
        $thumbnail.attr('src', '').hide();
    }

    _public.init = function () {
        $root = $('#options-page');
        $options = $root.find('#options');
        $thumbnail = $root.find('#car-thumbnail');
        $carTitle = $root.find('#car');

        $root.find('#options-mic').on('click', onOptionMicClick);
    }

    return _public;
})(jQuery);

$(function () {
    OptionsPage.init();
})