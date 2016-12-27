;var VehiclePage = (function ($) {
    var _public = {};
    var $root;

    _public.render = function () {
        $(document).trigger('page-render-begin', [$('.active-page')]);
        Status.clear();
        $(document).trigger('page-render-complete', [$root]);
    }

    var listeningToVehicleMic = false;
    function onVehicleMicClick() {
        if (!listeningToVehicleMic) {
            $(document).trigger('listening-for-vehicle');
            SpeechService.startListening(
                function (response) {
                    var car = getCarFromSpeechResponse(response);
                    if (car && car.year && car.make && car.model) {
                        $(document).trigger('vehicle-found', [car.year, car.make, car.model]);
                    } else {
                        Status.errors(errors);
                    }
                },
                function (response) {
                    if (response == -1) {
                        Status.errors(["No speech was detected.  Please try again."]);
                    } else {
                        Status.errors(["An unknown error occurred while trying to interpret speech.  Please try again."])
                    }
                }
            );
        } else {
            SpeechService.stopListening();
            $(document).trigger('searching-for-vehicle');
        }
        listeningToVehicleMic = !listeningToVehicleMic;
    }

    function getCarFromSpeechResponse(response) {
        let errors = [];
        let obj = response[0];
        console.log("Lexical:" + obj.lexical);
        console.log("Display: " + obj.display);

        let speechResult = obj.display;
        let tokens = speechResult.split(" ");

        var car = {};
        if (tokens.length <= 0) {
            console.log("No results found");
            return;
        }
        car.year = LocalSearch.findYear(tokens[0]);

        let modelIndex = 2;
        if (tokens.length > 1) {
            car.make = LocalSearch.findMake(tokens[1]);
            if (!car.make && tokens.length > 2) {
                // combine second and third tokens; maybe a two part name for make
                car.make = LocalSearch.findMake(tokens[1] + " " + tokens[2]);
                modelIndex++;
            }
        }

        if (tokens.length > modelIndex) {
            let firstModelToken = tokens[modelIndex];
            let modelStartIndex = speechResult.lastIndexOf(firstModelToken);
            car.model = speechResult.substr(modelStartIndex);
            car.model = car.model.replace(" ", "").replace(".", "").replace("?", "");
        }

        if (car.year) {
            console.log("Year: " + car.year);
        } else {
            errors.push("Could not determine year");
        }

        if (car.make) {
            console.log("Make: " + car.make);
        } else {
            errors.push("Could not determine make");
        }

        if (car.model) {
            console.log("Model: " + car.model);
        } else {
            errors.push("Could not determine model");
        }

        if (errors.length > 0) {
            errors.push("We heard: " + speechResult + ". Please try again.");
        }

        if (errors.length > 0) {
            Status.errors(errors);
        }
        return car;
    }

    _public.init = function () {
        $root = $('#vehicle-page');
        $('#vehicle-mic').on('click', onVehicleMicClick);
    }
    return _public;
})(jQuery);

$(function () {
    VehiclePage.init();
});