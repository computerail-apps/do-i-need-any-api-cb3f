export interface ApiEntry {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Link: string;
  Category: string;
}

export const MOCK_ENTRIES: ApiEntry[] = [
  { API: 'CoinGecko', Description: 'Cryptocurrency prices, market data and exchange info.', Auth: '', HTTPS: true, Cors: 'yes', Link: 'https://www.coingecko.com/en/api', Category: 'Cryptocurrency' },
  { API: 'OpenWeatherMap', Description: 'Weather data including current, forecast, and historical.', Auth: 'apiKey', HTTPS: true, Cors: 'yes', Link: 'https://openweathermap.org/api', Category: 'Weather' },
  { API: 'NASA', Description: 'NASA data, including imagery, rovers and near-earth objects.', Auth: 'apiKey', HTTPS: true, Cors: 'no', Link: 'https://api.nasa.gov', Category: 'Science & Math' },
  { API: 'REST Countries', Description: 'Get information about countries via a RESTful API.', Auth: '', HTTPS: true, Cors: 'yes', Link: 'https://restcountries.com', Category: 'Countries' },
  { API: 'Dog CEO', Description: 'Vast collection of dog pictures, organized by breed.', Auth: '', HTTPS: true, Cors: 'yes', Link: 'https://dog.ceo/dog-api/', Category: 'Animals' },
  { API: 'Cat Facts', Description: 'Daily cat facts.', Auth: '', HTTPS: true, Cors: 'no', Link: 'https://alexwohlbruck.github.io/cat-facts/', Category: 'Animals' },
  { API: 'PokeAPI', Description: 'All the Pokemon data you will ever need in one place.', Auth: '', HTTPS: true, Cors: 'yes', Link: 'https://pokeapi.co', Category: 'Games & Comics' },
  { API: 'Spotify', Description: 'Music catalog, playlists and streaming metadata.', Auth: 'OAuth', HTTPS: true, Cors: 'yes', Link: 'https://developer.spotify.com/documentation/web-api/', Category: 'Music' },
  { API: 'GitHub', Description: 'Programmatic access to GitHub repos, issues and users.', Auth: 'OAuth', HTTPS: true, Cors: 'yes', Link: 'https://docs.github.com/en/rest', Category: 'Development' },
  { API: 'Twitch', Description: 'Streams, clips and channel data for Twitch.', Auth: 'OAuth', HTTPS: true, Cors: 'yes', Link: 'https://dev.twitch.tv/docs', Category: 'Video' },
  { API: 'Chuck Norris', Description: 'Jokes about Chuck Norris.', Auth: '', HTTPS: true, Cors: 'no', Link: 'https://api.chucknorris.io', Category: 'Entertainment' },
  { API: 'Random User Generator', Description: 'Generate random fake user data for testing.', Auth: '', HTTPS: true, Cors: 'yes', Link: 'https://randomuser.me', Category: 'Test Data' },
  { API: 'IP2Location', Description: 'IP geolocation lookup for country, region and city.', Auth: 'apiKey', HTTPS: true, Cors: 'unknown', Link: 'https://www.ip2location.com/web-service', Category: 'Geocoding' },
  { API: 'Exchangerate-API', Description: 'Currency conversion and exchange rate data.', Auth: 'apiKey', HTTPS: true, Cors: 'yes', Link: 'https://www.exchangerate-api.com', Category: 'Currency Exchange' },
  { API: 'JSONPlaceholder', Description: 'Fake REST API for testing and prototyping.', Auth: '', HTTPS: true, Cors: 'yes', Link: 'https://jsonplaceholder.typicode.com', Category: 'Test Data' },
  { API: 'NewsAPI', Description: 'Search and retrieve live articles from news sources worldwide.', Auth: 'apiKey', HTTPS: true, Cors: 'yes', Link: 'https://newsapi.org', Category: 'News' },
  { API: 'The Movie Database', Description: 'Community driven movie and TV metadata.', Auth: 'apiKey', HTTPS: true, Cors: 'yes', Link: 'https://www.themoviedb.org/documentation/api', Category: 'Entertainment' },
  { API: 'Agify.io', Description: 'Predict the age of a person from their first name.', Auth: '', HTTPS: true, Cors: 'yes', Link: 'https://agify.io', Category: 'Personality' },
  { API: 'Numbers API', Description: 'Facts about numbers, dates and years.', Auth: '', HTTPS: false, Cors: 'no', Link: 'http://numbersapi.com', Category: 'Trivia' },
  { API: 'Slack', Description: 'Send messages and manage workspaces programmatically.', Auth: 'OAuth', HTTPS: true, Cors: 'yes', Link: 'https://api.slack.com', Category: 'Development' },
];
