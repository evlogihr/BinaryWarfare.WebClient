$(function () {
    var chat = $.connection.message;

    chat.client.displayMessage = function (message) {
        $("#messages").prepend("<li>" + message + "</li>");
    }
    $.connection.hub.start().done(function () {
        $("#send").click(function () {
            chat.server.sendMessage(localStorage.getItem("nickname") + ' : ' + $("#message").val())
        });
    });
});