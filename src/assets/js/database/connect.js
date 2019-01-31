import firebase from 'firebase/app';
import 'firebase/database';

/**
 *Connect to Firebase
 *
 * @returns Firebase connection
 */
const firebaseConnect = () => {
  const config = {
    apiKey: 'AIzaSyCQaxFivytc-nMF55ahcyMlR1WNOqeGci4',
    authDomain: 'void-chat-admin.firebaseapp.com',
    databaseURL: 'https://void-chat-admin.firebaseio.com',
    projectId: 'void-chat-admin',
    storageBucket: 'void-chat-admin.appspot.com',
    messagingSenderId: '768988017951',
  };
  firebase.initializeApp(config);
  return firebase;
};
export default firebaseConnect();
