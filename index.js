// Import stylesheets
import "./style.css";

// Write TypeScript code!

const API_KEY = "d0fda39104b3c7c45fe031a5392964c1";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

// Set the list of cities
const citta = ["Milan", "Turin", "Pisa", "Rome", "Trento"];
// La funzione restituisce un array [ citta, temperatura ]
async function fetchTempForCity(city) {
  let response = await fetch(API_URL + "&q=" + city); // fetch restituisce una promise
  if (response.ok) {
    let json = await response.json();
    return json.main.temp;
  } else {
    alert("Errore: " + response.status);
  }
}
// Questa funzione promette un array con le tutte temperature
function fetchall() {
  return Promise.all(citta.map(fetchTempForCity));
}
// Definisce il metodo collegato al successo della fetchall
fetchall().then(temps => {
  // temps e' l'array dei risultati di tutte le Promise
  var media = 0;
  media = temps.reduce((media, data) => data + media) / temps.length;
  document.getElementById("app").innerHTML =
    "La temperatura media e' di " + media + " gradi";
});
