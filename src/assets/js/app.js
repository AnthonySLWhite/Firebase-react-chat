import '@babel/polyfill';
import User from './database/User';
import Msgs from './database/Msgs';
import Chat from './database/interaction';
const app = {
  User,
  Msgs,
  Chat,
};

export default app;

export { User, Msgs, Chat };
