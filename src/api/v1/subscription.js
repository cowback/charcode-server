import subscriptionService from '../../services/subscription-service';

function subscribe(req, res) {
  req.checkBody('pushInfo', 'Please, send a valid subscription').exists();

  const { id } = req.user;
  const { pushInfo } = req.body;

  subscriptionService.subscription(id, pushInfo).then(() => {
    res.status(202).end();
  })
  .catch((error) => {
    return res.status(500).send(error);
  });
}

export default {
  subscribe
};
