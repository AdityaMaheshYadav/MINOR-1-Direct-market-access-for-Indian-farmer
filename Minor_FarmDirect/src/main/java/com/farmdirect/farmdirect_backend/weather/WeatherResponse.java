package com.farmdirect.farmdirect_backend.weather;

public class WeatherResponse {
    public String city;
    public String condition;
    public double temperature;
    public int humidity;
    public double windSpeed;
    public String cropTip;

    public WeatherResponse() {}

    public WeatherResponse(String city, String condition, double temperature, int humidity, double windSpeed, String cropTip) {
        this.city = city;
        this.condition = condition;
        this.temperature = temperature;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.cropTip = cropTip;
    }
}
