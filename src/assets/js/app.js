// ----- Package Imports ----- //
import '@babel/polyfill';
import emailVal from 'validator/lib/isEmail';
// ----- File Imports ----- //
import Chat from './database/components/Chat';
import Cookies from './database/utils/cookies';
import dbGet from './database/utils/dbGet';
import Get from './database/components/Get';
import Msgs from './database/components/Msgs';
import state from './database/state';
// ----- End Imports ----- //
state.signedIn = false;
const checkIfLogged = () => (state.signedIn ? 1 : 0);
const users = {
  createUser: () => {
    if (checkIfLogged()) {
      state.error('User already Logged in!');
      return 0;
    }
    Cookies.quickHash();
    Chat.create();
    state.signedIn = true;
    return 1;
  },
  login: async email => {
    if (checkIfLogged()) {
      state.error('User already Logged in!');
      return 0;
    }
    if (!emailVal(email)) {
      state.error('Email not valid!');
      return 0;
    }
    Cookies.set(email);
    const user = await dbGet
      .chatID()
      .then(chatID => (chatID ? 1 : 0));
    state.signedIn = true;
    return user;
  },
  oldUser: async () => {
    if (!state.UID) {
      state.error('No user detected in Cookies!');
      return 0;
    }
    const user = await dbGet
      .chatID()
      .then(chatID => (chatID ? (state.signedIn = true) : 0));
    return user ? 1 : 0;
  },
  saveOrSignup: async email => {
    if (!emailVal(email)) {
      state.error('Email not valid!');
      return 0;
    }
    const x = state;
    if (!x.signedIn && !x.UID && !x.chatID) {
      users.createUser();
    }
    Chat.save(email);
    state.signedIn = true;
    return 1;
  },
  logout: () => {
    if (!checkIfLogged()) {
      state.error('User not Logged in!');
      return 0;
    }
    state.signedIn = false;
    state.admin = false;
    state.UID = 0;
    state.chatID = 0;
  },
  storedUser: Cookies.get,
  admin: {
    login: (email, pass) => {},
    create: (email, pass) => {
      !state.admin
        ? state.error('You need admin permissions to do that!')
        : 0;
    },
    delete: email => {
      if (!state.admin) {
        state.error('You need admin permissions to do that!');
      }
    },
  },
};

const msgs = {
  send: (message = '', by = 0) => Msgs.send(message, by),
  get: callback => Msgs.get(callback),
};

const get = {
  client: () => Get.client(),
  chat: () => Get.chat(),
};

const root = {
  users,
  msgs,
  get,
};

const debug = {
  state,
  Cookies,
  root,
};
const app = x => {
  if (x) {
    state.error = console.error;
    root.debug = debug;
  }
  return root;
};
export default app;
