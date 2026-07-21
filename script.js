function updateClock() {
    const now = new Date();

    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("time").textContent = ${h}:${m}:${s};

    const date = now.toLocaleDateString("ru-RU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    document.getElementById("date").textContent = date;
}

setInterval(updateClock, 1000);
updateClock();

document.getElementById("updateWeather").addEventListener("click", () => {
    document.getElementById("weather").textContent = "Получаем местоположение...";

    if (!navigator.geolocation) {
        document.getElementById("weather").textContent = "Геолокация не поддерживается.";
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const url = https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code;

        try {
            const response = await fetch(url);
            const data = await response.json();

            document.getElementById("temperature").textContent =
                Math.round(data.current.temperature_2m) + "°C";

            document.getElementById("weather").textContent =
                "Код погоды: " + data.current.weather_code;

        } catch (e) {
            document.getElementById("weather").textContent =
                "Ошибка загрузки погоды.";
        }

    }, () => {
        document.getElementById("weather").textContent =
            "Нет доступа к геолокации.";
    });
});
