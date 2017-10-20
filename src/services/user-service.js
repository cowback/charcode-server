import User from '../models/user';

/**
 * Filter user by email in the database
 * @param {string} email email filter
 * @returns {Promise<User>}
 */
function findByEmail(email) {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, (err, user) => {
      if (err) reject(err);

      resolve(user);
    });
  });
}

/**
 * List all the users registered in the database
 * @returns {Promise<User[]>}
 */
function listAll() {
  return new Promise((resolve, reject) => {
    User.find((err, users) => {
      if (err) reject(err);

      resolve(users);
    });
  });
}

export default {
  findByEmail,
  listAll,
};
