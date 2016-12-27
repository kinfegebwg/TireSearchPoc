;var TiresPage = (function ($) {
    var _public = {};
    var $root, $tires;
    var foundTires = false; // No results is still a successful AJAX call, so manually track results

    _public.render = function (width, aspectRatio, rimDiameter) {
        $(document).trigger('page-render-begin', [$('.active-page')]);
        clearTiresUI();
        $(document).trigger('searching-for-tires');

        $.when(
            TireService.getTires(width, aspectRatio, rimDiameter, onTiresSuccess, onTiresError)
        ).done(function () {
            if (foundTires) {
                $(document).trigger('page-render-complete', [$root]);
            }
        });
    }

    function clearTiresUI() {
        $tires.empty();
    }

    function setTireResults(results) {
        let best, better, good;
        if (results.length > 0) {
            best = results[0];
        }
        if (results.length > 1) {
            better = results[1];
        }
        if (results.length > 2) {
            good = results[2];
        }

        clearTiresUI();
        populateTireResultTemplate('Best', best);
        populateTireResultTemplate('Better', better);
        populateTireResultTemplate('Good', good);
    }

    function populateTireResultTemplate(tireClass, data) {
        if (!data) { return; }
        if (!tireClass) { return; }

        let tiresContainer = document.getElementById('tires');
        let viewModel = {};
        viewModel.tireClass = tireClass;
        viewModel.logoImagePath = data.BrandImageUrl || "";
        viewModel.tireImagePath = data.ImageUrl || "";
        viewModel.productName = data.ProductName;
        viewModel.tireDescription = data.TireDescription;
        viewModel.tireSize = data.TireSizeField || data.DisplayTireSize || data.TireSize;

        var ctx = new Stamp.Context();
        var expanded = Stamp.expand(ctx.import('tire'), viewModel);
        Stamp.appendChildren(tiresContainer, expanded);
    }

    function onTiresSuccess(data) {
        console.log(data);
        foundTires = false
        if (!data || !data.AdditionalTires || !data.AdditionalTires.TireResult) {
            Status.errors(["Cannot interpret tire results"]);
        } else if (data.AdditionalTires.TireResult.length <= 0) {
            let name = State.option.AutoOption || "";
            let size = State.option.TireSizeField || "";
            Status.errors(["No tires found for option " + name + " " + size]);
        } else {
            foundTires = true;
            setTireResults(data.AdditionalTires.TireResult);
            Status.clear();
        }
    }

    function onTiresError(request, status, error) {
        foundTires = false;
        Status.errors(["Error finding tires: ", error]);
    }

    _public.init = function () {
        $root = $('#tires-page');
        $tires = $root.find('#tires');
    }

    return _public;
})(jQuery);

$(function () {
    TiresPage.init();
});