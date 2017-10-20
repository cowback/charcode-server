import axios from 'axios';
import urlService from './url-service';

const host = 'https://google.com/maps/api/geocode/';
const secret = 'AIzaSyAVpfn5UfeNrPrP8K62dn3U3y-9XCWfy_0'; //process.env.GOOGLE_SECRET;


/**
 * Return user lat and lng given CEP
 *
 * @param {String}  cep User CEP value
 * @returns {Promise<{}>}
 */
function getLocationByCep(cep) {
  const uri = urlService.mountUrl(host, ['json'], { address: cep, sensor: false, key: secret });

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
