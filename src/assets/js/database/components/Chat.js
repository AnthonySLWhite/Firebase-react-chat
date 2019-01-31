import firebase from '../Connect';
import state from '../state';
import Cookies from '../utils/cookies';
const create = email => {
  const db = firebase.database();
  const chatPath = db.ref(`chat/`);
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
  const usersPath = db.ref(`users/`);
  const UID = state.UID;
  usersPath.update({ [UID]: chatID });
  return 1;
};

const save = async email => {
  const UID = state.UID;
  const db = firebase.database();
  const userPath = db.ref(`users/`);
  userPath.child(UID).remove();
  Cookies.set(email);
  const chatID = state.chatID;
  userPath.update({ [UID]: chatID });
  const chatPath = db.ref(`chat/${chatID}/client/email`);
  chatPath.update(email);
  chatPath.once('value');
  /*
  FIXME
  - Summary: Change email inside client
  */
  console.log();
  return 1;
};
export default {
  create,
  save,
};
