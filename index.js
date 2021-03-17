// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Query in parallelo con le promise</h1>`;

const API_KEY = 'd0fda39104b3c7c45fe031a5392964c1';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

// Set the list of cities
const citta = [ 'Milan', 'Turin', 'Pisa', 'Rome', 'Trento' ];
// La funzione restituisce un array [ citta, temperatura ]
function fetchTempForCity(city) {
  return fetch(`${API_URL}&q=${encodeURIComponent(city)}`) // fetch restituisce una promise
    .then(response => response.json())                     // anche la json()
    .then(data => [ city, data.main.temp || null ]);       // passa un array di due posizioni
}
Promise
  .all(citta.map(fetchTempForCity))     // Applica all'array di Promise costruito con "map"
  .then(temps => {		        // temps e' l'array dei risultati di tutte le Promise    
    return temps.reduce(		// utilizza il metodo reduce sull'array
                                        // il reducer aggiunge al dizionario "data" 
      (data, [ city, temp ]) => { data[city] = temp; return data; },  
      {});                              // "data" inizialmente vuoto
    })
  .then(console.log, console.error);
