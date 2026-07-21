function updateClock() {
    const now = new Date();

    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("time").textContent = `${h}:${m}:${s}`;

    const date = now.toLocaleDateString("ru-RU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    document.getElementById("date").textContent = date;
}

updateClock();
setInterval(updateClock, 1000);

async function getWeather(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;

        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("temperature").textContent =
            `${Math.round(data.current.temperature_2m)}°C`;

        let weatherText = "Неизвестно";

        switch (data.current.weather_code) {
            case 0:
                weatherText = "☀️ Ясно";
                break;
            case 1:
            case 2:
                weatherText = "🌤️ Малооблачно";
                break;
            case 3:
                weatherText = "☁️ Пасмурно";
                break;
            case 45:
            case 48:
                weatherText = "🌫️ Туман";
                break;
            case 61:
            case 63:
            case 65:
                weatherText = "🌧️ Дождь";
                break;
            case 71:
            case 73:
            case 75:
                weatherText = "❄️ Снег";
                break;
            case 95:
                weatherText = "⛈️ Гроза";
                break;
        }

        document.getElementById("weather").textContent = weatherText;

    } catch (error) {
        document.getElementById("weather").textContent =
            "Ошибка загрузки погоды";
    }
}

document.getElementById("updateWeather").addEventListener("click", () => {

    document.getElementById("weather").textContent =
        "Получаем местоположение...";

    if (!navigator.geolocation) {
        document.getElementById("weather").textContent =
            "Геолокация не поддерживается";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            getWeather(
                position.coords.latitude,
                position.coords.longitude
            );
        },
        () => {
            document.getElementById("weather").textContent =
                "Нет доступа к геолокации";
        }
    );
});