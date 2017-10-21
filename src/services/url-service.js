/**
 * Put a slash(/) at the end of value if does not have,
 * do nothing if already have
 * @param {string} value
 */
function trailingSlash(value) {
  let finalUrl = value;
  const lastChar = finalUrl.charAt(finalUrl.length - 1);

  if (lastChar && lastChar !== '/') {
    finalUrl = finalUrl.concat('/');
  }

  return finalUrl;
}

/**
 * Join the parameters values with a slash separator
 * (i.e. param/value)
 * @param {array} params values of parameters
 */
function mountParams(params) {
  const result = params.join('/');
  return result;
}

/**
 * Create a query parameters string
 * @param {{string, string}} query dictionary with the name of the parameter and the value
 */
function mountQuery(query) {
  const queryParams = Object.keys(query).map(key => `${key}=${query[key]}`);

  return queryParams.join('&');
}

/**
 * Mount a complete url with the provided data
 * @param {string} baseurl the host base url
 * @param {array} params url parameters. The order is relevant
 * @param {{string, string}} query url query parameters
 */
function mountUrl(baseurl = '', params = [], query = {}) {
  return `${trailingSlash(baseurl)}${mountParams(params)}?${mountQuery(query)}`;
}

export default {
  mountUrl,
  mountParams,
  mountQuery,
};
