export default ({weather, date}) => {
    return (
        <div>
            <div className="city-name">
                <h2>
                    {weather.data.name}, <span>{weather.data.sys.country}</span>
                </h2>
            </div>
            <div className="date">
                <span>{date.toDateString()}</span>
            </div>
            <div className="weather-temperature">
                <img
                    className="weather-icon"
                    src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                    alt={weather.data.weather[0].description}
                />
                {Math.round(weather.data.main.temp)}
                <sup className="degree">°C</sup>
            </div>
            <div className="description-wind">
                <p>{weather.data.weather[0].description.toUpperCase()}</p>
                <p>Wind Speed: {weather.data.wind.speed} m/s</p>
            </div>
            <div className="humidity">
                <p>Humidity: {weather.data.main.humidity} %</p>
            </div>
        </div>
    )
}