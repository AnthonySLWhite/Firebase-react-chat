import hash from 'js-sha512';
import Cookies from 'js-cookie';
import state from '../state';
/**
 * Set user by saving the email on the cookies
 */
const set = email => {
  const UID = hash(email);
  Cookies.set(hash('email'), UID);
  state.UID = UID;
  return 1;
};

/**
 * Get user from cookies if it exists
 * @returns UID or 0 if no UID is saved in cookies
 */
const get = () => {
  const UID = Cookies.get(hash('email')) || 0;
  UID ? (state.UID = UID) : 0;
  return UID;
};

/**
 * Remove user from cookies
 */
const remove = () => Cookies.remove(hash('email'));

/**
 * Create a timestamp hash for temporary user generation
 *
 * @param x If 1 then user will not be set to cookies
 * @returns Temporary UID
 */
const quickHash = x => {
  const timestamp = Date.now().toString();
  const UID = hash(timestamp);
  state.UID = UID;
  if (x) {
    return UID;
  }
  set(timestamp);
  return UID;
};

export default {
  set,
  get,
  remove,
  quickHash,
};
export { get };
