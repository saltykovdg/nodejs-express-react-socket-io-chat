var React = require('react'),
    ReactDOM = require('react-dom'),
    ChatBox = require('./components/ChatBox/ChatBox.jsx');

ReactDOM.render(
    <h1 className="page-header">My first chat on React and Socket.IO</h1>,
    document.getElementById('chat-header')
);

ReactDOM.render(
    <ChatBox/>,
    document.getElementById("chat-box")
);
