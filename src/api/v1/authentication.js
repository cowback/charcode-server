import { Router } from 'express';

import User from '../../models/user';
import authService from '../../services/auth-service';
import userService from '../../services/user-service';

const router = Router();

function verifyToken(req, res) {
  const token = req.get('authorization');
  authService.verifyToken(token).then(() => {
    res.status(200).end();
  }).catch((err) => {
    res.status(401).json(err);
  });
}

function login(req, res) {
  req.checkBody('mobile', 'Please, use a valid phone number').isLength({ min: 11 });
  req.checkBody('password', 'Password cannot be empty').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
  }

  const { mobile, password } = req.body;
  const user = new User({ mobile, password });

  userService.findByMobile(user.mobile).then(userFind => new Promise((resolve, reject) => {
    userFind.comparePassword(user.password, (err, match) => {
      if (err) reject(err);
      if (!match) reject(new Error('The passwords do not match'));

      resolve(userFind);
    });
  })).then((userFind) => {
    const token = authService.createToken(userFind);
    res.status(200).json({ token });
  }).catch((error) => {
    res.status(500).send(error);
  });
}

router.route('/auth')
  .get(verifyToken)
  .post(login);

export default router;
