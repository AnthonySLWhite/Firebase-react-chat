import { Chat, Msgs, User } from '../app';
import onChange from 'swift-onchange';
import { app } from 'firebase';
// User.resume().then(x => (x ? 'Exists' : 'Does not exist'));
export default () => {
  const el = {
    text: document.getElementById('databaseText'),
    div: document.getElementById('chat'),
    buttons: {
      getChat: document.getElementById('getChat'),
      getClient: document.getElementById('getClient'),
      checkUser: document.getElementById('checkUser'),
      createChat: document.getElementById('createChat'),
      sendMsg: document.getElementById('sendMsg'),
      getMsg: document.getElementById('getMsg'),
      saveChat: document.getElementById('saveChat'),
    },
  };

  el.buttons.getChat.onclick = () =>
    Chat.get.chat().then(e => console.log(e));
  el.buttons.getClient.onclick = () =>
    Chat.get.client().then(e => console.log(e));

  el.buttons.checkUser.onclick = () => {
    const text = el.text.value;
    Chat.checkUser().then(e => console.log(e));
  };
  el.buttons.createChat.onclick = () => Chat.create();

  el.buttons.sendMsg.onclick = () => {
    Msgs.send(
      el.text.value,
      document.getElementById('owner').checked ? 1 : 0,
    );
  };
  el.buttons.getMsg.onclick = () =>
    Msgs.get(x => {
      if (x) {
        let chat;
        for (const key in x) {
          if (x.hasOwnProperty(key)) {
            const msg = x[key];
            chat += `<p>The ${msg.from} sent: ${
              msg.message
            }</p>`;
          }
        }
        el.div.innerHTML = chat;
      }
    });
};
