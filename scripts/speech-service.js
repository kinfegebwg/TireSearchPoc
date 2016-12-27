; var SpeechService = (function ($) {
    _public = {};
    var client;
    _public.init = function () {
         client = Microsoft.CognitiveServices.SpeechRecognition.SpeechRecognitionServiceFactory.createMicrophoneClient(
            Microsoft.CognitiveServices.SpeechRecognition.SpeechRecognitionMode.shortPhrase,
            "en-us",
            "b0923e2d4f5f4a76a2905a4f74822ec4");
    }

    _public.startListening = function (onSuccess, onError) {
        if (!onSuccess || !onError) { return; }

        client.startMicAndRecognition();
        client.onFinalResponseReceived = onSuccess;
        client.onError = onError;
    }

    _public.stopListening = function () {
        client.endMicAndRecognition();
    }

    return _public;
})(jQuery);

$(function () {
    SpeechService.init();
});