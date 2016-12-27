var LocalSearch = (function($) {
    let _public = {};

    var manufacturers = {};
    var years = {};
    var manufacturerData = ManufacturerData;
    var numbersToText = NumbersToText;
    var optionsIndex = {};

    function buildSearchIndex() {
        var lowBoundYear = 1920;
        var nextYear = (new Date()).getFullYear() + 1;
        for (let i = lowBoundYear; i <= nextYear; i++) {
            let yearStr = i.toString();
            let twoDigitYearStr = yearStr.substr(2, 2);
            years[yearStr] = yearStr;
            years[twoDigitYearStr] = yearStr;
        }

        for (let i = 0; i < manufacturerData.length; i++) {
            let manufacturer = manufacturerData[i];
            manufacturers[manufacturer.token] = manufacturer.value;
        }
    }

    /**
     * Build a search index from the given options data
     */
    _public.setOptions = function(data) {
        optionsIndex = {};
        $.each(data, function (i, option) {
            let optionNumber = i + 1;
            optionsIndex[optionNumber] = option;
            optionsIndex["option " + optionNumber] = option;
            optionsIndex["number " + optionNumber] = option;
            optionsIndex["option number " + optionNumber] = option;
            let textNumber = numbersToText[optionNumber];
            optionsIndex[textNumber] = option;
            optionsIndex["option " + textNumber] = option;
            optionsIndex["number " + textNumber] = option;
            optionsIndex["option number " + textNumber] = option;
            optionsIndex[option.AutoOption.toLowerCase()] = option;
        });
    }

    /**
     * Get the full option object from the search index based on the given token
     */
    _public.findOption = function(token) {
        return optionsIndex[token.toLowerCase()];
    }

    /** 
     * Get a year from the search index based on the given token
     */
    _public.findYear = function(token) {
        return years[token.toLowerCase()];
    }

    /** 
     * Get a Make from the search index based on the given token
     */
    _public.findMake = function(token) {
        return manufacturers[token.toLowerCase()];
    }

    _public.init = function () {
        buildSearchIndex();
    }

    return _public;
})(jQuery);

$(function() {
    LocalSearch.init();
});