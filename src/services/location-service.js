import axios from 'axios';
import urlService from './url-service';

const host = 'http://google.com/maps/api/geocode';
const secret = process.env.GOOGLE_SECRET;


/**
 * Return user lat and lng given CEP
 *
 * @param {String}  cep User CEP value
 * @returns {Promise<{}>}
 */
function getLocationByCep(cep) {
  const uri = urlService.mountUrl(host, ['json'], { address: cep, sensor: false, key: secret });

  return axios.get(uri).then(response => (response.location));
}

export default {
  getLocationByCep,
};
