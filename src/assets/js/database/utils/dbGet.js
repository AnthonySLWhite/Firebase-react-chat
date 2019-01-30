import firebase from '../connect';
import User from '../User';
import ifErr from './errors';
/**
 * @param {*} dbpath Input the path `chat/${UID}/${dbpath}`
 * @returns Firebase Snapshot
 */
const Chat = async (dbpath = '') => {
  const UID = ifErr(
    User.check(),
    'UID is not defined in cookies!',
  );
  const db = firebase.database();
  const snap = await db
    .ref(`chat/${UID}/${dbpath}`)
    .once('value');
  return snap.toJSON() || 0;
};

export { Chat as dbGetChat };
