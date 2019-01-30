import { User } from '../app';

export default () => {
  const el = {
    text: document.getElementById('userText'),
    buttons: {
      check: document.getElementById('button-1'),
      create: document.getElementById('button-2'),
      delete: document.getElementById('button-3'),
      save: document.getElementById('button-4'),
    },
  };
  el.buttons.check.onclick = () => {
    const UID = User.check();
    console.log(UID);
  };
  el.buttons.create.onclick = () => {
    const UID = User.create() || 'Nothing found!';
    console.log(UID);
  };
  el.buttons.delete.onclick = () => {
    const UID = User.remove();
    console.log(UID);
  };
  el.buttons.save.onclick = () => {
    const email = el.text.value;
    const UID = User.save(email);
    console.log(UID || 'Invalid Email');
  };
};
