const artists = document.getElementById("artists")
// const userName = prompt("Ingrese su nombre de usuario:")
// const welcome = document.getElementById("welcome")
const calcularBtn = document.getElementById("calcularBtn")
// welcome.innerHTML = `¡Hola ${userName}! Califica los siguientes grupos musicales y te diremos tus generos musicales favoritos.`

const artistList = [
    "Gun's and Roses",
    "AC/DC",
    "Aerosmith",

    "Eminem",
    "Dr. Dre",
    "Snoop Dogg",

    "Michael Jackson",
    "Elton John",
    "Billie Eilish",

    "Gorillaz",
    "Red Hot Chili Peppers",
    "System of a Down",

    "Rata Blanca",
    "Los Autenticos Decadentes",
    "Vilma Palma e Vampiros",
]

const generos = [
    "Rock",
    "Hip Hop",
    "Pop",
    "Alternativo",
    "Rock Nacional"
]

function generateOptions() {
    let options = '<option disabled selected>Seleccione una puntuación</option>';
    for (let i = 1; i <= 10; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    return options;
}

artists.innerHTML = artistList.map(artist =>
    `<li class="mx-auto">${artist}
    <select>
    ${generateOptions()}   
    </select>
    </li>
`).join('');


calcularBtn.addEventListener("click", () => {
    const values = [];
    let allValuesValid = true; // Variable para verificar si todos los valores son válidos
    const selects = document.querySelectorAll("select");

    selects.forEach(select => {
        const value = parseFloat(select.value);
        if (isNaN(value)) { // Verifica si el valor no es un número
            allValuesValid = false;
            return; // Sale del bucle forEach si encuentra un valor inválido
        }
        values.push(value);
    });

    if (!allValuesValid) {
        alert("Por favor, selecciona un número en todos los selects.");
        return; // Detiene la ejecución si hay algún valor inválido
    }

    console.log(values);
});



