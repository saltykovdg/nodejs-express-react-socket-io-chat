var React = require('react');

var ChatMessageInput = function (props) {
    return (
        <div className="form-group" id="chat-message-input">
            <input id="author" type="text" className="form-control" placeholder="Введите ваше имя"/>

            <div className="form-group">
                <label htmlFor="messageArea"></label>
                <textarea className="form-control" id="messageArea" name="text" placeholder="Введите сообщение"
                          rows="3"></textarea>
            </div>
			<span className="pull-right chars-remaining-pf">
				<span id="charRemainingCntFld"></span>
				<button id="postBtn" className="btn btn-default" onClick={props.onClick}>Отправить сообщение</button>
			</span>
        </div>
    );
};

module.exports = ChatMessageInput;