import { hashPassword } from '../hash';

const plainTextPassword = 'mySecurePassword123';

hashPassword(plainTextPassword)
  .then((hashedPassword) => {
    console.log('Hashed Password:', hashedPassword);
  })
  .catch((error) => {
    console.error('Error while hashing password:', error);
  });
