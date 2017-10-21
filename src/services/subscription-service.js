import webPush from 'web-push';
import userService from './user-service';

let subscribers = [];

function subscription(id, pushInfo) {
  return userService.updateSubscription(id, pushInfo);
}

export default {
  subscription
};
