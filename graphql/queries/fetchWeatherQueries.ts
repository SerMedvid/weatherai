import { gql } from '@apollo/client';

const FETCH_WEATHER_QUERY = gql`
  query WeatherQuery(
    $current_weather: String,
    $latitude: String!
    $longitude: String!
    $timezone: String!
    $hourly: String = "temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,uv_index"
    $daily: String = "weathercode,temperature_2m_max,temperature_2m_min,uv_index_max,sunrise,sunset"
  )   {
    weather(
      latitude: $latitude
      longitude: $longitude
      hourly: $hourly
      daily: $daily
      current_weather: $current_weather
      timezone: $timezone
    ) {
      current_weather {
        temperature
        time
        weathercode
        is_day
        winddirection
        windspeed
      }
      latitude
      longitude
      daily {
        temperature_2m_min
        temperature_2m_max
        time
        weathercode
        uv_index_max
        sunrise
        sunset
      }
      daily_units {
        temperature_2m_max
        temperature_2m_min
        time
        weathercode
      }
      elevation
      generationtime_ms
      hourly {
        apparent_temperature
        precipitation
        precipitation_probability
        rain
        relativehumidity_2m
        showers
        snowfall
        temperature_2m
        time
        uv_index
      }
      hourly_units {
        apparent_temperature
        precipitation
        precipitation_probability
        rain
        relativehumidity_2m
        showers
        snowfall
        temperature_2m
        time
        uv_index
      }
      timezone
      timezone_abbreviation
      utc_offset_seconds
    }
  }
`;

export default FETCH_WEATHER_QUERY;
