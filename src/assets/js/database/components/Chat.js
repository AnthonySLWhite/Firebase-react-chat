import firebase from '../Connect';
import state from '../state';
const create = email => {
  const database = firebase.database();
  const chatPath = database.ref(`chat/`);
  const obj = {
    lastUpdate: Date(),
    client: {
      name: 'Client',
      anonymous: email ? false : true,
      email: email || 'Unknown',
    },
    messages: [],
  };
  const chatRef = chatPath.push(obj);
  const chatID = chatRef.key;
  state.chatID = chatID;
  const usersPath = database.ref(`users/`);
  const UID = state.UID;
  usersPath.update({ [UID]: chatID });
  return 1;
};

const save = async email => {
  const UID = state.UID;
  const db = firebase.database();
  const userPath = db.ref(`users/`);
  userPath.child(UID).remove();
  userPath.update({ [UID]: state.chatID });
  return 1;
};
export default {
  create,
  save,
};
