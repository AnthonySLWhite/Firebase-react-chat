import firebase from '../Connect';
import state from '../state';
const send = (message, by) => {
  const date = Date();
  const database = firebase.database();
  const chatID = state.chatID;
  const messageRef = database.ref(`chat/${chatID}/messages/`);
  const lastUpdateRef = database.ref(`chat/${chatID}/`);
  messageRef.update({
    [Date.now()]: {
      from: by ? 'owner' : 'client',
      message,
      time: date,
    },
  });
  lastUpdateRef.update({ lastUpdate: date });
};

const get = callback => {
  const chatID = state.chatID;
  const db = firebase.database();
  const snap = db
    .ref(`chat/${chatID}/messages/`)
    .orderByKey()
    .on('value', x => callback(x.toJSON() || 0));
};

export default {
  send,
  get,
};
