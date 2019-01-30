import dbGet from '../utils/dbGet';
export default {
  client: async () => {
    const client = await dbGet.chat('client');
    return client || 0;
  },
  chat: async () => {
    const chat = await dbGet.chat();
    return chat || 0;
  },
};
