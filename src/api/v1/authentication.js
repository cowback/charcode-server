import { Router } from 'express';

import User from '../../models/user';
import authService from '../../services/auth-service';
import userService from '../../services/user-service';
import locationService from '../../services/location-service';

const router = Router();

function login(req, res) {
  req.checkBody('mobile', 'Please, use a valid phone number').isLength({ min: 11 });
  req.checkBody('password', 'Password have at least 8 digits').isLength({ min: 8 });

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

function register(req, res) {
  req.checkBody('mobile', 'Phone cannot to be empty').notEmpty();
  req.checkBody('mobile', 'Invalid phone number').isLength({ min: 11 });
  req.checkBody('password', 'Password cannot be empty').notEmpty();
  req.checkBody('cep', 'CEP cannot be empty').notEmpty();
  req.checkBody('cep', 'Invalid CEP').isLength({ min: 8 });

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  const { mobile, password, cep } = req.body;
  const newUser = new User({ mobile, password, cep });

  userService.findByMobile(mobile).then(() => new Promise((resolve, reject) => {
    locationService.getLocationByCep(cep).then((location) => {
      newUser.location = {
        coordinates: location,
      };

      newUser.save((err) => {
        if (err) reject(err);

        resolve(newUser);
      });
    }).catch(() => {});
  }).then((fodaci) => {
    console.log('fodace');
    console.log(fodaci);
    res.status(201).json({ msg: 'created with sucess' });
  }).catch((error) => {
    res.status(500).send(error);
  })).catch(() => {});
  return undefined;
}

router.route('/signin').post(login);
router.route('/signup').post(register);

export default router;
