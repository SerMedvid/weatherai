export type CountryOption = {
    label: string;
    value: {
        longitude: string;
        latitude: string;
        isoCode: string;
    }
} | null;

export type CityOption = {
    label: string;
    value: {
        longitude: string | null | undefined;
        latitude: string | null | undefined;
        countryCode: string;
        name: string;
        stateCode: string
    }
} | null;

export interface CurrentWeather {
    is_day: number;
    temperature: number;
    time: string|null;
    weathercode: number;
    winddirection: number;
    windspeed: number;
  }

export interface Daily {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
    uv_index_max: number[];
    weathercode: number[];
    sunrise: string[];
    sunset: string[];
}
  
export interface DailyUnits {
    temperature_2m_max: string;
    temperature_2m_min: string;
    time: string;
    weathercode: string;
}
  
export interface Hourly {
    apparent_temperature: number[];
    precipitation: number[];
    precipitation_probability: number[];
    rain: number[];
    relativehumidity_2m: number[];
    showers: number[];
    snowfall: number[];
    temperature_2m: number[];
    time: (string|null)[];
    uv_index: number[];
}
  
export interface HourlyUnits {
    apparent_temperature: string;
    precipitation: string;
    precipitation_probability: string;
    rain: string;
    relativehumidity_2m: string;
    showers: string;
    snowfall: string;
    temperature_2m: string;
    time: string;
    uv_index: string;
}
  
export interface Root {
    current_weather: CurrentWeather;
    daily: Daily;
    daily_units: DailyUnits;
    elevation: number;
    generationtime_ms: number;
    hourly: Hourly;
    hourly_units: HourlyUnits;
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    utc_offset_seconds: number;
}
  
  