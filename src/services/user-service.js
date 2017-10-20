import User from '../models/user';

/**
 * Filter user by mobile in the database
 * @param {string} mobile mobile filter
 * @returns {Promise<User>}
 */
function findByMobile(mobile) {
  return new Promise((resolve, reject) => {
    User.findOne({ mobile }, (err, user) => {
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
  findByMobile,
  listAll,
};
