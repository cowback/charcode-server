import jwt from 'jsonwebtoken';

const { SECURITY_SECRET, TOKEN_DURATION } = process.env;
const secondsInHour = 3600;

/**
 * Convert the token duration in hours to seconds
 * @param {number} tokenDuration duration of token in hours
 * @returns {number}
 */
function calculateExpirationTime(tokenDuration) {
  return tokenDuration * secondsInHour;
}

/**
 * Create a JWT Token with the user information
 * @param {User} user id, name, email and roles of user
 * @returns {string}
 */
function createToken({ _id, name, email, roles }) {
  const tokenUser = {
    id: _id,
    name,
    email,
    roles,
  };

  const tokenConfig = {
    expiresIn: calculateExpirationTime(TOKEN_DURATION),
  };

  return jwt.sign(tokenUser, SECURITY_SECRET, tokenConfig);
}

/**
 * Check if the token is valid
 * @param {string} token token to be verified
 * @returns {Promise<string>}
 */
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECURITY_SECRET, (err, decoded) => {
      if (err) reject(err);

      resolve(decoded);
    });
  });
}

export default {
  createToken,
  verifyToken,
};
