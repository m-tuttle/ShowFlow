import React from 'react';

const Message = ({chat, user}) => (
    <li>
        {chat.content}
    </li>
);

export default Message;