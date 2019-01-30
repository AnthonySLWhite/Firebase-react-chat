import firebase from '../Connect';
import state from '../state';
/**
 * @param {*} dbpath Input the path `chat/${UID}/${dbpath}`
 * @returns Firebase Snapshot
 */
const chat = async (dbpath = '') => {
  const chatID = state.chatID;
  const db = firebase.database();
  const snap = await db
    .ref(`chat/${chatID}/${dbpath}`)
    .once('value');
  return snap.toJSON() || 0;
};
const chatID = async () => {
  const UID = state.UID;
  const db = firebase.database();
  const snap = await db.ref(`users/${UID}`).once('value');
  const chatID = snap.toJSON();
  chatID ? (state.chatID = chatID) : 0;
  return chatID || 0;
};
export default {
  chat,
  chatID,
};
