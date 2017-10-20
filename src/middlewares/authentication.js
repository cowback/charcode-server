import authService from '../services/auth-service';

export default function authenticated(req, res, next) {
  const token = req.headers['x-access-token'];

  if (!token) {
    res.status(403).json({
      message: 'Token not found',
    });
  }

  authService.verifyToken(token).then((decodedToken) => {
    req.user = decodedToken;
    next();
  }).catch((error) => {
    res.status(403).json(error);
  });
}
