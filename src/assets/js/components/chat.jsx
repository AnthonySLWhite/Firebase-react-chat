import { Chat } from '../index';
import React from 'react';
import ReactDOM from 'react-dom';
export default function userChat(props) {
  return (
    <div className="chat">
      <div id="messages" />
      <div id="chat-actions">
        <input type="text" id="message" />
        <button id="sendMessage" />
      </div>
    </div>
  );
}
