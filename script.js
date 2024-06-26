// * Obtener los elementos del DOM
const artists = document.getElementById("artists")
const userName = prompt("Ingrese su nombre de usuario:")
const welcome = document.getElementById("welcome")
const calcularBtn = document.getElementById("calcularBtn")
welcome.innerHTML = `¡Hola ${userName}! Califica los siguientes artistas y te recomendaremos  generos musicales.`
const generoRecomendadoUl = document.getElementById("generoRecomendado")

// * Lista de artistas
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
    "Soda Stereo",
    "Vilma Palma e Vampiros",
]

// * Lista de generos musicales
const generos = [
    "Rock",
    "Hip Hop",
    "Pop",
    "Alternativo",
    "Rock Nacional"
]

// * Función para generar las opciones de los selects
function generateOptions() {
    let options = '<option disabled selected>Puntuación</option>';
    for (let i = 1; i <= 10; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    return options;
}

// * Renderizar la lista de artistas
artists.innerHTML = artistList.map(artist =>
    `<li class="flex justify-between">
    <p class="font-bold text-white">${artist}</p>
    <select class="w-25 rounded-md bg-blue-200 hover:bg-blue-500 transition-colors">
    ${generateOptions()}   
    </select>
    </li>
`).join('');

// * Evento para calcular las recomendaciones
calcularBtn.addEventListener("click", () => {
    const values = [];
    let allValuesValid = true; // *Variable para verificar si todos los valores son válidos
    const selects = document.querySelectorAll("select");

    selects.forEach(select => {
        // * Convertir a numero cada valor del select
        const value = parseFloat(select.value);
        if (isNaN(value)) { //* Verifica si el valor no es un número
            allValuesValid = false;
            return; // *Sale del bucle forEach si encuentra un valor inválido
        }
        values.push(value);
    });

    if (!allValuesValid) {
        alert("Por favor, selecciona un número en todos los selects.");
        return; // * Detiene la ejecución si hay algún valor inválido
    }

    // * Crear tensores en memoria
    tf.tidy(() => {
        // * Crear un tensor con los las opciones elegidas por el usuario
        const user_votes = tf.tensor([values])

        // * Clasificación de los artistas segun los generos musicales
        const band_feats = tf.tensor([
            [1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 0, 0, 0, 0],

            [0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0],

            [0, 0, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],

            [0, 0, 0, 1, 0],
            [1, 0, 0, 1, 0],
            [1, 0, 0, 1, 0],

            [0, 0, 0, 0, 1],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 0, 1]

        ])

        // * Multiplicar los gustos del usuario por las características de los artistas
        const recomendaciones = tf.matMul(user_votes, band_feats)

        // * Devolver un tensor con los valores máximos junto con su indice
        const MejoresRecomendacionesPU = tf.topk(recomendaciones, generos.length)
        // * Obtener los indices de las recomendacions en un array sincrono
        const MejoresGeneros = MejoresRecomendacionesPU.indices.arraySync()

        generoRecomendadoUl.classList.remove("hidden")

        // * Renderizar los resultados 
        generoRecomendadoUl.innerHTML += MejoresGeneros[0].map((genero, index) =>
            `            
           <li>
           <div class="flex">
           <span class="text-yellow-600 font-bold">${index + 1}.</span>
           <h2 class="text-white font-bold ${index == 0 && "text-green-400"}"> genero: ${generos[genero]}</h2>
           </div>
                <p class="text-white font-semiBold ${index == 0 && "text-green-400"}">puntuacion: ${MejoresRecomendacionesPU.values.arraySync()[0][index]}</p>
            </li>
            `
        ).join("")
    })
});
