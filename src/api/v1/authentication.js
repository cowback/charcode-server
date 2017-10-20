import { Router } from 'express';

import User from '../../models/user';
import authService from '../../services/auth-service';
import userService from '../../services/user-service';

const router = Router();

function login(req, res) {
  // TODO: Adicionar outras validações
  req.checkBody('email', 'Please, use a valid email').isEmail();
  req.checkBody('password', 'Password have at least 8 digits').isLength({ min: 8 });

  const errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
  }

  const { email, password } = req.body;
  const user = new User({ email, password });

  userService.findByEmail(user.email).then(userFind => new Promise((resolve, reject) => {
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

function register(req, res) {
  // TODO: Adicionar outras validações
  req.checkBody('name', 'Name cannot be empty').notEmpty();
  req.checkBody('email', 'Please, use a valid email').notEmpty().isEmail();
  req.checkBody('password', 'Password cannot be empty').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });

  userService.findByEmail(newUser.email).then(user => new Promise((resolve, reject) => {
    newUser.save((err) => {
      if (err) reject(err);

      resolve(user);
    });
  })).then((user) => {
    res.status(201).json({ user });
  }).catch((error) => {
    res.status(500).send(error);
  });
}

router.route('/signin').post(login);
router.route('/signup').post(register);

export default router;
