var React = require('react');

var ChatMessageList = function (props) {
    var createMessage = function(item) {
        return <p key={item.date}>[{item.date}] {item.author}: {item.message}</p>;
    };
    return (
        <div>{props.items.map(createMessage)}</div>
    );
};

module.exports = ChatMessageList;