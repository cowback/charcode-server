import bcrypt from 'bcrypt-nodejs';

const rounds = 16;
/**
 * Create a hash of a value with a given salt
 * @param {string} value value to be encrypted
 * @param {string} salt the salt to hash the value
 * @returns {Promise<string>}
 */
function createHash(value, salt) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(value, salt, undefined, (err, hash) => {
      if (err) reject(err);

      resolve(hash);
    });
  });
}

/**
 * Encrypt a string with a random salt of 16-rounds
 * @param {string} value value to be encrypted
 * @returns {Promise<string>}
 */
function encrypt(value) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(rounds, (err, salt) => {
      if (err) reject(err);

      createHash(value, salt).then((hash) => {
        resolve(hash);
      }).catch((error) => {
        reject(error);
      });
    });
  });
}

/**
 * Compare two values
 * @param {string} value
 * @param {string} encrypted
 * @returns {Promisse<boolean>}
 */
function compare(value, encrypted) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(value, encrypted, (err, equals) => {
      if (err) reject(err);

      resolve(equals);
    });
  });
}

export default {
  encrypt,
  compare,
};
