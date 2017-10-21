import { Router } from 'express';
import auth from '../../middlewares/authentication';
import authentication from './authentication';
import users from './users';
import subscription from './subscription';

const router = Router();

router.route('/auth')
  .get(authentication.verifyToken)
  .post(authentication.login);

router.route('/user')
  .post(users.register);

router.use(auth);

router.route('/user/status')
  .get(users.obtainRegisteredLocationStatus);

router.route('/push/subscribe')
  .post(subscription.subscribe);

export default router;
