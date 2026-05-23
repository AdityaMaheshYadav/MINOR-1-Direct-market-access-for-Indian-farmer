package com.farmdirect.farmdirect_backend.weather;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    private final WebClient webClient = WebClient.builder().build();

    @GetMapping
    public WeatherResponse getWeather(@RequestParam String city) {
        try {
            // Step 1: Geocode city name → lat/lon using Open-Meteo geocoding API
            Map geoResult = webClient.get()
                    .uri("https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1&language=en&format=json")
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            List<Map> results = (List<Map>) geoResult.get("results");
            if (results == null || results.isEmpty()) {
                return new WeatherResponse(city, "City not found", 0, 0, 0, "Could not find city.");
            }

            double lat = ((Number) results.get(0).get("latitude")).doubleValue();
            double lon = ((Number) results.get(0).get("longitude")).doubleValue();

            // Step 2: Fetch real weather from Open-Meteo
            Map weatherResult = webClient.get()
                    .uri("https://api.open-meteo.com/v1/forecast?latitude=" + lat
                            + "&longitude=" + lon
                            + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code"
                            + "&timezone=auto")
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            Map current = (Map) weatherResult.get("current");
            double temperature = ((Number) current.get("temperature_2m")).doubleValue();
            int humidity = ((Number) current.get("relative_humidity_2m")).intValue();
            double windSpeed = ((Number) current.get("wind_speed_10m")).doubleValue();
            int weatherCode = ((Number) current.get("weather_code")).intValue();

            String condition = describeWeather(weatherCode);
            String cropTip = getCropTip(weatherCode, temperature, humidity);

            return new WeatherResponse(city, condition, temperature, humidity, windSpeed, cropTip);

        } catch (Exception e) {
            return new WeatherResponse(city, "Unavailable", 0, 0, 0, "Weather data unavailable.");
        }
    }

    private String describeWeather(int code) {
        if (code == 0) return "Clear Sky ☀️";
        if (code <= 2) return "Partly Cloudy ⛅";
        if (code == 3) return "Overcast ☁️";
        if (code <= 49) return "Foggy 🌫️";
        if (code <= 59) return "Drizzle 🌦️";
        if (code <= 69) return "Rainy 🌧️";
        if (code <= 79) return "Snowy ❄️";
        if (code <= 82) return "Rain Showers 🌧️";
        if (code <= 99) return "Thunderstorm ⛈️";
        return "Unknown";
    }

    private String getCropTip(int code, double temp, int humidity) {
        if (code >= 80 && code <= 99) return "⚠️ Heavy rain expected. Avoid spraying pesticides today.";
        if (code >= 61 && code <= 79) return "🌧️ Rainy day — good for transplanting seedlings.";
        if (code >= 51 && code <= 60) return "🌦️ Light drizzle — reduce irrigation today.";
        if (temp > 38) return "🌡️ Very hot — water crops early morning or evening.";
        if (temp < 10) return "🥶 Cold weather — protect sensitive crops from frost.";
        if (humidity > 80) return "💧 High humidity — watch out for fungal diseases.";
        return "✅ Good weather for farming activities today.";
    }
}
