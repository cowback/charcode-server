import axios from 'axios';
import urlService from './url-service';

const host = 'https://api.darksky.net/forecast';

/**
 * Obtain a forecast using the given location coordinates
 * @param {number} latitude The latitude of a location (in decimal degrees).
 * North is positive and South is negative.
 * @param {number} longitude The longitude of a location (in decimal degrees).
 * East is positive and West is negative.
 * @param {object} options Options to customize the returned data.
 * Available: exclude, extend, lang and units.
 */
function forecast(latitude, longitude, options = {}) {
  const secretkey = process.env.DARK_SKY_SECRET;
  const url = urlService.mountUrl(host, [secretkey, `${latitude},${longitude}`], options);
  return axios.get(url);
}

export default {
  forecast,
};
