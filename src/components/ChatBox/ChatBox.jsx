var React = require('react'),
    ReactDOM = require('react-dom'),
    ChatMessageInput = require('./ChatMessageInput.jsx');

var socket = io();
socket.on('chat message', function (msg) {
    $('#chat-message-input').after($('<p>').text('[' + msg.date + '] - ' + msg.author + ': ' + msg.message));
});

function messageSend() {
    var author = $('#author');
    var messageArea = $('#messageArea');
    if (messageArea.val() && author.val()) {
        var msg = {
            author: author.val(),
            message: messageArea.val()
        };
        socket.emit('chat message', msg);
        messageArea.val('');
    }
    return false;
}

var ChatBox = React.createClass({
    componentDidMount: function () {
        var messageArea = $('#messageArea');
        messageArea.countRemainingChars({
            countFld: 'charRemainingCntFld',
            charsMaxLimit: 1000,
            charsWarnRemaining: 5,
            blockInputAtMaxLimit: false
        });

        // taId is the id of the textArea field which triggered the event
        messageArea.on("overCharsMaxLimitEvent", function (event, taId) {
            $('#postBtn').prop("disabled", true);
        });
        messageArea.on("underCharsMaxLimitEvent", function (event, taId) {
            $('#postBtn').prop("disabled", false);
        });

        messageArea.keydown(function (e) {
            if (e.ctrlKey && e.keyCode == 13) {
                messageSend();
            }
        });
    },
    handleMessageSend: function (e) {
        messageSend()
    },
    render: function () {
        return (
            <ChatMessageInput onClick={this.handleMessageSend}/>
        );
    }
});

module.exports = ChatBox;