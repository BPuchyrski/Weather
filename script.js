const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const API_LINK = `https://api.openweathermap.org/data/2.5/weather?lat=`;
const CITY1 = `https://api.openweathermap.org/geo/1.0/direct?q=`;
const CITY2 = "&limit=5&appid=8957d00ec520427ff4a5fa2a85d35fe4";
const KEY = "8957d00ec520427ff4a5fa2a85d35fe4";

let getCity = () => {
  let city = input.value || "Warszawa";
  let CITY = CITY1 + city + CITY2;
  axios
    .get(CITY)
    .then((res) => {
      // console.log(res.data[0]);
      cityName.textContent = res.data[0].name;
      const lat = res.data[0].lat;
      const lon = res.data[0].lon;
      const URL =
        API_LINK + lat + "&lon=" + lon + "&appid=" + KEY + "&units=metric";
      axios.get(URL).then((res) => {
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        // cityName.textContent = res.data.name;
        temperature.textContent = `${Math.floor(temp)}℃`;
        humidity.textContent = hum + "%";
        weather.textContent = res.data.weather[0].main;

        if (res.data.weather[0].main === "Thunderstorm") {
          photo.setAttribute("src", "./img/thunderstorm.png");
        } else if (res.data.weather[0].main === "Drizzle") {
          photo.setAttribute("src", "./img/drizzle.png");
        } else if (res.data.weather[0].main === "Rain") {
          photo.setAttribute("src", "./img/rain.png");
        } else if (res.data.weather[0].main === "Snow") {
          photo.setAttribute("src", "./img/ice.png");
        } else if (res.data.weather[0].main === "Fog") {
          photo.setAttribute("src", "./img/fog.png");
        } else if (res.data.weather[0].main === "Clear") {
          photo.setAttribute("src", "./img/sun.png");
        } else if (res.data.weather[0].main === "Clouds") {
          photo.setAttribute("src", "./img/cloud.png");
        } else {
          photo.setAttribute("src", "./img/unknown.png");
        }

        input.value = "";
        warning.textContent = "";
      });
    })
    .catch(() => {
      warning.textContent = "Wpisz poprawną nazwę miasta";
      input.value = " ";
    });
};
const enter = (e) => {
  if (e.key === "Enter") {
    getCity();
  }
};

button.addEventListener("click", getCity);
input.addEventListener("keyup", enter);
