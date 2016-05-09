var React = require('react'),
    ReactDOM = require('react-dom'),
    ChatMessageInput = require('./ChatMessageInput.jsx'),
    ChatMessageList = require('./ChatMessageList.jsx');

var socket = io();

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
    getInitialState: function () {
        return {items: [], date: '', author: '', message: ''};
    },
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

        var component = this;
        socket.on('chat message', function (msg) {
            var nextItems = component.state.items;
            nextItems.unshift(msg);
            component.setState({items: nextItems});
        });
    },
    handleMessageSend: function (e) {
        messageSend()
    },
    render: function () {
        return (
            <div>
                <ChatMessageInput onClick={this.handleMessageSend}/>
                <ChatMessageList items={this.state.items}/>
            </div>
        );
    }
});

module.exports = ChatBox;