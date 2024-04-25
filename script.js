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
    `<li>${artist}</li>
    <select>
    ${generateOptions()}   
    </select>
`).join('');

calcularBtn.addEventListener("click", () => {
    const values = document.querySelectorAll("select");

    console.log(values.value);

})

