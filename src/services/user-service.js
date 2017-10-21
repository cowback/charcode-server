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

function findById(id) {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
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

/**
 * Update push information by _id in the database
 * @param {string} id filter
 * @returns {Promise<User>}
 */
function updateSubscription(id, pushInfo) {
  return new Promise((resolve, reject) => {
    User.update({ _id: id }, {$set: { pushInfo: pushInfo}}, (err, user) => {
      if (err) reject(err);

      resolve(user);
    });
  });
}

export default {
  findByMobile,
  findById,
  listAll,
  updateSubscription
};
