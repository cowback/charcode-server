import webPush from 'web-push';

function configureWebPush() {
  webPush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.VAPID_PUBLIC,
    process.env.VAPID_SECRET
  );
}

export default configureWebPush;
