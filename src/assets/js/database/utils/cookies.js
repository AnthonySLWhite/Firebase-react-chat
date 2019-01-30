import hash from 'object-hash';
import Cookies from 'js-cookie';
/**
 * Set user by saving the email on the cookies
 */
const set = email => {
  const UID = hash(email);
  Cookies.set(hash('email'), UID);
  return UID;
};

/**
 * Get UID from email
 * @returns UID or 0 if no email is suplied
 */
const getEmailHash = email => hash(email) || 0;

/**
 * Get user from cookies if it exists
 * @returns UID or 0 if no UID is saved in cookies
 */
const get = () => Cookies.get(hash('email')) || 0;

/**
 * Remove user from cookies
 */
const remove = () => Cookies.remove(hash('email'));

/**
 * Create a timestamp hash for temporary user generation
 *
 * @param x If 1 then user will be set to cookies and then returned
 * @returns Temporary UID
 */
const quickHash = x => {
  if (x) {
    const timestamp = Date.now();
    set(timestamp);
    return hash(timestamp);
  }
  return hash(Date.now());
};

export default {
  set,
  get,
  remove,
  quickHash,
  getEmailHash,
};
export { get };
