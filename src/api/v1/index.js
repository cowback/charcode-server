import { Router } from 'express';
import auth from '../../middlewares/authentication';
import authentication from './authentication';
import users from './users';
import subscription from './subscription';

const router = Router();

router.use(authentication);
router.use(subscription);
router.use(auth);
router.use(users);

export default router;
