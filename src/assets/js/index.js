import '../css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ChatApp from './app';
const Chat = ChatApp(1);
const renderMsgs = messages => {
  console.log(messages);
  const msgs = [];
  Object.keys(messages).map(key => {
    const x = messages[key];
    msgs.push(
      <p>
        <b>{x.from}: </b>
        {x.message}
      </p>,
    );
  });
  return msgs;
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: {} };
  }
  componentDidMount() {
    window.debug = Chat.debug;
    if (Chat.users.exists()) {
      Chat.users
        .oldUser()
        .then(x =>
          console.log(
            x
              ? 'Old user logged in'
              : 'No user detected in database',
          ),
        );
    }
  }

  render() {
    return (
      <div>
        <div id="chat">
          <div id="messages">
            {renderMsgs(this.state.messages)}
          </div>
          <input type="text" id="text" />
        </div>
        <button
          id="createUser"
          onClick={() => Chat.users.createUser()}
        >
          Anonymous Chat
        </button>
        <button
          id="login"
          onClick={() => {
            const email = document.getElementById('text');
            Chat.users
              .login(email.value)
              .then(x =>
                console.log(x ? 'Logged in' : 'Error loging in'),
              );
            email.value = '';
          }}
        >
          Log in / Sign in
        </button>
        <button id="logOff">Log off...</button>
        <button id="saveUser">Save User</button>
        <button
          id="getMsgs"
          onClick={() =>
            Chat.msgs.get(x => this.setState({ messages: x }))
          }
        >
          Get Messages
        </button>
        <button
          id="sendMsgs"
          onClick={() => {
            const text = document.getElementById('text');
            Chat.msgs.send(text.value);
            text.value = '';
          }}
        >
          Send Messages
        </button>
      </div>
    );
  }
}
const el = document.getElementById('root');
ReactDOM.render(<App />, el);
