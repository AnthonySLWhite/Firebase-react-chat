import firebase from './connect';
import User from './User';
import ifErr from './utils/errors';

const send = (message, by) => {
  const UID = ifErr(
    User.check(),
    'UID is not defined in cookies!',
  );
  const date = Date();
  if (UID) {
    const database = firebase.database();
    const messageRef = database.ref(`chat/${UID}/messages/`);
    const lastUpdateRef = database.ref(`chat/${UID}/`);
    messageRef.update({
      [Date.now()]: {
        from: by ? 'owner' : 'client',
        message,
        time: date,
      },
    });
    lastUpdateRef.update({ lastUpdate: date });
  }
};

const get = async callback => {
  const UID = ifErr(
    User.check(),
    'UID is not defined in cookies!',
  );
  const db = firebase.database();
  const snap = await db
    .ref(`chat/${UID}/messages/`)
    .orderByKey()
    .on('value', x => callback(x.toJSON() || 0));
};

export default {
  send,
  get,
};
