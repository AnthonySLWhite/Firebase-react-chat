import expect from 'expect';
import 'jsdom-global/register';
import ChatApp from '../app';
const { users, get, debug } = ChatApp(1);
const state = debug.state;
describe('User login', () => {
  describe('Should create user, save and logout', () => {
    before(() => {
      state.signedIn = false;
      state.admin = false;
      state.UID = 0;
      state.chatID = 0;
    });
    it('should create user', async () => {
      expect(users.createUser()).toBe(1);
      // Check database for created chat
      const chat = await get.chat();
      expect(chat).toHaveProperty('client', {
        anonymous: true,
        email: 'Unknown',
        name: 'Client',
      });
      expect(chat).toHaveProperty('lastUpdate');
      expect(chat).not.toHaveProperty('messages');
    });

    it('should change state correctly', () => {
      expect(state.UID).toBeTruthy();
      expect(state.chatID).toBeTruthy();
      expect(state.signedIn).toBeTruthy();
      expect(state.admin).toBeFalsy();
    });
    it('should save user to database', () => {
      expect(users.saveOrSignup()).toBeTruthy();
    });
    it('should logout');
    it('should change state');
  });
  describe('Should SignIn and Logout', () => {
    before(() => {
      state.signedIn = false;
      state.admin = false;
      state.UID = 0;
      state.chatID = 0;
    });
    it('should create user using email');
    it('should change state');
    it('should logout');
    it('should change state');
  });
  describe('Should Login', () => {
    before(() => {});
    it('should login using email');
    it('should change state');
    it('should logout');
    it('should change state');
  });
  describe('Should LogIn previous user', () => {
    before(() => {});
    it('set user email on cache');
    it('should get stored user in the cookies');
    it('should change state');
    it('should login');
    it('should logout');
    it('should change state');
  });
});
