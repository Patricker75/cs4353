const {hashPassword} = require('../hash');

const password = 'mySecurePassword123';

hashPassword(password)
  .then((hashedPassword) => {
    console.log('Hashed Password:', hashedPassword);
  })
  .catch((error) => {
    console.error('Error while hashing password:', error);
  });
