import User from '../../models/user';
import userService from '../../services/user-service';
import darkSkyService from '../../services/dark-sky-service';
import weatherService from '../../services/weather-service';
import locationService from '../../services/location-service';

function obtainRegisteredLocationStatus(req, res) {
  const { id } = req.user;
  userService.findById(id).then((user) => {
    const { coordinates } = user.location;
    const [latitude, longitude] = coordinates;

    return darkSkyService.forecast(latitude, longitude, {
      exclude: 'minutely,hourly,flags',
      lang: 'pt',
      units: 'si',
    });
  }).then((forecast) => {
    const result = weatherService.rankLocationForecast(forecast.data);

    res.json({
      status: result,
      message: forecast.data.daily.summary,
    });
  }).catch((err) => {
    res.status(404).json(err);
  });
}

function register(req, res) {
  req.checkBody('mobile', 'Phone cannot to be empty').notEmpty();
  req.checkBody('mobile', 'Invalid phone number').isLength({ min: 10, max: 11 });
  req.checkBody('password', 'Password cannot be empty').notEmpty();
  req.checkBody('cep', 'CEP cannot be empty').notEmpty();
  req.checkBody('cep', 'Invalid CEP').isLength({ min: 8 });

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  const { mobile, password, cep } = req.body;
  const newUser = new User({ mobile, password, cep });

  locationService.getLocationByCep(cep)
    .then((coordinates) => {
      if (!coordinates) return new Error('CEP não encontrado.');

      newUser.location = {
        coordinates: [coordinates.lat, coordinates.lng],
      };

      return newUser;
    }).then(user => new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) reject(err);

        resolve(newUser);
      });
    }))
    .then(() => {
      res.status(201).json({});
    })
    .catch((error) => {
      if (error.name === 'MongoError' && error.code === 11000) {
        return res.status(400).json({ msg: 'Cellphone alredy exists' });
      }

      return res.status(500).json({ error });
    });

  return undefined;
}

export default {
  register,
  obtainRegisteredLocationStatus,
};
