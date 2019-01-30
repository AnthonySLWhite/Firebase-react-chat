import emailVal from 'validator/lib/isEmail';
import cookieMail from './utils/cookies';
import { dbGetChat } from './utils/dbGet';
/**
 *  Check if UID exists in cookies
 * @returns UID in cookies or 0 if nothing is found
 */
const resume = async () => {
  const email = cookieMail.get();
  if (!email) {
    return 0;
  }
  const user = await dbGetChat('client/UID');
  return user ? 1 : 0;
};

/**
 * Create temporary user
 * @returns Generated UID
 */
const create = () => {
  const email = cookieMail.quickHash(1);
  return email;
};

/**
 * Save chat using client's email
 *
 * @param {*} email User's email
 * @returns Generated UID or 0 if email is invalid
 */
const save = email => {
  if (emailVal(email)) {
    const oldMail = cookieMail.get();
    return cookieMail.set(email);
  }
  return 0;
};

/**
 * Remove UID from cookies
 *
 */
const remove = () => {
  cookieMail.remove();
  return 1;
};

export default {
  check: resume,
  create,
  save,
  remove,
  resume,
};
