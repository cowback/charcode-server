import { Router } from 'express';
import userService from '../../services/user-service';

const router = Router();

function listAll(req, res) {
  userService.listAll().then((users) => {
    res.json(users);
  }).catch((error) => {
    res.status(400).send(error);
  });
}

router.route('/users')
  .get(listAll);

export default router;
