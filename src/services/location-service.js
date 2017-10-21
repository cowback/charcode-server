import axios from 'axios';
import urlService from './url-service';

const host = 'http://google.com/maps/api/geocode/';

/**
 * Return user lat and lng given CEP
 *
 * @param {String}  cep User CEP value
 * @returns {Promise<{}>}
 */
function getLocationByCep(cep) {
  const { GOOGLE_SECRET } = process.env;
  const uri = urlService.mountUrl(host, ['json'], { address: cep, sensor: false, key: GOOGLE_SECRET });

  return axios.get(uri).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      return null;
    }

    return response.data.results[0].geometry.location;
  });
}

export default {
  getLocationByCep,
};
