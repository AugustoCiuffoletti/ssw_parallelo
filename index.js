import "./style.css";

const API_KEY = "d0fda39104b3c7c45fe031a5392964c1";
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;
// La lista di città
const citta = ["Milan", "Turin", "Pisa", "Rome", "Trento"];
media(); // Invocazione della funzione
// La funzione promette un array [ citta, temperatura ]
async function fetchTempForCity(city) {
  let response = await fetch(API_URL + "&q=" + city); // fetch() restituisce una promise
  if (response.ok) {
    let json = await response.json(); // json() restituisce una promise
    return json.main.temp;
  } else {
    alert("Errore: " + response.status);
  }
}
// Definisce il metodo collegato al successo della fetchall
async function media() {
  let media = 0;
  let temps = await Promise.all(citta.map(fetchTempForCity));
  // temps e' l'array dei risultati di tutte le Promise
  media = temps.reduce((media, data) => data + media) / temps.length;
  document.getElementById("app").innerHTML =
    "La temperatura media e' di " + media + " gradi";
}
