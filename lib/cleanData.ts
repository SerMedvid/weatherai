import { Root } from "@/types";

const sliceArrayToToday = <T>(arr: T[]): T[] => {
    return arr.slice(0, 24)
}

const cleanData = (data: Root, city: string) => {
    const {
        current_weather,
        timezone,
        hourly,
        hourly_units,
        timezone_abbreviation
    } = data;

    const {
        temperature,
        windspeed, 
        winddirection, 
        weathercode, 
        time
    } = current_weather;

    const {
        temperature_2m, 
        snowfall, 
        rain,
        relativehumidity_2m,
        precipitation_probability, 
        uv_index
    } = hourly;

    return {
        current_weather: {
            temperature,
            windspeed, 
            winddirection, 
            weathercode, 
            time
        },
        hourly: {
            temperature_2m: sliceArrayToToday(temperature_2m),
            snowfall, 
            rain: sliceArrayToToday(rain),
            relativehumidity_2m: sliceArrayToToday(relativehumidity_2m),
            precipitation_probability: sliceArrayToToday(precipitation_probability),
            uv_index: sliceArrayToToday(uv_index)
        },
        timezone,
        hourly_units,
        timezone_abbreviation,
        city
    }
}

export default cleanData;