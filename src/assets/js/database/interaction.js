import firebase from './connect';
import User from './User';
import ifErr from './utils/errors';
import { dbGetChat } from './utils/dbGet';

const create = () => {
  const database = firebase.database();
  const ref = database.ref(`chat/`);
  const UID = User.create();

  ref.update({
    [UID]: {
      lastUpdate: Date(),
      client: {
        name: 'Cliente',
        UID,
      },
      messages: [],
    },
  });
  return 1;
};

const checkUser = async () => {
  const user = await dbGetChat('client/UID');
  return user ? 1 : 0;
};

const get = {
  client: async () => {
    const client = await dbGetChat('client');
    return ifErr(client, 'Client was not found!');
  },
  chat: async () => {
    const chat = await dbGetChat();
    return ifErr(chat, 'No chat was found');
  },
};

export default {
  create,
  checkUser,
  get,
};
