function rankSeverity(score) {
  let state = null;

  if (score >= 60 && score < 75) {
    state = 'advisory';
  } else if (score >= 75 && score < 90) {
    state = 'watch';
  } else if (score >= 90) {
    state = 'warning';
  }

  return state;
}

function calculateScore(forecast) {
  let score = 0;

  score += forecast.humidity * 10 || 0;
  score += forecast.pressure / 100 || 0;
  score += forecast.windSpeed * 10 || 0;
  score += (forecast.precipIntensity * forecast.precipProbability) * 10 || 0;
  score += forecast.temperature || 0;

  return score;
}

function rankLocationForecast(forecast) {
  let forecastsRank = [forecast.currently, ...forecast.daily.data];

  forecastsRank = forecastsRank.map(forecastPredict => calculateScore(forecastPredict));
  let generalScore = forecastsRank.reduce((media, forecastScore) => media + forecastScore, 0);
  generalScore /= forecastsRank.length;

  return rankSeverity(generalScore);
}

export default {
  rankLocationForecast,
};
